import React from "react";
import JobCard from "./JobCard";

function JobsSection() {
  return (
    <div className="bg-bgmain px-4 py-6 md:px-8 md:py-8 flex flex-col md:grid md:grid-cols-2 md:flex-row gap-5">
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  );
}

export default JobsSection;
