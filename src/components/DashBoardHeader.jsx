import React from "react";
import { Menu, BellDot, CirclePlus } from "lucide-react";

function DashBoardHeader({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="flex justify-between px-5 py-4 font-mont items-center">
        {/* Left Side: Menu & Title */}
        <div className="flex gap-4 items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <p className="font-bold text-xl text-slate-800">Dashboard</p>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex gap-4 items-center">
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-600/20">
            <span>Post A Job</span>
            <CirclePlus className="w-4 h-4" />
          </button>

          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
            <BellDot className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-700 font-semibold text-sm cursor-pointer hover:bg-blue-200 transition-colors">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashBoardHeader;
