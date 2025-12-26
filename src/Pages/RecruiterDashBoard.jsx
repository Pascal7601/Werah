import React from "react";
import DashboardLayout from "../components/DashBoardLayout";
import StatCard from "../components/StatCard";
import {
  Briefcase,
  CheckCircle,
  Users,
  Clock,
  MoreHorizontal,
} from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Jobs"
          value="2"
          icon={Briefcase}
          color="bg-blue-600"
        />
        <StatCard
          title="Total Applicants"
          value="204"
          icon={Users}
          color="bg-purple-600"
        />
        <StatCard
          title="Interviews Sheduled"
          value="7"
          icon={Clock}
          color="bg-amber-500"
        />
        <StatCard
          title="Hired"
          value="3"
          icon={CheckCircle}
          color="bg-green-600"
        />
      </div>
      {/* --- Activity Section --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Active Job Postings</h2>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Applicants</th>
                <th className="px-6 py-3">Posted Date</th>
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
                <td className="px-6 py-4 text-slate-600">110</td>
                <td className="px-6 py-4 text-slate-500">Oct 24, 2025</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                    <Clock className="w-3 h-3" />
                    Active
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

export default RecruiterDashBoard;
