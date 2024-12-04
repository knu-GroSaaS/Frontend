import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getUser, sendVerificationCode } from "../../apis/user/user.js";

const MyPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNum: "",
    site: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setUserData(response.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        setError("사용자 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSendVerificationCode = async () => {
    try {
      const response = await sendVerificationCode(userData.email);
      setVerificationCode(response.data.code); // 서버에서 보낸 인증 코드
      setShowVerificationPopup(true); // 팝업 열기
    } catch (error) {
      console.error("인증 코드 발송 실패:", error);
      setError("인증 코드를 발송하지 못했습니다.");
    }
  };

  const handleVerifyCode = () => {
    if (enteredCode === verificationCode) {
      setIsCodeValid(true);
      setShowVerificationPopup(false); // 인증 팝업 닫기
      setShowPasswordPopup(true); // 비밀번호 변경 팝업 열기
    } else {
      setError("인증 코드가 일치하지 않습니다.");
    }
  };

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
      setShowPasswordPopup(false); // 팝업 닫기
    } catch (error) {
      console.error("Failed to change password:", error);
      setError("비밀번호 변경에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
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
        </div>

        {/* 인증 코드 발송 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSendVerificationCode}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            인증 코드 발송
          </button>
        </div>

        {/* 인증 팝업 */}
        {showVerificationPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">인증 코드 확인</h2>
              <input
                type="text"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                placeholder="인증 코드를 입력하세요"
                className="p-2 border border-gray-300 rounded-md w-full mb-4"
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleVerifyCode}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowVerificationPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 비밀번호 변경 팝업 */}
        {showPasswordPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
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
              <div className="flex justify-end gap-2">
                <button
                  onClick={handlePasswordSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  변경
                </button>
                <button
                  onClick={() => setShowPasswordPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
