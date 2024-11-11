import axiosInstance from "../axiosInstance";

/**
 * 새로운 Case 생성
 * @param {string} product
 * @param {string} version
 * @param {string} subject
 * @param {string} description
 * @param {number} userId
 * @returns
 */
export const creatCase = async (product, version, subject, description, userId) => {
    const response = await axiosInstance.post("/api/board", {
        product,
        version,
        subject,
        description,
        userId,
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
export const editCase = async (caseId, product, version, subject, description, userId) => {
    const response = await axiosInstance.put(`/api/board${caseId}`, {
        product,
        version,
        subject,
        description,
        userId,
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