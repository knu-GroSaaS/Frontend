import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getCheck, getJoin } from "../../apis/signup/signup";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [site, setSite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 형식 유효성 상태
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navi = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!isNicknameChecked) {
      setErrorMessage("닉네임 중복 체크를 해주세요.");
      setIsLoading(false);
      return;
    }
    if (!isEmailChecked) {
      setErrorMessage("이메일 중복 체크를 해주세요.");
      setIsLoading(false);
      return;
    }
    try {
      await getJoin(name, email, phoneNum, site);
      navi("/login");
    } catch (err) {
      //console.error("Signup failed", err);
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameCheck = async () => {
    if (!name.trim()) {
      setNicknameError("");
      return;
    }
    try {
      const isNicknameAvailable = await getCheck("username", name);
      setIsNicknameChecked(isNicknameAvailable);
      setNicknameError(isNicknameAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.");
    } catch (err) {
      //console.error("Nickname check failed", err);
      setNicknameError("닉네임 중복 체크에 실패했습니다.");
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    // 이메일 형식 검증
    if (name.length > 0) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
    setNicknameError("");
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(email));
    setIsEmailChecked(false); // 이메일 중복 체크 초기화
    setEmailError("");
  };

  const handleEmailCheck = async () => {
    if (!email.trim() || !isEmailValid) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    try {
      const isEmailAvailable = await getCheck("email", email);
      setIsEmailChecked(isEmailAvailable);
      setEmailError(isEmailAvailable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다.");
    } catch (err) {
      //console.error("Email check failed", err);
      setEmailError("이메일 중복 체크에 실패했습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-96 text-center">
        <img src="/assets/Grosaas_logo.png" alt="Logo" className="w-12 h-12 mb-5 mx-auto" />
        <h2 className="mb-5 font-semibold">
          <span className="text-indigo-600">GroSaaS</span> Dashboard
        </h2>
        <p className="mb-5 text-sm text-gray-600">
          Create your GroSaaS account
          <br />
          to get started!
        </p>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <div className={`flex items-center ${!nicknameError ? "mb-4" : ""}`}>
            <input
              type="text"
              placeholder="아이디"
              value={name}
              onChange={handleNameChange}
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            />
            <button
              type="button"
              onClick={handleUsernameCheck}
              className={`w-20 h-10 ${nicknameValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"} text-white text-xs rounded-md flex items-center justify-center`}
              disabled={!nicknameValid}
            >
              중복 확인
            </button>
          </div>
          <div className="text-sm">
            <p className={`text-${isNicknameChecked ? "blue" : "red"}-500`}>{nicknameError}</p>
          </div>
          <div className={`flex items-center ${!emailError ? "mb-4" : ""}`}>
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={handleEmailChange} // 이메일 변경 핸들러
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
              required
            />
            <button
              type="button"
              onClick={handleEmailCheck}
              className={`w-20 h-10 ${isEmailValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"} text-white text-xs rounded-md flex items-center justify-center`}
              disabled={!isEmailValid} // 이메일 형식이 유효하지 않으면 버튼 비활성화
            >
              중복 확인
            </button>
          </div>
          <div className="text-sm">
            <p className={`text-${isEmailChecked ? "blue" : "red"}-500`}>{emailError}</p>
          </div>
          <input
            type="tel"
            placeholder="전화번호"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            className="p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="site"
            placeholder="사이트"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={
              !name || !email || !phoneNum || !site || !isNicknameChecked || !isEmailChecked || !isEmailValid || isLoading
            }
            className={`w-30 h-20 p-2 rounded-md text-3xl text-white ${
              !name || !email || !phoneNum || !site || !isNicknameChecked || !isEmailChecked || !isEmailValid || isLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {isLoading ? <LoadingSpinner /> : "Sign up!"}
          </button>
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
          <p className="text-center text-sm text-gray-500 mt-4">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-500">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;