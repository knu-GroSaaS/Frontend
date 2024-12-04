import axiosInstance from "../axiosInstance";

/**
 * 비밀번호 변경 API 호출
 * @param {string} username - 사용자 아이디
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새로운 비밀번호
 * @returns {Promise<void>} 성공 시 아무것도 반환하지 않음
 */
export const changePassword = async (
  username,
  currentPassword,
  newPassword
) => {
  const response = await axiosInstance.put(
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
  return response.data;
};

/**
 * 사용자 정보를 가져오는 API
 * GET /manager/getuser
 * @returns {Promise<Object>} 사용자 정보 객체 반환
 */
export const getUser = async () => {
  const response = await axiosInstance.get("/getuser");
  return response.data;
};

/**
 * 인증 코드 전송 API
 * POST /password
 * 이메일로 인증 코드를 전송하는 API
 * @returns {Promise<string>} 성공 시 인증 코드 반환
 */
export const sendVerificationCode = async () => {
  const response = await axiosInstance.post("/password");
  return response.data;
};

/**
 * 인증 코드 검증 API
 * POST /password/tokenval
 * @param {string} token - 사용자가 입력한 인증 코드
 * @returns {Promise<boolean>} 인증 성공 여부 반환
 */
export const verifyCode = async (token) => {
  const response = await axiosInstance.post(
    "/password/tokenval",
    {},
    { params: { token } }
  );
  return response.data;
};
