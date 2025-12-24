import React, { useState } from "react";
import DashBoardHeader from "./DashBoardHeader";
import DashBoardSideBar from "./DashBoardSideBar";

const DashboardLayout = ({ children, role = "candidate" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <DashBoardSideBar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        role={role}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashBoardHeader onMenuClick={toggleSidebar} />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
