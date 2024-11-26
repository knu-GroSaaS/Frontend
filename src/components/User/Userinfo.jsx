import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 뒤로가기 기능을 위해 추가
import { changePassword, getUser } from "../../apis/user/user.js";

const MyPage = () => {
  const navigate = useNavigate(); // 뒤로가기 기능

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNum: "",
    site: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setUserData(response.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        if (error.response && error.response.data) {
          setError(
            `서버 응답 오류: ${
              error.response.data.message || "알 수 없는 문제 발생"
            }`
          );
        } else {
          setError("네트워크 오류 혹은 알 수 없는 문제 발생");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await changePassword(userData.username, currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Failed to change password:", error);

      if (error.response && error.response.data) {
        setError(
          `비밀번호 변경 실패: ${
            error.response.data.message || "알 수 없는 오류 발생"
          }`
        );
      } else {
        setError("서버와의 연결에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <strong>아이디:</strong> <span>{userData.username}</span>
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
            <label className="block text-sm font-medium mb-1">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end gap-4"> {/* 버튼 컨테이너 */}
            <button
              onClick={handlePasswordSubmit}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "변경 중..." : "변경"}
            </button>
            <button
              onClick={() => navigate(-1)} // 뒤로가기
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
