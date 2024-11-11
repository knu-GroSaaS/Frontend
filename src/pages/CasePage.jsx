import { useState } from "react";
import CaseUnit from "../components/Case/CaseUnit";
import SideBar from "../components/SideBar";

const CasePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return(
    <div className="flex">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
        <CaseUnit />
      </div>
    </div>
  );
};

export default CasePage;