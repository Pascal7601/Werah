import React from "react";
import JobCard from "./JobCard";

function JobsSection() {
  return (
    <div className="bg-bgmain px-4 py-6 flex flex-col gap-5">
      <JobCard />
      <JobCard />
    </div>
  );
}

export default JobsSection;
