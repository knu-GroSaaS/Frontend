import React from "react";
import { Link } from "react-router-dom";

const CaseForm = () => {
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
              {[
                {
                  caseNumber: "240901 -734212",
                  subject: "F5 BIGIP: NETWORK IM-",
                  product: "F5 BIGIP",
                  severity: "Major",
                  date: "24.09.01 12:51:33",
                  contact: "User01",
                },
                {
                  caseNumber: "240901 -734211",
                  subject: "FireEyes: NETWORK IM-",
                  product: "FireEyes",
                  severity: "Major",
                  date: "24.09.01 11:09:33",
                  contact: "User01",
                },
                {
                  caseNumber: "240817 -623411",
                  subject: "F5 BIGIP: CREATE AUTH-",
                  product: "F5 BIGIP",
                  severity: "Major",
                  date: "24.08.17 08:51:12",
                  contact: "User02",
                },
                {
                  caseNumber: "240815 -618988",
                  subject: "F5 BIGIP: SSH ACCESS-",
                  product: "F5 BIGIP",
                  severity: "Minor",
                  date: "24.08.15 05:45:07",
                  contact: "User02",
                },
                {
                  caseNumber: "240810 -617898",
                  subject: "F5 BIGIP: CRON SCHED-",
                  product: "F5 BIGIP",
                  severity: "Critical",
                  date: "24.08.10 03:23:08",
                  contact: "User03",
                },
                {
                  caseNumber: "240801 -523411",
                  subject: "FireEyes: HOW TO CHEC-",
                  product: "FireEyes",
                  severity: "Critical",
                  date: "24.08.01 12:51:33",
                  contact: "User01",
                },
              ].map((row, index) => (
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
            <button className="bg-[#BEACEB] text-white p-2 rounded">
              + Create Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
