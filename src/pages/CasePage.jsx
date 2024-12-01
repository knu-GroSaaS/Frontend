import { useState } from "react";
import CaseUnit from "../components/Case/CaseUnit";
import SideBar from "../components/SideBar";

const CasePage = () => {
  return (
    <div className="flex">
      <SideBar />
      <CaseUnit />
    </div>
  );
};

export default CasePage;
