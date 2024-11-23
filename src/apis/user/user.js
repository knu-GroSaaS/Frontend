import axiosInstance from "../axiosInstance";

/**
 * 비밀번호 변경
 * @param {string} username - 사용자 아이디
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새로운 비밀번호
 * @returns {Promise<void>}
 */
export const changePassword = async (username, currentPassword, newPassword) => {
  try {
    await axiosInstance.post(
      "/password/update",
      {
        username,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Failed to update password:", error);
    throw error;
  }
};
