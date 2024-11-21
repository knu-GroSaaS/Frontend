import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance";

const MyPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNum: "",
    site: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/info");
        const { username, email, phoneNum, site } = response.data;
        setUserData({
          name: username,
          email,
          phoneNum,
          site,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put("/user/update", {
        username: userData.name,
        email: userData.email,
        phoneNum: userData.phoneNum,
        site: userData.site,
      });
      alert("사용자 정보가 성공적으로 업데이트되었습니다.");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update user data:", error);
      alert("사용자 정보를 업데이트하는데 실패했습니다.");
    }
  };

  const handlePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    console.log("New password:", newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("비밀번호가 성공적으로 변경되었습니다.");
    // 서버로 비밀번호 변경 API 요청 추가 가능
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">My Page</h1>

        <div className="mb-6">
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

        <div>
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
      </div>
    </div>
  );
};

export default MyPage;
