import React from "react";
import JobCard from "./JobCard";
import { API_BASE_URL } from "../utils";
import { useQuery } from "@tanstack/react-query";

function JobsSection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/jobs/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  if (isLoading) {
    return <div>Loading jobs...</div>;
  }
  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }
  console.log("Fetched jobs data:", data);
  return (
    <div className="bg-bgmain px-4 py-6 md:px-8 md:py-8 flex flex-col md:grid md:grid-cols-2 md:flex-row gap-5">
      {data.results?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobsSection;
