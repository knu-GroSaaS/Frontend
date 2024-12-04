import axiosInstance from "../axiosInstance";

/**
 * 가입 유저 정보 조회
 * @returns
 */
export const getUsers = async () => {
  const response = await axiosInstance.get("/manager", {
  });
  return response.data;
};

/**
 * 유저 auth 제어-AUTH
 * @param {string} requestername
 * @param {string} username
 * @returns
 */
export const CreateAuth = async (requestername, username) => {
  const response = await axiosInstance.post("/manager/authcreate", {
    requestername, username
  });
  return response.data;
};

/**
 * 유저 auth 제어-NOT AUTH
 * @param {string} requestername
 * @param {string} username
 * @returns
 */
export const DeleteAuth = async (requestername, username) => {
  const response = await axiosInstance.post("/manager/authdelete", {
    requestername, username
  });
  return response.data;
};