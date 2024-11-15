import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import data from "/data";

const CaseForm = () => {
  const navigate = useNavigate(); 

  const handleViewCase = (id) => {
    navigate(`/dashboard/${id}`); 
  };

  const handleCreateCase = () => {
    navigate('/create'); 
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
              {/* Sample Data Rows */}
              {data.datas.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between border-b p-4 h-16"
                  onClick={() => {handleViewCase(1)}}
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
