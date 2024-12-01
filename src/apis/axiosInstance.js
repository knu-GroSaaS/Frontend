import axios from "axios";
import { useAuthStore } from "../store";
import Cookies from "js-cookie";
import { refreshTokens } from "./login/loginapi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 플래그와 큐 관리
let isRefreshing = false;
let refreshQueue = [];

// 큐 처리
const processQueue = (error, token = null) => {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshQueue = [];
};

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (config.url?.includes("/api/auth/refresh")) {
    return config;
  }
  if (config.url?.includes("/api/secure")) {
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

      if (status === 461) {
        // accessToken 만료 시
        if (!isRefreshing) {
          isRefreshing = true;
          const refreshToken = Cookies.get("refreshToken"); // 쿠키에서 refreshToken 읽기
          console.log(refreshToken);

          if (refreshToken) {
            try {
              const { accessToken, refreshToken: newRefreshToken } =
                await refreshTokens(refreshToken);
                
              // 새로운 토큰 저장
              Cookies.set("accessToken", accessToken, {
                path: "/",
                expires: 1 / 24,
              }); // 1시간 유효
              Cookies.set("refreshToken", newRefreshToken, {
                path: "/",
                expires: 1,
              }); // 1일 유효
              useAuthStore.getState().setTokens(accessToken, newRefreshToken);

              processQueue(null, accessToken);
              isRefreshing = false;

              // 실패했던 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              processQueue(refreshError, null);
              isRefreshing = false;
              redirectToLogin();
              return Promise.reject(refreshError);
            }
          } else {
            redirectToLogin();
          }
        }

        // Refresh Token 요청 중에는 다른 요청을 큐에 추가
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      } else if (status === 401) {
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;