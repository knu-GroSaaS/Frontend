import axiosInstance from "../axiosInstance";

/**
 * 비밀번호 변경
 * @param {string} username - 사용자 아이디
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새로운 비밀번호
 * @returns 
 */
export const changePassword = async (username, currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.post(
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
    // 성공적으로 응답을 받았을 경우
    console.log("Password updated successfully:", response.data);
  } catch (error) {
    console.error("Failed to update password:", error);
    if (error.response) {
      // 서버에서 반환하는 오류 메시지를 출력
      console.error("Server error response:", error.response.data);
    }
    throw error;
  }
};
