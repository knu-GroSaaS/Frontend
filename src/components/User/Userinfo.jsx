import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, sendVerificationCode, verifyCode, changePassword } from "../../apis/user/user.js";

const MyPage = () => {
  const navigate = useNavigate();

  // 사용자 정보 상태 (username은 비밀번호 변경을 위해 유지하지만 화면에 표시하지 않음)
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
  const [codeMessage, setCodeMessage] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(null); // 인증번호 유효 상태

  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setUserData({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          phoneNum: response.data.phoneNum,
          site: response.data.site,
        });
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
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
      await sendVerificationCode(userData.email);
      setIsCodeSent(true);
      setCodeMessage("인증번호가 이메일로 전송되었습니다.");
      setIsCodeValid(null); // 인증 상태 초기화
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
      setError("인증번호 전송에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      setError("");
      const isValid = await verifyCode(userData.email, verificationCode);
      setIsCodeValid(isValid);
      setCodeMessage(isValid ? "인증번호가 확인되었습니다." : "인증번호가 일치하지 않습니다.");
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
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
      setPasswordMessage("비밀번호가 성공적으로 변경되었습니다.");
      setIsPasswordChanged(true);
      // 비밀번호 변경 후 입력 필드 초기화
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setPasswordMessage("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인하세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">로딩 중...</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">My Page</h1>

        {/* 사용자 정보 섹션 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
          <div className="mb-2">
            <strong>아이디:</strong> <span>{userData.id}</span>
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
          {codeMessage && (
            <p
              className={`text-sm mt-2 ${
                isCodeValid === null
                  ? "text-gray-500"
                  : isCodeValid
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {codeMessage}
            </p>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* 비밀번호 변경 섹션 */}
        {isCodeValid && (
          <div>
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
                  isPasswordChanged ? "text-blue-500" : "text-red-500"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </div>
        )}

        {/* 뒤로가기 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
