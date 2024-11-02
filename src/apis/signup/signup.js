import axiosInstance from "../axiosInstance";

/**
 * 회원가입 API
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const getJoin = async (username, email, password) => {
    const response = await axiosInstance.post("/join", {
        username,
        email,
        password,        
    });
    // const { accessToken } = response.data;
    // useAuthStore.getState().setTokens(accessToken);
    return response.data;
  };

/**
 * 아이디/이메일 중복 체크
 * @param {string} param value
 * @param {string} type username / email
 * @return {boolean} TRUE/FALSE
 */
export const getCheck = async (type, param) => {
    const response = await axiosInstance.get("/join/dupli", {
      params: {        
        type,
        param
      },
    });
    return response.data;
};