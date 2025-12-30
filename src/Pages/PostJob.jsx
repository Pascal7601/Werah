import React, { useState } from "react";
import DashboardLayout from "../components/DashBoardLayout";
import {
  Briefcase,
  MapPin,
  Building2,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const PostJob = () => {
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    description: "",
    company: "", // In a real app, this would be a Dropdown of the user's companies
  });

  // Skills State (For the Tag Input)
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // Handling Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Skill Tag Logic
  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.type === "click") && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, required_skills: skills };
    console.log("Submitting Job:", payload);
    alert("Job Posted! (Check console for payload)");
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
          <p className="text-slate-500 mt-1">Find your next star employee.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>

            <div className="grid gap-5">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Backend Engineer"
                  className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Nairobi, Remote"
                      className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Employment Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-slate-700"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              {/* Company Selector (Mock) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Company Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    name="company"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-slate-700"
                  >
                    <option value="">Select a company...</option>
                    <option value="1">TechFlow Systems</option>
                    <option value="2">Create New Company +</option>
                  </select>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  The job will be posted under this company profile.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Job Description */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Job Description
            </h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="8"
              placeholder="Describe the role, responsibilities, and requirements..."
              className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              required
            ></textarea>
            <p className="text-xs text-slate-400 mt-2 text-right">
              Markdown supported
            </p>
          </div>

          {/* Card 3: Skills & Requirements */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Required Skills
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              {/* Render Tags */}
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-white text-blue-700 text-sm font-medium px-2.5 py-1 rounded-md border border-blue-100 shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-400 hover:text-blue-600 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Input */}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder={
                  skills.length === 0
                    ? "Type a skill and hit Enter (e.g. Python)"
                    : ""
                }
                className="flex-1 bg-transparent outline-none text-sm min-w-[150px] px-2 py-1"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press{" "}
              <span className="font-mono bg-slate-100 px-1 rounded">Enter</span>{" "}
              to add a skill tag. These will help match candidates.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 pb-12">
            <button
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
