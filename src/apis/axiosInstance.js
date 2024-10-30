import axios from "axios";
import { useAuthStore } from "../store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키를 포함한 요청
});

// 세션 방식에서는 서버가 세션을 관리합니다.

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 세션 방식에서는 401 오류가 발생할 경우, 자동으로 로그아웃 처리가 필요할 수 있습니다.
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // 세션이 만료된 경우 로그아웃 처리
      useAuthStore.getState().clearAuth(); // 세션 관련 정보를 초기화
      originalRequest._retry = true;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
