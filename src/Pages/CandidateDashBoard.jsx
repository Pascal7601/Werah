import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  Briefcase,
  CheckCircle,
  Users,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import StatCard from "../components/StatCard";

function CandidateDashBoard() {
  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, Candidate! 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here is what's happening with your job search today.
        </p>
      </div>

      {/* --- Stats Grid  --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Jobs Applied"
          value="12"
          icon={Briefcase}
          color="bg-blue-600"
        />
        <StatCard
          title="Interviews Scheduled"
          value="2"
          icon={Users}
          color="bg-purple-600"
        />
        <StatCard
          title="Offers Received"
          value="1"
          icon={CheckCircle}
          color="bg-green-600"
        />
      </div>

      {/* --- Activity Section --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Recent Applications</h2>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Job Role</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Date Applied</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Application Data Row */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Senior Backend Engineer
                </td>
                <td className="px-6 py-4 text-slate-600">TechFlow Systems</td>
                <td className="px-6 py-4 text-slate-500">Oct 24, 2025</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                    <Clock className="w-3 h-3" />
                    In Review
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CandidateDashBoard;
