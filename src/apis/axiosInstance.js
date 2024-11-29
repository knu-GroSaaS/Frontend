import axios from "axios";
import { useAuthStore } from "../store";
import Cookies from "js-cookie";
import { refreshTokens } from "./login/loginapi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 세션 방식에서는 서버가 세션을 관리합니다.

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (config.url?.startsWith("/api/secure")) {
    config.baseURL = ""; // baseURL 무시
  }
  if (accessToken) {
    // api 요청 할 때 header에 accsesToken 넣어줌
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

let isAlertDisplayed = false;

// 로그인 페이지로 리디렉션
const redirectToLogin = () => {
  // 쿠키에서 토큰 제거
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  useAuthStore.getState().clearAuth(); // Zustand 상태 초기화
  Cookies.set("redirectPath", window.location.pathname, { path: "/" }); // 리디렉션 경로 저장

  if (!isAlertDisplayed) {
    isAlertDisplayed = true;
    alert("다시 로그인 해 주세요.");
    window.location.href = "/login";
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      if (status === 461 && !originalRequest._retry) {
        // accessToken 만료 시
        originalRequest._retry = true;
        const refreshToken = Cookies.get("refreshToken"); // 쿠키에서 refreshToken 읽기

        if (refreshToken) {
          try {
            const { accessToken, refreshToken: newRefreshToken } =
              await refreshTokens(refreshToken);

            // 새로운 토큰을 쿠키와 Zustand 상태에 저장
            console.log("hi");
            Cookies.set("accessToken", accessToken, {
              path: "/",
              expires: 1 / 24,
            }); // 1시간 유효
            Cookies.set("refreshToken", newRefreshToken, {
              path: "/",
              expires: 1,
            }); // 7일 유효

            useAuthStore.getState().setTokens(accessToken, newRefreshToken); // Zustand 상태 업데이트

            // 요청에 새로운 accessToken 추가
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            };

            return axiosInstance(originalRequest); // 실패했던 요청 재시도
          } catch (refreshError) {
            // 재발급 실패 시 로그아웃 처리
            redirectToLogin();
            return Promise.reject(refreshError);
          }
        } else {
          // refreshToken 없음
          redirectToLogin();
        }
      } else if (status === 401) {
        // 인증 실패 처리
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
