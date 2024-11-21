import React, { useState } from "react";

const UserInfo = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">사용자 정보</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <p className="text-gray-800">{formData.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <p className="text-gray-800">{formData.email}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              취소
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
