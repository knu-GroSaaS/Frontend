import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateAuth, DeleteAuth, getUser } from "../../apis/admin/admin";

const AdminForm = () => {
  const [userList, setUserList] = useState([]);
  const[selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requester, setRequester] = useState(null);

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
        const response = await getUser();
        setUserList(response);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchRequester();
    fetchUserList();
  }, []);

  const getStatusColor = (status) => {
    if (status === "ACTIVE") {
      return "bg-green-500"; // 초록불
    } else if (status === "INACTIVE") {
      return "bg-red-500"; // 빨간불
    }
    return "bg-gray-500"; // 기본 색상
  };

  const handleAuthStatusToggle = (index) => {
    setUserList((prevList) =>
      prevList.map((user, idx) =>{
        if (idx === index){
          if (user.authStatus === "AUTH"){
            user.authStatus = "NOT AUTH";
            DeleteAuth(requester, user.username);
          }
          else if (user.authStatus === "NOT AUTH"){
            user.authStatus = "AUTH";
            CreateAuth(requester, user.username);
          }
        }
        else user
      })
    );
  };
  
  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <div className="font-bold text-[#d9d9d9] text-xl">UserList &gt;</div>
        <div className="flex items-center">
          <div className="ml-2 font-bold text-xl">AdminPage</div>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* Main Content */}
        <div className="flex-grow bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="ml-2 font-bold text-4xl">Userlist</div>
          </div>
          <div className="flex flex-col">
            {/* 헤더 */}
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

            {/* 데이터 */}
            <div className="overflow-y-auto flex-1 border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50">
            {userList.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between border-b p-4 h-16"
                  onClick={() => {
                    setSelectedRow(row);
                    setIsPopupOpen(true);
                  }}
                >
                  {[
                    index+1,
                    row.username,
                    row.email,
                    row.phoneNum,
                    row.site,
                    <div className="flex justify-center items-center">
                      <span
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          row.status
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

      {/* 팝업 */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">User Details: {selectedRow?.username}</h2>
            <div className="flex flex-col gap-2">
              <div><strong>CreateTime:</strong> {selectedRow?.createTime}</div>
              <div><strong>UpdateTime:</strong> {selectedRow?.updateTime}</div>
              <div><strong>PasswordUpdateTime:</strong> {selectedRow?.passwordUpdateTime}</div>
              <div><strong>DeleteTime:</strong> {selectedRow?.deleteTime}</div>
              <div><strong>TokenExpiryTime:</strong> {selectedRow?.tokenExpiryTime}</div>
              <div><strong>AuthStatus:</strong> {selectedRow?.authStatus}</div>
            </div>
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
