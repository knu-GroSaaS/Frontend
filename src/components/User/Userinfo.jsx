import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getUser, sendVerificationCode, verifyCode } from "../../apis/user/user.js";

const MyPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNum: "",
    site: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
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
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSendCode = async () => {
    try {
      setError("");
      await sendVerificationCode(userData.email);
      setIsCodeSent(true);
      alert("인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
      setError("인증번호 전송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      setError("");
      const isValid = await verifyCode(userData.email, verificationCode);
      if (isValid) {
        setIsCodeValid(true);
        alert("인증번호가 확인되었습니다.");
      } else {
        setError("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      setError("인증번호 확인에 실패했습니다.");
    }
  };

  const handlePasswordSubmit = async () => {
    if (!isCodeValid) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

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
      console.error("비밀번호 변경 실패:", error);
      setError("비밀번호 변경에 실패했습니다.");
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

        {/* 인증번호 섹션 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">이메일 인증</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              placeholder="인증번호를 입력하세요"
              disabled={!isCodeSent}
            />
            <button
              onClick={isCodeSent ? handleVerifyCode : handleSendCode}
              className={`px-4 py-2 rounded-md text-white ${
                isCodeSent ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isCodeSent ? "인증번호 확인" : "인증번호 전송"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
          <div className="flex justify-end gap-4">
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
              onClick={() => navigate(-1)}
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
