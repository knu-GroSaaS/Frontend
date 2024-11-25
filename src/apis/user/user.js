import axiosInstance from "../axiosInstance";

/**
 * 비밀번호 변경 API 호출
 * @param {string} username - 사용자 아이디
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새로운 비밀번호
 * @returns {Promise<void>} 성공 시 아무것도 반환하지 않음
 */
export const changePassword = (username, currentPassword, newPassword) => {
  return axiosInstance.post(
    "/password/update",
    {
      username,
      currentPassword,
      newPassword,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

/**
 * GET /manager/getuser
 * 사용자 정보를 가져오는 API
 * @returns {Promise<Object>} 사용자 정보 객체 반환
 */
export const getUser = () => {
  return axiosInstance.get("/getuser");
};
