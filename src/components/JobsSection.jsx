import React from "react";
import JobCard from "./JobCard";
import { API_BASE_URL } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";

function JobsSection({ searchTerm }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobs", searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.append("title", searchTerm);
      }
      console.log("Fetching jobs with params:", params.toString());
      const response = await fetch(
        `${API_BASE_URL}/jobs/?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin mx-auto w-10 h-10" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-20 flex flex-col justify-center items-center text-center text-red-600">
        <AlertCircle className="w-10 h-10 mb-4" />
        <p>Error loading jobs: {error.message}</p>
      </div>
    );
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
