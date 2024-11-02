import { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
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
      <div className="bg-white p-10 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl font-semibold mb-6">회원가입</h2>
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
              className="p-2 bg-blue-500 text-white rounded-md"
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
              className="p-2 bg-blue-500 text-white rounded-md"
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
            className="p-2 bg-gray-400 text-white rounded-md"
          >
            회원가입
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
