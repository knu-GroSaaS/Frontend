import { useCallback } from "react";
import Cookies from "js-cookie";
import { logOut } from "./loginapi";
import UseDidMountEffect from "./useLogout";

/**
 * LogoutHandler
 * - 창 닫기 또는 새로고침 시 로그아웃 요청
 */
const LogoutHandler = () => {
  // 로그아웃 처리 함수
  const handleLogout = useCallback((event) => {
    event.preventDefault();

    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      logOut(refreshToken).catch((err) => {
        console.error("Logout request failed:", err);
      });
    }
  }, []);

  // UseDidMountEffect를 사용하여 로그아웃 이벤트 리스너 추가
  UseDidMountEffect(() => {
    window.addEventListener("beforeunload", handleLogout);

    return () => {
      window.removeEventListener("beforeunload", handleLogout);
    };
  }, [handleLogout]);

  return null; // UI 없음
};

export default LogoutHandler;
