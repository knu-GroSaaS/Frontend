import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("비밀번호가 같지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword]);

  const handleSignUp = (e) => {
    e.preventDefault();
    // 회원가입 로직 추가
    console.log("회원가입 정보:", { name, email, password });
  };

  const handleUsernameCheck = async () => {
    if (!name.trim()) {
      setNicknameError("");
      return;
    }
    try {
      const isNicknameAvailable = await getCheckNickname(name);
      if (isNicknameAvailable) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      } else {
        setIsNicknameChecked(true);
        setNicknameError("사용 가능한 닉네임입니다.");
      }
    } catch (err) {
      console.error("Nickname check failed", err);
      setNicknameError("닉네임 중복 체크에 실패했습니다.");
    }
  };

  const handleEmailCheck = async () => {
    if (!email.trim()) {
      setEmailError("");
      return;
    }
    try {
      const isEmailAvailable = await getCheckEmail(email);
      if (isEmailAvailable) {
        setEmailError("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        setIsEmailChecked(true);
        setEmailError("사용 가능한 이메일입니다.");
      }
    } catch (err) {
      console.error("Email check failed", err);
      setEmailError("이메일 중복 체크에 실패했습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-96 text-center">
        <img
          src="/Grosaas_logo.png"
          alt="Logo"
          className="w-12 h-12 mb-5 mx-auto"
        />
        <h2 className="mb-5 font-semibold">
          <span className="text-indigo-600">GroSaaS</span> Dashboard
        </h2>
        <p className="mb-5 text-sm text-gray-600">
          Create your GroSaaS account
          <br />
          to get started!
        </p>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            />
            <button
              type="button"
              onClick={() => handleUsernameCheck("username")}
              className="w-20 h-10 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-xs rounded-md flex items-center justify-center"
            >
              중복 확인
            </button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            />
           <button
              type="button"
              onClick={() => handleEmailCheck("email")}
              className="w-20 h-10 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-xs rounded-md flex items-center justify-center"
            >
              중복 확인
            </button>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className={`w-30 h-20 p-2 rounded-md text-3xl text-white ${
              name && email && password && confirmPassword && !errorMessage
                ? "bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
            disabled={
              !name || !email || !password || !confirmPassword || !errorMessage
            }
          >
            {isLoading ? <LoadingSpinner /> : "Sign up!"}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="text-blue-500">
              로그인
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
