// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand 스토어 생성
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // 사용자 정보를 저장할 수 있는 공간
      setUser: (user) => set({ user }), // 사용자 정보 설정
      clearAuth: () => set({ user: null }), // 세션 초기화 메서드
    }),
    {
      name: "auth-storage", // 세션 스토리지에 저장할 이름
      getStorage: () => sessionStorage, // sessionStorage를 사용
    }
  )
);
