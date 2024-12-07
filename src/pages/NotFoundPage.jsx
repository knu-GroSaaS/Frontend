import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        요청하신 페이지를 찾을 수 없습니다. URL을 확인하세요.
      </p>
      <Link
        to={-1}
        className="mt-6 bg-[#BEACEB] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#AFA5C8] transition"
      >
        이전 페이지로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
