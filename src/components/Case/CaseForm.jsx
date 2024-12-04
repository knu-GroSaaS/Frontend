import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaselist, searchCase } from "../../apis/case/caseapi";
import { viewLog } from "../../apis/case/opensearch";
import Search from "../Search/Search";
import MemoryAndSwapBarGraph from "../OpenSearch/MemoryBarGraph";

const CaseForm = () => {
  // 케이스 리스트를 저장하는 상태
  const [caseList, setCaseList] = useState([]);
  // 로그 데이터를 저장하는 상태
  const [log, setLog] = useState(null);
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 케이스 리스트와 로그 데이터를 가져옴
  useEffect(() => {
    // 케이스 리스트를 가져오는 비동기 함수
    const fetchCaseList = async () => {
      try {
        const response = await getCaselist();
        // 가져온 데이터를 최신순으로 정렬
        const sortedData = (response || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCaseList(sortedData || []);
      } catch (error) {
        //console.error("케이스 리스트를 가져오는 중 오류 발생:", error);
        setCaseList([]);
      }
    };

    // 로그 데이터를 가져오는 비동기 함수
    const fetchLog = async () => {
      try {
        const response = await viewLog();
        // 로그 데이터가 있는 경우, 첫 번째 로그를 설정
        if (response && response.hits && response.hits.hits.length > 0) {
          setLog(response.hits.hits[0]._source);
        }
      } catch (error) {
        //console.error("로그 데이터를 가져오는 중 오류 발생:", error);
        setLog(null);
      }
    };

    // 데이터 가져오기 함수 호출
    fetchCaseList();
    fetchLog();
  }, []);

  // "Create Case" 버튼 클릭 시 호출되는 함수
  const handleCreateCase = () => {
    navigate("/create");
  };

  // 검색 기능 처리 함수
  const handleSearch = async (keyword) => {
    try {
      const response = await searchCase(keyword);
      // 검색 결과를 최신순으로 정렬
      const sortedData = (response || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCaseList(sortedData || []);
    } catch (error) {
      //console.error("케이스 검색 중 오류 발생:", error);
      setCaseList([]);
    }
  };

  return (
    <div
      className="flex flex-col w-full h-screen"
      style={{ marginLeft: "276px" }}
    >
      {/* 상단 헤더 */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <button
          className="font-bold text-[#d9d9d9] text-xl"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard &gt;
        </button>
        <div className="flex items-center">
        <Link to="*" className="ml-2 font-bold text-xl">알림</Link>
          <Link to="/mypage" className="ml-2 font-bold text-xl">
            MyPage
          </Link>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col bg-white h-[calc(100vh-5rem)]">
        {/* 상단 영역: 케이스 리스트 */}
        <div className="flex flex-col h-1/2 p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4 gap-4">
            <div className="ml-2 font-bold text-4xl flex-shrink-0">
              Caselist
            </div>
            {/* 검색 컴포넌트 */}
            <Search onSearch={handleSearch} />
            <button
              className="bg-[#BEACEB] text-white p-2 rounded flex-shrink-0"
              onClick={handleCreateCase}
            >
              + Create Case
            </button>
          </div>
          <div className="flex flex-col h-full overflow-y-auto border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50">
            {caseList.length === 0 ? (
              <div className="text-center text-gray-500 p-4">
                No cases found.
              </div>
            ) : (
              <>
                {/* 케이스 리스트 헤더 */}
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

                {/* 케이스 리스트 데이터 */}
                <div className="overflow-y-auto h-full">
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

        {/* 하단 영역: 로그 및 상태 */}
        <div className="flex h-1/2 space-x-4 p-4">
          {/* 로그 섹션 */}
          <div className="flex flex-col w-1/2">
            <div className="ml-2 font-bold text-4xl mb-4">Log</div>
            <div className="flex-grow overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-50 p-4 rounded shadow-xl">
              {log ? (
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(log, null, 2)}
                </pre>
              ) : (
                <div className="text-center text-gray-500">No logs found.</div>
              )}
            </div>
          </div>

          {/* 상태 섹션 */}
          <div className="flex flex-col w-1/2">
            <div className="ml-2 font-bold text-4xl mb-4">Status</div>
            <div className="flex-grow bg-gradient-to-b from-gray-100 to-gray-50 p-4 rounded shadow-xl">
              {log ? (
                <MemoryAndSwapBarGraph data={log} />
              ) : (
                <div className="text-center text-gray-500">
                  No status data found.
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
