import { useState } from "react"
import LoginSuccess from "./LoginSuccess";
import { getLogin } from "../../apis/login/loginapi";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // function : 로그인 API 호출 //
      const loginSuccess = await getLogin(username, password);
      console.log("Login attempt with:", { username, password });
      if (loginSuccess) {
        setIsLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Login failed", err);
      setErrorMessage(
        "로그인에 실패했습니다.\n아이디와 비밀번호를 확인해주세요."
      );
    }
  }
  if (isLoggedIn) {
    return <LoginSuccess />;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-96 h-fit text-center">
        <img src="src/assets/Grosaas_logo.png" alt="Logo" className="w-12 h-12 mb-5 mx-auto" />
        <h2 className="mb-5 font-semibold">
          <span className="text-indigo-600">GroSaaS</span> Dashboard
        </h2>
        <p className="mb-5 text-sm text-gray-600">Please login to GroSaaS Dashboards</p>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          {errorMessage && <div className="text-red-500 text-sm h-14">{errorMessage.split('\n').map((line, index) => (<div key={index}>{line}</div>))}</div>}
          <button
            type="submit"
            className={`w-full p-2 rounded-md text-white ${username && password ? 'bg-indigo-500 hover:bg-indigo-700 cursor-pointer' : 'bg-indigo-300 cursor-not-allowed'}`}
            disabled={!username || !password}
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-blue-500">
            회원가입
          </a>
        </p>
      </div>
    </div>
    </>
  );
}

export default LoginForm;
