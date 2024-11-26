import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../apis/admin/admin";

const AdminForm = () => {
  const [userList, setUserList] = useState([]);

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
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                User #
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                Username
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                Password
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                Email
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                PhoneNum
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                UserType
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                Site
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                Status
              </div>
              {/* <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                CreateTime
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                UpdateTime
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                PasswordUpdateTime
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                DeleteTime
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                EmailVerified
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                EmailVerificationToken
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                ResetToken
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                TokenExpiryTime
              </div>
              <div className="font-bold text-[#b6b6b6] flex-[0.75] text-center px-2">
                AuthStatus
              </div> */}
            </div>

            <div className="overflow-y-auto max-h-[250px] border border-b-gray-300 rounded shadow-xl bg-gradient-to-b from-gray-100 to-gray-50">
              {/* 데이터 행 표시 */}
              {userList.map((row, index) => (
                <div key={index} className="flex border-b">
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.id}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.username}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.password}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.email}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.phoneNum}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.usertype}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.site}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.status}
                  </div>
                  {/* <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.createTime}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.updateTime}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.passwordUpdateTime}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.deleteTime}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.emailVerified}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.emailVerificationToken}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.resetToken}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.tokenExpiryTime}
                  </div>
                  <div className="text-sm flex-1 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {row.authStatus}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
