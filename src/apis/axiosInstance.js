import axios from "axios";
import { useAuthStore } from "../store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키를 포함한 요청
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 세션 방식에서는 Authorization 헤더를 설정할 필요가 없습니다.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 리프레시 토큰 관리 함수는 필요하지 않으므로 제거합니다.
// 세션 방식에서는 서버가 세션을 관리합니다.

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 세션 방식에서는 401 오류가 발생할 경우, 자동으로 로그아웃 처리가 필요할 수 있습니다.
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // 세션이 만료된 경우 로그아웃 처리
      useAuthStore.getState().clearToken(); // 세션 관련 정보를 초기화
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
