import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";


const LoginSuccess = () => {
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isLoginInProgress, setIsLoginInProgress] = useState(true); // 로그인 진행 상태
  const [currentTime, setCurrentTime] = useState(''); // 현재 시간 표시
  const navigate = useNavigate();

  // 현재 시간을 포맷팅하는 함수
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toISOString().split('T').join(' ').slice(0, 19);
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateTime(); // 컴포넌트가 마운트될 때 시간 업데이트

    let loadingTimer;
    let isRequestComplete = false;

    // 500ms 후에 로딩 상태로 전환
    loadingTimer = setTimeout(() => {
      if (!isRequestComplete) {
        setIsLoading(true);
      }
    }, 500);

    // 실제 비동기 로그인 요청 시뮬레이션 (예: 서버 요청)
    const simulateLoginRequest = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 동안 대기
        isRequestComplete = true; // 요청이 완료됨
        setIsLoading(false); // 로딩 상태 해제
        clearTimeout(loadingTimer); // 타이머 초기화
        navigate("/dashboard"); // 대시보드로 이동
      } catch (error) {
        console.error("로그인 실패:", error);
        setIsLoading(false);
        clearTimeout(loadingTimer);
      } finally {
        setIsLoginInProgress(false);
      }
    };

    simulateLoginRequest(); // 비동기 작업 실행

    return () => {
      clearTimeout(loadingTimer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [navigate]);

  // 로딩 화면 UI
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-80 text-center">
        <img src="/assets/Grosaas_logo.png" alt="Logo" className="w-12 h-12 mb-5 mx-auto" />
        <h1 className="mb-5 font-semibold">
          <span className="text-indigo-600">GroSaaS</span> Dashboard
        </h1>

        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl text-green-500 mr-2">✅</span>
          <h2 className="text-lg font-semibold text-white">Login successful</h2>
        </div>

        <p className="text-white mb-4">
          Please wait a moment while the dashboard loads.
        </p>

        {/* 로딩 상태일 때만 로딩 아이콘 */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-gray-500 mb-4">준비 중...</div>
        )}

        <div className="text-sm text-white">
          <span>🕒 {currentTime}</span>
        </div>
      </div>
    </div>
  );
}

export default LoginSuccess;