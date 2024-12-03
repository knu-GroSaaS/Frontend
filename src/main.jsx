import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useAuthStore } from "./store";
import Cookies from "js-cookie";

function Root() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // 창이 완전히 닫히는 경우만 처리
  //     const [navigationEntry] = performance.getEntriesByType("navigation");

  //     // 새로고침인지 확인
  //     // const isRefresh = navigationEntry?.type === "reload";

  //     const accessToken = Cookies.get("accessToken");
  //     const refreshToken = Cookies.get("refreshToken");
  //     if (refreshToken) {
  //       // 로그아웃 요청을 보내기 위해 sendBeacon 사용
  //       console.log("Logout");
  //       const url = `${import.meta.env.VITE_API_BASE_URL}/clogout`;
  //       const data = JSON.stringify({ refreshToken });

  //       // 로그아웃 요청
  //       window.navigator.sendBeacon(url, data);

  //       // 상태 초기화
  //       clearAuth();
  //       // Cookies.set("accessToken", accessToken);
  //       // Cookies.set("refreshToken", refreshToken);
  //       // useAuthStore.getState().setTokens(accessToken, refreshToken);
  //     }
  //   };

  //   // 창 닫기 이벤트 등록
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     // 이벤트 리스너 해제
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [clearAuth]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 새로고침인지 확인
      const isRefresh = sessionStorage.getItem("isRefresh") === "true";

      if (isRefresh) {
        // 새로고침임을 감지했으므로 플래그 초기화
        sessionStorage.setItem("isRefresh", "false");
        return;
      }

      // 창 닫기 처리
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        // 로그아웃 요청
        console.log("Logout request sent");
        const url = `${import.meta.env.VITE_API_BASE_URL}/clogout`;
        const data = JSON.stringify({ refreshToken });

        // sendBeacon 사용
        window.navigator.sendBeacon(url, data);
        clearAuth();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // 새로고침 플래그 설정
        sessionStorage.setItem("isRefresh", "true");
      }
    };

    // `beforeunload` 이벤트 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 새로고침 플래그 설정
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [clearAuth]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
