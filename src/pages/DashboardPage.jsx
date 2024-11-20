import { useState } from "react";
import CaseForm from "../components/Case/CaseForm";
import SideBar from "../components/SideBar";

const DashboardPage = () => {
  return (
    <div className="flex">
      <SideBar />
      <CaseForm />
    </div>
  );
};

export default DashboardPage;
