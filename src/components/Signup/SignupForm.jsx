import { useEffect, useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage('비밀번호가 같지 않습니다.');
    } else {
      setErrorMessage('');
    }
  }, [password, confirmPassword]);

  const handleSignUp = (e) => {
    e.preventDefault();
    // 회원가입 로직 추가
    console.log("회원가입 정보:", { name, email, password});
  };

  const handleDuplicateCheck = (type) => {
    // 중복 확인 로직 추가
    console.log(`${type} 중복 확인`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-80 text-center">
        <img src="/Grosaas_logo.png" alt="Logo" className="w-12 h-12 mb-5 mx-auto" />
        <h2 className="mb-5 font-semibold">
          <span className="text-indigo-600">GroSaaS</span> Dashboard
        </h2>
        <p className="mb-5 text-sm text-gray-600">Create your GroSaaS account<br />to get started!</p>
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
              onClick={() => handleDuplicateCheck("이름")}
              className="p-2 h-10 bg-blue-500 text-white text-[10.9px] leading-none rounded-md"
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
              onClick={() => handleDuplicateCheck("이메일")}
              className="p-2 h-10 bg-blue-500 text-white text-[10.9px] leading-none rounded-md"
            >
              중복확인
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
            className={`w-full p-2 rounded-md text-white ${name && email && password && confirmPassword && !errorMessage? 'bg-indigo-500 hover:bg-indigo-700 cursor-pointer' : 'bg-indigo-300 cursor-not-allowed'}`}
            disabled={!name || !email || !password || !confirmPassword || !errorMessage}
          >
            Sign Up
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
