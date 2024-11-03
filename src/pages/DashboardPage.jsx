import { useState } from "react";
import CaseForm from "../components/Case/CaseForm";
import SideBar from "../components/SideBar";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
        <CaseForm />
      </div>
    </div>
  );
};

export default DashboardPage;