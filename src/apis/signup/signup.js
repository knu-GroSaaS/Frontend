import axiosInstance from "../axiosInstance";

/**
 * 회원가입 API
 * @param {string} username
 * @param {string} email
 * @param {string} phoneNum
 * @param {string} site
 * @returns
 */
export const getJoin = async (username, email, phoneNum, site) => {
  const response = await axiosInstance.post(
    "/join",
    {
      username,
      email,
      phoneNum,
      site,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  // const { accessToken } = response.data;
  // useAuthStore.getState().setTokens(accessToken);
  return response.data;
};

/**
 * 아이디/이메일 중복 체크
 * @param {string} value value
 * @param {string} type username / email
 * @return {boolean} TRUE/FALSE
 */
export const getCheck = async (type, value) => {
  const response = await axiosInstance.post(
    "/join/dupli",
    {
      type,
      value,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};
