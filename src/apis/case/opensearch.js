import axiosInstance from "../axiosInstance";

// 검색할 인덱스와 쿼리
const index = "restored_mem-grolabs02-index";
const size = 10; // 검색할 문서의 개수

export const viewLog = async () => {
  try {
    // 검색 쿼리
    const response = await axiosInstance.get(`/api/${index}/_search`, {
      baseURL: "https://210.109.55.61:9200",
      auth: {
        username: "admin", // 아이디
        password: "admin", // 비밀번호
      },
      params: {
        size: size, // 검색할 문서 개수
      },
    });

    // 응답 결과 출력
    console.log("Search Result:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while searching documents:", error);
  }
};
