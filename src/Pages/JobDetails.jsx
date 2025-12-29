import React, { useMemo } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

const fetchJobDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const JobDetails = () => {
  // Fetch Job Details from the API
  const { id } = useParams();
  const {
    data: job,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => fetchJobDetails(id),
  });
  // --- Extract Meta Data from HTML String ---
  const jobMeta = useMemo(() => {
    if (!job?.description) return {};

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(job.description, "text/html");

      // Helper to find text by the title label (e.g. "Location", "Job Type")
      const findValueByLabel = (labelText) => {
        // Find all titles (e.g., <span class="jkey-title">Location</span>)
        const titles = Array.from(doc.querySelectorAll(".jkey-title"));
        const titleNode = titles.find((el) =>
          el.textContent.toLowerCase().includes(labelText.toLowerCase())
        );

        if (titleNode) {
          // The value is usually in the next sibling <span class="jkey-info">
          const infoNode = titleNode.nextElementSibling;
          return infoNode ? infoNode.textContent.trim() : null;
        }
        return null;
      };

      // Fallback for Salary: Look for "Salary:" text in paragraphs if not in key-info
      const findSalaryInText = () => {
        const paragraphs = Array.from(doc.querySelectorAll("p"));
        const salaryP = paragraphs.find((p) =>
          p.textContent.includes("Salary:")
        );
        return salaryP
          ? salaryP.textContent.replace("Salary:", "").trim()
          : null;
      };

      return {
        location: findValueByLabel("Location"),
        type: findValueByLabel("Job Type") || findValueByLabel("Job Field"),
        salary: findSalaryInText(),
        experience: findValueByLabel("Experience"),
      };
    } catch (e) {
      console.error("Error parsing job description HTML", e);
      return {};
    }
  }, [job]);

  if (isLoading) {
    return <div>Loading job details...</div>;
  }
  if (error) {
    return <div>Error loading job details: {error.message}</div>;
  }

  // Sanitize job description to remove ads and unwanted content
  const rawDescription = job.description || "";
  const sanitizedDescription = DOMPurify.sanitize(rawDescription, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script", "iframe", "object", "embed"],
    FORBID_ATTR: ["onclick", "onmouseover"],
  });

  const displaySalary = jobMeta.salary || "Not Specified";
  const displayType = jobMeta.type || "Not Specified";
  const displayLocation = jobMeta.location || "Remote";

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/*Custom CSS to hide specific scraped junk */}
      <style>{`
        /* Hide Ads and useless links from the scraped HTML */
        #adbox, .adsbygoogle, .prompt-link, .view-all2, #read-in-ad {
          display: none !important;
        }
        /* Style the scraped content */
        .job-details ul { margin-bottom: 1rem; }
        .job-details li { margin-bottom: 0.5rem; }
        li p:last-child { display: none; }
        .job-key-info { display: none; }
        /* Fix the outer LI wrapper if present */
        li.job-description { list-style: none; margin: 0; padding: 0; }
      `}</style>
      {/* Header / Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:inline">
              Back to Jobs
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*  Main Content (Left Side) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-600/20 shrink-0">
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span>{job.company_name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      {job.company_name}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {displayLocation}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {formatDistanceToNow(new Date(job.posted_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Job Description
              </h2>
              <div
                className="prose prose-slate max-w-none text-slate-600"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>
          </div>

          {/* Sidebar (Right Side) */}
          <div className="space-y-6">
            {/* Quick Apply Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-6">Job Overview</h3>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Salary
                    </p>
                    <p className="font-medium text-slate-900">
                      {displaySalary}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Job Type
                    </p>
                    <p className="font-medium text-slate-900">{displayType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Posted
                    </p>
                    <p className="font-medium text-slate-900">
                      {formatDistanceToNow(new Date(job.posted_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {job.is_external ? (
                <a
                  href={job.external_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-3 bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Apply Now
                </a>
              ) : (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
