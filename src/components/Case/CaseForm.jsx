import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaselist } from "../../apis/case/caseapi";

const CaseForm = () => {
  const [caseList, setCaseList] = useState([]); // 초기 상태를 빈 배열로 설정
  const navigate = useNavigate(); // useNavigate 추가

  useEffect(() => {
    const fetchCaseList = async () => {
      try {
        const response = await getCaselist();
        const sortedData = (response || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCaseList(sortedData || []); // response.data가 없으면 빈 배열 할당
      } catch (error) {
        console.error("Error fetching case list:", error);
        setCaseList([]); // 오류 시 빈 배열로 설정
      }
    };

    fetchCaseList();
  }, []);

  const handleCreateCase = () => {
    navigate("/create");
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <div className="font-bold text-[#d9d9d9] text-xl">Dashboard &gt;</div>
        <div className="flex items-center">
          <Link className="ml-2 font-bold text-xl">알림</Link>
          <Link className="ml-2 font-bold text-xl">Admin</Link>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* Main Content */}
        <div className="flex-grow bg-white p-4">
          <div className="flex">
            <div className="ml-2 font-bold text-4xl">Caselist</div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between border-b p-4 bg-gray-200">
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Case ID
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Status
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Created At
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Updated At
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Subject
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Product
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Description
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/8 text-center">
                Version
              </div>
            </div>

            <div className="overflow-y-auto h-[250px]">
              {/* 데이터 행 표시 */}
              {caseList.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between border-b p-4 h-16"
                >
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.caseId}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.caseStatus}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {new Date(row.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {new Date(row.updatedAt).toLocaleString()}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.subject}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.product}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.description}
                  </div>
                  <div className="text-sm w-1/8 flex items-center justify-center">
                    {row.version}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#BEACEB] text-white p-2 rounded"
              onClick={handleCreateCase} // 버튼 클릭 시 handleCreateCase 호출
            >
              + Create Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
