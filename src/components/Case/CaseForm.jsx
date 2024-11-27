import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaselist, searchCase } from "../../apis/case/caseapi";
import { viewLog } from "../../apis/case/opensearch";
import Search from "../Search/Search";

const CaseForm = () => {
  const [caseList, setCaseList] = useState([]);
  const [log, setLog] = useState([null]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseList = async () => {
      try {
        const response = await getCaselist();
        const sortedData = (response || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCaseList(sortedData || []);
      } catch (error) {
        console.error("Error fetching case list:", error);
        setCaseList([]);
      }
    };

    const fetchLog = async () => {
      const response = await viewLog();
      setLog(response);
      console.log(response);
    }

    fetchCaseList();
    // fetchLog();
  }, []);

  const handleCreateCase = () => {
    navigate("/create");
  };

  const handleSearch = async (keyword) => {
    try {
      const response = await searchCase(keyword);
      const sortedData = (response || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCaseList(sortedData || []);
    } catch (error) {
      console.error("Error searching case list:", error);
      setCaseList([]);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <div className="font-bold text-[#d9d9d9] text-xl">Dashboard &gt;</div>
        <div className="flex items-center">
          <Link className="ml-2 font-bold text-xl">알림</Link>
          <Link to="/mypage" className="ml-2 font-bold text-xl">
            MyPage
          </Link>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* Main Content */}
        <div className="flex flex-col flex-grow bg-white p-4">
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center mb-4 gap-4">
              <div className="ml-2 font-bold text-4xl flex-shrink-0">Caselist</div>
              <Search onSearch={handleSearch} />
              <button
                className="bg-[#BEACEB] text-white p-2 rounded flex-shrink-0"
                onClick={handleCreateCase}
              >
                + Create Case
              </button>
            </div>
            <div className="flex flex-col">
              {caseList.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No cases found.
                </div>
              ) : (
                <>
                  <div className="flex flex-row justify-between border-b p-4 bg-gray-200">
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Case #
                    </div>
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Problem Title
                    </div>
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Product
                    </div>
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Version
                    </div>
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Serial Number
                    </div>
                    <div className="font-bold text-[#b6b6b6] flex-1 text-center px-2">
                      Severity
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-[330px] border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50">
                    {caseList.map((row, index) => (
                      <Link
                        to={`/case/${row.caseId}`}
                        key={index}
                        className="flex flex-row justify-between border-b p-4 h-16"
                      >
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {caseList.length - index}
                        </div>
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {row.problemTitle}
                        </div>
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {row.product}
                        </div>
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {row.version}
                        </div>
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {row.serialNumber}
                        </div>
                        <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                          {row.severity}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 mt-4">
            <div className="ml-2 font-bold text-4xl flex-shrink-0 mb-6">Log</div>
            <div className="flex flex-col">
              {log.length === 0 ? (
                <div className="text-center text-gray-500 p-4">No logs found.</div>
              ) : (
                <div className="overflow-y-auto max-h-[330px] border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50 p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(log, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
