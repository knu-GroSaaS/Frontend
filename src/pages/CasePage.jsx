import { useState } from "react";
import CaseUnit from "../components/Case/CaseUnit";
import SideBar from "../components/SideBar";

const CasePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex">
      <SideBar />
      <CaseUnit />
    </div>
  );
};

export default CasePage;
