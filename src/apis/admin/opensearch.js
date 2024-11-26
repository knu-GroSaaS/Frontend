import axios from 'axios';

// OpenSearch 서버 주소
const VITE_API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2 || "https://211.253.36.208:9200";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL2,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 검색할 인덱스와 쿼리
const index = 'mem-grolabs02-index';
const size = 10; // 검색할 문서의 개수

export const viewLog = async () => {
  try {
    // 검색 쿼리
    const response = await axiosInstance.get(`/${index}/_search`, {
      params: {
        size: size, // 검색할 문서 개수
      },
      data: {
        query: {
          match_all: {}, // 모든 문서 검색
        },
      },
    });

    // 응답 결과 출력
    console.log('Search Result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error while searching documents:', error);
  }
};
