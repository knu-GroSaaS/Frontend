import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { getUser } from "../../apis/user/user";

const LoginSuccess = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [currentTime, setCurrentTime] = useState(""); // 현재 시간 표시
  const [role, setRole] = useState(""); // 사용자 역할
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        setRole(response.data.usertype); // 사용자 역할 저장
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      } finally {
        // 최소 로딩 시간 확보
        setTimeout(() => {
          setIsLoading(false); // 최소 2초 후 로딩 종료
        }, 2000);
      }
    };

    fetchUserData(); // 데이터 가져오기
  }, []);

  useEffect(() => {
    // 로딩이 완료되고 role이 설정되었을 때 이동
    if (!isLoading && role) {
      if (role === "ROLE_ADMIN") {
        navigate("/adminpage");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isLoading, role, navigate]); // 의존성 배열에 role 추가

  // 현재 시간을 포맷팅하는 함수
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toISOString().split("T").join(" ").slice(0, 19);
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateTime(); // 컴포넌트 마운트 시 시간 업데이트
  }, []);

  // 로딩 화면 UI
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-80 text-center">
        <img
          src="/assets/Grosaas_logo.png"
          alt="Logo"
          className="w-12 h-12 mb-5 mx-auto"
        />
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
};

export default LoginSuccess;
