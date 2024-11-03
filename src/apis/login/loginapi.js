import axiosInstance from "../axiosInstance";
import { useAuthStore } from "../../store";
/**
 * 로그인 요청 API
 * @param {string} username
 * @param {string} password
 * @returns
 */
export const getLogin = async (username, password) => {
  const response = await axiosInstance.post("/login", { username, password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
  });
//   console.log(response)
//   const { accessToken } = response.data;
//   useAuthStore.getState().setTokens(accessToken);
//  useAuthStore.getState().setUser(response.data.user);
  return response.data;
};