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
 * 사용자 정보를 가져오는 API
 * GET /manager/getuser
 * @returns {Promise<Object>} 사용자 정보 객체 반환
 */
export const getUser = () => {
  return axiosInstance.get("/getuser");
};

/**
 * 인증 코드 전송 API
 * POST /password
 * 이메일로 인증 코드를 전송하는 API
 * @param {string} email - 사용자 이메일 주소
 * @returns {Promise<string>} 성공 시 인증 코드 반환
 */
export const sendVerificationCode = (email) => {
  return axiosInstance.post(
    "/password",
    { email },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰 포함
        "Content-Type": "application/json",
      },
    }
  );
};


