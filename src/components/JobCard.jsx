import React, { useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

function JobCard({ job }) {
  // Safe fallbacks
  const companyName = job.company_name || "Unknown Company";
  const initial = companyName.charAt(0).toUpperCase();

  // Extract Location Logic ---
  const displayLocation = useMemo(() => {
    // If the API has a dedicated location field, use it first
    if (job.location) {
      return job.location;
    }

    // If no location, try to parse it from the HTML description
    if (job.description) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(job.description, "text/html");

        // Look for the specific "Location" key in the scraped HTML
        const titles = Array.from(doc.querySelectorAll(".jkey-title"));
        const titleNode = titles.find((el) =>
          el.textContent.toLowerCase().includes("location")
        );

        if (titleNode) {
          const infoNode = titleNode.nextElementSibling;
          if (infoNode) {
            return infoNode.textContent.trim();
          }
        }
      } catch (e) {
        // Silently fail if parsing errors
      }
    }

    // 3. Final Fallback
    return "Remote / Unknown";
  }, [job.location, job.description]);

  // Format Date (Handle if date is invalid)
  let timeAgo = "Recently";
  try {
    if (job.posted_at) {
      timeAgo = formatDistanceToNow(new Date(job.posted_at), {
        addSuffix: true,
      });
    }
  } catch (e) {
    timeAgo = "Recently";
  }

  // Sanitize job description to remove ads and unwanted content
  const rawDescription = job.description || "";
  const sanitizedDescription = DOMPurify.sanitize(rawDescription, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script", "iframe", "object", "embed"],
    FORBID_ATTR: ["onclick", "onmouseover"],
  });

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Header: Logo & Title */}
      <div className="flex gap-4 items-center">
        <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg shrink-0 text-blue-700 font-bold text-xl">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={companyName}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p>{initial}</p>
          )}
        </div>
        <div className="overflow-hidden">
          <h3
            className="font-semibold text-slate-900 text-lg truncate"
            title={job.title}
          >
            {job.title}
          </h3>
          <p className="text-slate-500 text-sm">{companyName}</p>
        </div>
      </div>

      {/* Skills Tags (Optional: Only show if skills exist) */}
      {job.required_skills && job.required_skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.required_skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id || skill}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
            >
              {typeof skill === "object" ? skill.name : skill}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
      </div>

      {/* Footer Meta */}
      <div className="flex items-center gap-6 mt-auto pt-2 text-slate-500 text-sm">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600" />
          <p>{displayLocation}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-600" />
          <p>{timeAgo}</p>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`/jobs/${job.id}`} className="block mt-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default JobCard;
