
import axiosInstance from "../axiosInstance";
import { useAuthStore } from "../../store";
/**
 * 로그인 요청 API
 * @param {string} username
 * @param {string} password
 * @returns
 */
export const getLogin = async (username, password) => {
  const response = await axiosInstance.post("/loginok", { username, password }, {
    withCredentials: true, // 쿠키를 포함한 요청
  });
//   const { accessToken } = response.data;
//   useAuthStore.getState().setTokens(accessToken);
  useAuthStore.getState().setUser(response.data.user);
  return response.data;
};