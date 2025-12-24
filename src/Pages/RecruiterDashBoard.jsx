import React from "react";
import DashboardLayout from "../components/DashBoardLayout";

function RecruiterDashBoard() {
  return (
    <DashboardLayout role="recruiter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Recruiter Dashboard
        </h1>
        <p className="text-slate-500">
          Manage your job postings and applicants.
        </p>
      </div>

      {/* Recruiter content */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 h-64 flex items-center justify-center text-slate-400">
        Recruiter Content Area
      </div>
    </DashboardLayout>
  );
}

export default RecruiterDashBoard;
