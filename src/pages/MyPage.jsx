import React from "react";
import UserInfo from "../components/User/Userinfo.jsx";
import PasswordChangeForm from "../components/User/PasswordChange.jsx";


const MyPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">My Page</h1>
      <UserInfo />
      <PasswordChangeForm />
    </div>
  );
};

export default MyPage;
