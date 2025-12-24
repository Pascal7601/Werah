import React from "react";
import {
  LayoutDashboard,
  FileText,
  Search,
  Settings,
  LogOut,
  X,
  Briefcase,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function DashBoardSideBar({ isOpen, onClose, role }) {
  const location = useLocation();

  // Helper to highlight active link
  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
        />
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay (Dark background when sidebar is open on phone) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Title Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-slate-900 font-mont">
              Werah
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 overflow-y-auto flex-1 font-mont">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />

          {role === "candidate" ? (
            <>
              <NavItem
                to="/dashboard/applications"
                icon={FileText}
                label="My Applications"
              />
              <NavItem to="/jobs" icon={Search} label="Search Jobs" />
            </>
          ) : (
            <>
              <NavItem
                to="/dashboard/my-jobs"
                icon={Briefcase}
                label="My Jobs"
              />
              {/* Add more recruiter links here */}
            </>
          )}

          <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors font-mont">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default DashBoardSideBar;
