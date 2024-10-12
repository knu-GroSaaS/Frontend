// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // 사용자 정보를 저장할 수 있는 공간
      setUser: (user) => set({ user }), // 사용자 정보 설정
      clearAuth: () => set({ user: null }), // 세션 초기화
    }),
    { name: "auth-storage", getStorage: () => sessionStorage }
  )
);
