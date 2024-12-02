import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useAuthStore } from "./store";
import Cookies from "js-cookie";

function Root() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 창이 완전히 닫히는 경우만 처리
      const [navigationEntry] = performance.getEntriesByType("navigation");

      // 새로고침인지 확인
      const isRefresh = navigationEntry?.type === "reload";

      if (!isRefresh) {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          // 로그아웃 요청을 보내기 위해 sendBeacon 사용
          const url = `${import.meta.env.VITE_API_BASE_URL}/clogout`;
          const data = JSON.stringify({ refreshToken });

          // 로그아웃 요청
          window.navigator.sendBeacon(url, data);

          // 상태 초기화
          clearAuth();
        }
      }
    };

    // 창 닫기 이벤트 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [clearAuth]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
