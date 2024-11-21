import React, { useState } from "react";

const PasswordChangeForm = ({ onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onPasswordChange(password);
      setPassword("");
      setConfirmPassword("");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">새 비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          변경하기
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
