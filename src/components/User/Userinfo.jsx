import React, { useState } from "react";

const UserInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "홍길동",
    email: "honggildong@example.com",
    phoneNum: "010-1234-5678",
    site: "www.example.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated user data:", userData);
    // 서버로 업데이트 API 요청 추가 가능
    setEditMode(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
      {editMode ? (
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">전화번호</label>
            <input
              type="tel"
              name="phoneNum"
              value={userData.phoneNum}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">사이트</label>
            <input
              type="text"
              name="site"
              value={userData.site}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            저장
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <strong>이름:</strong> <span>{userData.name}</span>
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
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
