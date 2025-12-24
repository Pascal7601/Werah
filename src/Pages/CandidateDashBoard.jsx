import React from "react";
import DashboardLayout from "../components/DashBoardLayout";

function CandidateDashBoard() {
  return (
    <DashboardLayout role="candidate">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, Candidate!
        </h1>
        <p className="text-slate-500">Here are your latest job stats.</p>
      </div>

      {/* Your Candidate content goes here (Stats, Tables, etc.) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 h-64 flex items-center justify-center text-slate-400">
        Dashboard Content Area
      </div>
    </DashboardLayout>
  );
}

export default CandidateDashBoard;
