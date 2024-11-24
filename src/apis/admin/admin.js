import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { refreshTokens } from "../login/loginapi";
/**
 * 가입 유저 정보 조회
 * @returns
 */
// export const getUser = async () => {
//   const response = await axiosInstance.get("/manager", {
//   });
//   return response.data;
// };

export const getUser = async () => {
  const token = Cookies.get("accessToken");  // 쿠키에서 토큰 가져오기
  console.log("Access Token:", token);  // 토큰이 정상적으로 출력되는지 확인

  const response = await axiosInstance.get("/manager", {
    headers: {
      Authorization: `Bearer ${token}`,  // Bearer 토큰 방식으로 전달
    },
    withCredentials: true,
  });
  return response.data;
};