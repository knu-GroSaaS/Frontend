import axiosInstance from "../axiosInstance";
import { useAuthStore } from "../../store";
import Cookies from "js-cookie";
/**
 * 로그인 요청 API
 * @param {string} username
 * @param {string} password
 * @returns
 */
export const getLogin = async (username, password) => {
  const response = await axiosInstance.post(
    "/login",
    { username, password },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response.data);
  const { accessToken, refreshToken } = response.data;
  const hours = 1; // 시간 설정
  const refreshHours = 24 * 7;
  Cookies.set("accessToken", accessToken, { expires: hours / 24, path: "/" });
  Cookies.set("refreshToken", refreshToken, {
    expires: refreshHours / 24,
    path: "/",
    // secure: true, //https 환경에서만 사용
  });
  // Token 읽기
  // const token = Cookies.get("accessToken");
  // console.log("Access Token from Cookie:", token);
  useAuthStore.getState().setTokens(accessToken, refreshToken);
  const redirectPath = Cookies.get("redirectPath") || "/dashboard"; // 기본 경로 설정
  Cookies.remove("redirectPath"); // 리다이렉션 경로 삭제
  window.location.href = redirectPath; // 저장된 경로로 이동
  return response.data;
};

/**
 * 토큰 재발급 (POST /api/auth/refresh)
 * @param {string} refreshToken - 재발급에 사용할 RefreshToken
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export const refreshTokens = async (refreshToken) => {
  const response = await axiosInstance.post(
    "/api/auth/refresh",
    {},
    {
      headers: {
        refreshToken,
      },
    }
  );
  return response.data;
};
