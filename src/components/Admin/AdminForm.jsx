import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../apis/admin/admin";

const AdminForm = () => {
  const [userList, setUserList] = useState([]);
  const[selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await getUser();
        setUserList(response);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };
    fetchUserList();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="bg-white h-20 flex items-center justify-between px-8">
        <div className="font-bold text-[#d9d9d9] text-xl">UserList &gt;</div>
        <div className="flex items-center">
          <Link className="ml-2 font-bold text-xl">알림</Link>
          <Link to="/mypage" className="ml-2 font-bold text-xl">
            MyPage
          </Link>
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
                "Password",
                "Email",
                "PhoneNum",
                "UserType",
                "Site",
                "Status",
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
                    row.id,
                    row.username,
                    row.password,
                    row.email,
                    row.phoneNum,
                    row.usertype,
                    row.site,
                    row.status,
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
              <div><strong>EmailVerified:</strong> {selectedRow?.emailVerified}</div>
              <div><strong>EmailVerificationToken:</strong> {selectedRow?.emailVerificationToken}</div>
              <div><strong>ResetToken:</strong> {selectedRow?.resetToken}</div>
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
