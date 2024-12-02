import axiosInstance from "../axiosInstance";

/**
 * 가입 유저 정보 조회
 * @returns
 */
export const getUser = async () => {
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
export const CreateAuth = async () => {
  const response = await axiosInstance.post("/manager/authcreate", {
    params: { requestername, username },
  });
  return response.data;
};

/**
 * 유저 auth 제어-NOT AUTH
 * @param {string} requestername
 * @param {string} username
 * @returns
 */
export const DeleteAuth = async () => {
  const response = await axiosInstance.delete("/manager/authdelete", {
    params: { requestername, username },
  });
  return response.data;
};