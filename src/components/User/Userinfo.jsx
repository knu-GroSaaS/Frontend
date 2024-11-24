import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { changePassword } from "../../apis/user/user.js";

/**
 * 사용자 정보를 API로부터 가져오는 함수
 * @param {Function} setUserData - 사용자 데이터를 업데이트
 * @param {Function} setLoading - 로딩 상태를 업데이트
 */
const fetchUserData = async (setUserData, setLoading) => {
  try {
    const response = await axiosInstance.get("/manager/getuser");
    const { username, email, phoneNum, site } = response.data;
    setUserData({
      name: username,
      email,
      phoneNum,
      site,
    });
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    alert("사용자 정보를 불러오는데 실패했습니다.");
  } finally {
    setLoading(false);
  }
};

const MyPage = () => {
  // 사용자 정보와 상태 관리 변수들
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNum: "",
    site: "",
  });
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [error, setError] = useState(""); // 에러 메시지
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 비밀번호 변경 버튼 상태

  // 컴포넌트가 마운트될 때 사용자 데이터를 불러옴
  useEffect(() => {
    fetchUserData(setUserData, setLoading);
  }, []);

  /**
   * 비밀번호 변경 핸들러
   */
  const handlePasswordSubmit = async () => {
    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true); // 버튼 비활성화
    setError(""); // 기존 에러 초기화

    try {
      // API 호출(비밀번호 변경)
      await changePassword(userData.name, currentPassword, newPassword);
      // 성공 시 입력 필드 초기화
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Failed to change password:", error);
      if (error.response && error.response.data) {
        setError(`비밀번호 변경 실패: ${error.response.data.message || "알 수 없는 오류 발생"}`);
      } else {
        setError("서버와의 연결에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false); // 버튼 활성화
    }
  };

  // 로딩 중일 때 화면 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">My Page</h1>

        {/* 사용자 정보 섹션 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
          <div className="mb-2">
            <strong>아이디:</strong> <span>{userData.name}</span>
          </div>
          <div className="mb-2">
            <strong>이메일:</strong> <span>{userData.email}</span>
          </div>
          <div className="mb-2">
            <strong>전화번호:</strong> <span>{userData.phoneNum}</span>
          </div>
          <div>
            <strong>사이트:</strong> <span>{userData.site}</span>
          </div>
        </div>

        {/* 비밀번호 변경 섹션 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handlePasswordSubmit}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "변경 중..." : "변경"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
