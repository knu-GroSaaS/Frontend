import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCaselist } from "../../apis/case/caseapi";

const CaseForm = () => {
  const [caseList, setCaseList] = useState([]); // 상태를 통해 데이터를 저장

  useEffect(() => {
    // 백엔드에서 데이터 가져오기
    const fetchCaseList = async () => {
      try {
        const response = await getCaselist(); // 백엔드 API 호출
        setCaseList(response.data); // 데이터 상태에 저장
      } catch (error) {
        console.error("Error fetching case list:", error);
      }
    };

    fetchCaseList();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

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
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Case Number
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Subject
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Product
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Severity
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Date Created
              </div>
              <div className="font-bold text-[#b6b6b6] w-1/6 text-center">
                Contact Name
              </div>
            </div>

            <div className="overflow-y-auto h-[250px]">
              {/* 데이터 행 표시 */}
              {caseList.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between border-b p-4 h-16"
                >
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.caseNumber}
                  </div>
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.subject}
                  </div>
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.product}
                  </div>
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.severity}
                  </div>
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.date}
                  </div>
                  <div className="text-sm w-1/6 flex items-center justify-center">
                    {row.contact}
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
