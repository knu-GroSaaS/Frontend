import React, { useState } from "react";

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    console.log("New password:", newPassword);
    // 서버로 비밀번호 변경 API 요청 추가 가능
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handlePasswordSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        변경
      </button>
    </div>
  );
};

export default PasswordChangeForm;
