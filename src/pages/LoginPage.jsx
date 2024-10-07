import { useState } from "react"


const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // 로그인 처리 로직 추가
    console.log('Username:', username)
    console.log('Password:', password)
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md w-80 text-center">
        <img src="/Grosaas_logo.png" alt="Logo" className="w-12 h-12 mb-5 mx-auto" />
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
          <button
            type="submit"
            className={`w-full p-2 rounded-md text-white ${username && password ? 'bg-indigo-500 hover:bg-indigo-700 cursor-pointer' : 'bg-indigo-300 cursor-not-allowed'}`}
            disabled={!username || !password}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default LoginPage;