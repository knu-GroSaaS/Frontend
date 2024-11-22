import axiosInstance from "../axiosInstance";

/**
 * 비밀번호 변경
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새로운 비밀번호
 * @returns {Promise<void>}
 */
export const changePassword = async (currentPassword, newPassword) => {
  await axiosInstance.put(
    "/user/changepassword",
    { currentPassword, newPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
