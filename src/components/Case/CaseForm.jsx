import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaselist, searchCase } from "../../apis/case/caseapi";
import { viewLog } from "../../apis/case/opensearch";
import Search from "../Search/Search";
import MemoryAndSwapBarGraph from "../OpenSearch/MemoryBarGraph";

const CaseForm = () => {
  const [caseList, setCaseList] = useState([]);
  const [log, setLog] = useState(null); // 단일 데이터 처리
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
      try {
        const response = await viewLog();
        if (response && response.hits && response.hits.hits.length > 0) {
          setLog(response.hits.hits[0]._source); // 첫 번째 데이터만 사용
        }
      } catch (error) {
        console.error("Error fetching log:", error);
        setLog(null);
      }
    };

    fetchCaseList();
    fetchLog();
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
    <div className="flex flex-col w-full h-screen" style={{ marginLeft: "276px" }}>
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

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-white">
        {/* Upper Half: Case List */}
        <div className="flex flex-col flex-1 p-4">
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
          <div className="flex flex-col overflow-y-auto">
            {caseList.length === 0 ? (
              <div className="text-center text-gray-500 p-4">No cases found.</div>
            ) : (
              <>
                <div className="flex flex-row justify-between p-4 bg-gray-200">
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

                <div className="overflow-y-auto flex-grow bg-gradient-to-b from-gray-100 to-gray-50">
                  {caseList.map((row, index) => (
                    <Link
                      to={`/case/${row.caseId}`}
                      key={index}
                      className="flex flex-row justify-between p-4 h-16 border-b"
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

        {/* Lower Half: Log and Status */}
        <div className="flex flex-row flex-1 space-x-4 p-4">
          {/* Log Section */}
          <div className="flex flex-col w-1/2">
            <div className="ml-2 font-bold text-4xl mb-4">Log</div>
            <div className="flex-grow overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-50 p-4 rounded shadow">
              {log ? (
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(log, null, 2)}
                </pre>
              ) : (
                <div className="text-center text-gray-500">No logs found.</div>
              )}
            </div>
          </div>

          {/* Status Section */}
          <div className="flex flex-col w-1/2">
            <div className="ml-2 font-bold text-4xl mb-4">Status</div>
            <div className="flex-grow bg-gradient-to-b from-gray-100 to-gray-50 p-4 rounded shadow">
              {log ? (
                <MemoryAndSwapBarGraph data={log} />
              ) : (
                <div className="text-center text-gray-500">No status data found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
