import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="w-full bg-gray-50 text-black text-center py-6 sm:py-10 mt-10">
        <div className="flex flex-col items-center space-y-4 sm:space-y-9">
          <h1 className="text-3xl sm:text-8xl font-extrabold">GroSaaS</h1>
          <h1 className="text-3xl sm:text-3xl font-extrabold">
            보안 데이터 관리 시스템
          </h1>
          <p className="text-base sm:text-lg font-light">
            OpenSearch를 활용한 효율적인 보안 데이터 검색 및 분석
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-wrap justify-center items-center bg-white shadow-md rounded-lg p-6 sm:p-8 mt-8 sm:mt-10 mx-auto max-w-5xl gap-6">
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            왜 우리 시스템인가?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            OpenSearch를 기반으로 한 실시간 데이터 시각화와 이상 탐지를 통해
            보안 위협을 빠르게 탐지하고 대응할 수 있는 시스템을 제공합니다.
            효율적인 검색과 직관적인 대시보드를 통해 보안 데이터를 완벽하게
            관리하세요.
          </p>
          <div className="flex justify-center mt-3 space-x-4">
            <Link
              to="/login"
              className="bg-[#BEACEB] text-white text-sm sm:text-xl font-bold py-3 px-6 sm:py-4 sm:px-8 rounded shadow-lg hover:bg-[#AFA5C8] transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
        <div>
          <img
            src="/assets/Opensearch.png"
            alt="보안 데이터 관리"
            className="rounded-lg shadow-lg mx-auto w-auto h-40 sm:h-60"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-8 sm:py-12 mt-8 sm:mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
            주요 기능
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                실시간 데이터 시각화
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                보안 데이터를 실시간으로 확인하고 모니터링하세요.
              </p>
            </div>
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                이상 탐지 및 알림
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                이상 징후를 자동 탐지하고 빠르게 알림을 받으세요.
              </p>
            </div>
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                데이터 접근 제어
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                사용자 권한에 따라 데이터를 안전하게 보호합니다.
              </p>
            </div>
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                상관관계 분석
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                로그 데이터 간의 상관관계를 분석하여 보안 위험을 예측합니다.
              </p>
            </div>
          </div>
          <img
            src="/assets/grometric.png"
            alt="기업 로고"
            className="mx-auto w-auto h-10 mt-32 sm:h-10"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-300 text-center py-4 sm:py-6 mt-auto">
        <p>© 2024 Security Data Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
