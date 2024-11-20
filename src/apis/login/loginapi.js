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
    secure: true,
  });
  // Token 읽기
  // const token = Cookies.get("accessToken");
  // console.log("Access Token from Cookie:", token);
  useAuthStore.getState().setTokens(accessToken, refreshToken);
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
