import { create } from "zustand";
import Cookies from "js-cookie";

// Zustand 상태 관리
export const useAuthStore = create((set) => {
  // 쿠키에서 초기 토큰 읽기
  const initialAccessToken = Cookies.get("accessToken") || null;
  const initialRefreshToken = Cookies.get("refreshToken") || null;

  return {
    accessToken: initialAccessToken,
    refreshToken: initialRefreshToken,

    // 토큰 설정 함수
    setTokens: (accessToken, refreshToken) => {
      Cookies.set("accessToken", accessToken, { expires: 1, path: "/" }); // 1일 후 만료
      Cookies.set("refreshToken", refreshToken, { expires: 1, path: "/" });
      set({ accessToken, refreshToken });
    },

    // 토큰 및 인증 상태 초기화 함수
    clearAuth: () => {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      set({ accessToken: null, refreshToken: null });
    },
  };
});
