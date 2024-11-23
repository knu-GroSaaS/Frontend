import axiosInstance from "../axiosInstance";

/**
 * 가입 유저 정보 조회
 * @returns
 */
export const getUser = async () => {
  const response = await axiosInstance.post("/manager", {
  });
  return response.data;
};