import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  sendVerificationCode,
  verifyCode,
  changePassword,
} from "../../apis/user/user.js";

const MyPage = () => {
  const navigate = useNavigate();

  // 사용자 정보 상태
  const [userData, setUserData] = useState({
    id: 0,
    username: "",
    email: "",
    phoneNum: "",
    site: "",
  });

  // 인증 상태
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(null); // 인증번호 유효 상태
  const [codeMessage, setCodeMessage] = useState("");

  // 비밀번호 변경 상태
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setUserData({
          id: response.id,
          username: response.username,
          email: response.email,
          phoneNum: response.phoneNum,
          site: response.site,
        });
      } catch (error) {
        //console.error("사용자 정보 가져오기 실패:", error);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 인증번호 전송
  const handleSendCode = async () => {
    try {
      setError("");
      setIsCodeSent(true);
      await sendVerificationCode();
      setCodeMessage("인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      //console.error("인증번호 전송 실패:", error);
      setError("인증번호 전송에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      setError("");
      const isValid = await verifyCode(verificationCode);
      setIsCodeValid(isValid);
      setCodeMessage(
        isValid ? "인증번호가 확인되었습니다." : "인증번호가 일치하지 않습니다."
      );
      if (isValid) {
        setShowPasswordPopup(true); // 비밀번호 변경 팝업 표시
      }
    } catch (error) {
      //console.error("인증번호 확인 실패:", error);
      setCodeMessage("인증번호 확인에 실패했습니다.");
      setIsCodeValid(false);
    }
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    setPasswordMessage("");

    try {
      await changePassword(userData.username, currentPassword, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.");
      window.location.href = "/login";
      setShowPasswordPopup(false); // 팝업 닫기
    } catch (error) {
      //console.error("비밀번호 변경 실패:", error);
      setPasswordMessage(
        "비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인하세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">로딩 중...</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">My Page</h1>
        {/* 뒤로가기 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="ml-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>

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
          <h2 className="text-xl font-semibold mb-4">비밀번호 변경하기</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full h-12"
              placeholder="비밀번호 변경을 위해 이메일 인증번호를 입력해주세요."
              disabled={!isCodeSent}
            />
            <button
              onClick={
                isCodeSent && verificationCode
                  ? handleVerifyCode
                  : handleSendCode
              }
              className={`flex items-center justify-center px-6 rounded-md text-white text-center ${
                isCodeSent && !verificationCode
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isCodeSent && !verificationCode}
              style={{
                height: "48px",
                whiteSpace: "nowrap",
                minWidth: "120px",
              }}
            >
              {isCodeSent && verificationCode
                ? "인증번호 확인"
                : "인증번호 전송"}
            </button>
          </div>

          {codeMessage && (
            <p
              className={`text-sm mt-2 ${
                isCodeValid ? "text-blue-500" : "text-red-500"
              }`}
            >
              {codeMessage}
            </p>
          )}
        </div>

        {/* 비밀번호 변경 팝업 */}
        {showPasswordPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
              <div className="mb-4">
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
              <div className="mb-4">
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
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className={`w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "변경 중..." : "비밀번호 변경"}
              </button>
              {passwordMessage && (
                <p
                  className={`text-sm mt-2 ${
                    isSubmitting ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {passwordMessage}
                </p>
              )}
              <button
                onClick={() => setShowPasswordPopup(false)}
                className="mt-4 w-full text-center text-red-500"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
