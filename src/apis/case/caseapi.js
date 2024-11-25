import axiosInstance from "../axiosInstance";

/**
 * 새로운 Case 생성
 * @param {string} problemTitle
 * @param {string} product
 * @param {string} version
 * @param {string} serialNumber
 * @param {number} severity
 * @returns
 */
export const createCase = async (
  problemTitle,
  product,
  version,
  serialNumber,
  severity
) => {
  const response = await axiosInstance.post("/api/board", {
    problemTitle,
    product,
    version,
    serialNumber,
    severity,
  });
  return response.data;
};

/**
 * 전체 CaseList 조회
 * @returns
 */
export const getCaselist = async (params) => {
  const response = await axiosInstance.get("/api/board", {
    params,
  });
  return response.data;
};

/**
 * 특정 Case 조회
 * @param {number} caseId
 * @returns
 */
export const getCase = async (caseId) => {
  const response = await axiosInstance.get(`/api/board/${caseId}`);
  return response.data;
};

/**
 * 특정 Case 수정
 * @param {string} product
 * @param {string} version
 * @param {string} subject
 * @param {string} description
 * @param {number} userId
 * @returns
 */
export const editCase = async (
  caseId,
  problemTitle,
  product,
  version,
  serialNumber,
  severity
) => {
  const response = await axiosInstance.put(`/api/board/${caseId}`, {
    problemTitle,
    product,
    version,
    serialNumber,
    severity,
  });
  return response.data;
};

/**
 * 특정 Case 삭제
 * @param {number} caseId
 * @returns
 */
export const deleteCase = async (caseId) => {
  const response = await axiosInstance.delete(`/api/board/${caseId}`);
  return response.data;
};

/**
 * 특정 Case 검색
 * @param {number} caseId
 * @returns
 */
export const searchCase = async (keyword) => {
  const response = await axiosInstance.get("/api/board/search", {
    keyword,
  });
  return response.data;
};
