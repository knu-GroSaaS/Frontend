import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateAuth, DeleteAuth, getUsers } from "../../apis/admin/admin";
import { getUser } from "../../apis/user/user";  

const AdminForm = () => {
  // 사용자 목록 상태 관리
  const [userList, setUserList] = useState([]);
  // 선택된 행 상태 관리
  const [selectedRow, setSelectedRow] = useState(null);
  // 팝업 열림 여부 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requester, setRequester] = useState(null);

  // 컴포넌트 마운트 시 사용자 목록을 가져오는 함수 호출
  useEffect(() => {
    const fetchRequester = async () => {
      try {
        const response = await getUser();
        setRequester(response.data.username);
      } catch (error) {
        console.error('Failed to fetch requester information:', error);
        setRequester('Unknown Requester');
      }
    };

    const fetchUserList = async () => {
      try {
        // 서버에서 사용자 목록을 가져옴
        const response = await getUsers();
        setUserList(response); // 사용자 목록 상태에 저장
      } catch (error) {
        console.error("Error fetching user list:", error); // 오류 로그 출력
      }
    };

    fetchRequester();
    fetchUserList();
  }, []);

  // 사용자 상태에 따라 색상 결정 함수
  const getStatusColor = (type) => {
    console.log("type: "+type);
    if (type === "ROLE_USER" || type === "ROLE_ADMIN") {
      return "bg-green-500"; // 활성 상태인 경우 초록색
    } else if (type === null) {
      return "bg-red-500"; // 비활성 상태인 경우 빨간색
    }
    return "bg-gray-500"; // 기본 상태 색상
  };

  // 날짜를 한국 표준시(KST)로 포맷팅하는 함수
  const formatKST = (dateString) => {
    if (!dateString) return "N/A"; // 날짜가 없는 경우 "N/A" 반환
    const date = new Date(dateString);
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC에서 9시간 추가
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Seoul",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(kstDate);
  };

  const handleAuthStatusToggle = (index) => {
    const updatedList = [...userList];
    const unit = updatedList[index];
    if (unit){
      if (unit.authStatus === "AUTH"){
        unit.authStatus = "NOT_AUTH";
        DeleteAuth(requester, unit.username);
      }
      else if (unit.authStatus === "NOT_AUTH"){
        unit.authStatus = "AUTH";
        CreateAuth(requester, unit.username);
      }
      setUserList(updatedList);
    } else {
      console.error("User not found at index:", index);
    }
  };
  
  return (
    <div className="flex flex-col w-full h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <div className="font-bold text-[#d9d9d9] text-xl">UserList &gt;</div>
        <div className="flex items-center">
          <div className="ml-2 font-bold text-xl">AdminPage</div>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* 메인 컨텐츠 영역 */}
        <div className="flex-grow bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="ml-2 font-bold text-4xl">Userlist</div>
          </div>
          <div className="flex flex-col">
            {/* 테이블 헤더 */}
            <div className="flex flex-row justify-between border-b p-4 bg-gray-200">
              {[
                "User #",
                "Username",
                "Email",
                "PhoneNum",
                "Site",
                "Status",
                "Auth_status",
              ].map((header, index) => (
                <div
                  key={index}
                  className="font-bold text-[#b6b6b6] flex-1 text-center px-2"
                >
                  {header}
                </div>
              ))}
            </div>

            {/* 사용자 데이터 목록 */}
            <div className="overflow-y-auto flex-1 border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50">
              {userList.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between border-b p-4 h-16"
                  onClick={() => {
                    setSelectedRow(row); // 선택된 사용자 저장
                    setIsPopupOpen(true); // 팝업 열기
                  }}
                >
                  {[
                    index+1,
                    row.username,
                    row.email,
                    row.phoneNum,
                    row.site,
                    // 상태 표시 컬러
                    <div className="flex justify-center items-center">
                      <span
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          row.userType
                        )}`}
                      ></span>
                    </div>,  
                    <div className="flex justify-center items-center">
                      {/* Auth_status 체크박스 */}
                      <button
                        className={`flex justify-center items-center py-1 px-4 ${
                          row.authStatus === "AUTH"
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAuthStatusToggle(index);
                        }}
                      >
                        {row.authStatus}
                      </button>
                    </div>,                
                    ].map((cell, idx) => (
                    <div
                      key={idx}
                      className="text-lg flex-[1] text-center px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 사용자 상세 정보를 보여주는 팝업 */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              User Details: {selectedRow?.username}
            </h2>
            <div className="flex flex-col gap-2">
              {/* 사용자 상세 정보 */}
              <div>
                <strong>CreateTime:</strong> {formatKST(selectedRow?.createTime)}
              </div>
              <div>
                <strong>UpdateTime:</strong> {formatKST(selectedRow?.updateTime)}
              </div>
              <div>
                <strong>PasswordUpdateTime:</strong>{" "}
                {formatKST(selectedRow?.passwordUpdateTime)}
              </div>
            </div>
            {/* 팝업 닫기 버튼 */}
            <button
              className="mt-4 bg-[#BEACEB] text-white py-2 px-4 rounded hover:bg-[#9d87c7]"
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
