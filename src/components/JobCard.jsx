import React from "react";
import { MdLocationOn } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";

function JobCard() {
  return (
    <div className="bg-white p-4 flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <div className="bg-blue-200 w-15 p-3 text-center">
          <p>PP</p>
        </div>
        <div className="font-mont">
          <p className="font-semibold">Senior Backend Engineer</p>
          <p className="text-sm">Malimali Solutions</p>
        </div>
      </div>
      <div className="flex gap-3 text-sm">
        <div className="bg-gray-200 py-1  px-4 rounded-2xl">
          <p>Python</p>
        </div>
        <div className="bg-gray-200 py-1  px-4 rounded-2xl">
          <p>Django</p>
        </div>
        <div className="bg-gray-200 py-1  px-4 rounded-2xl">
          <p>MySQL</p>
        </div>
      </div>
      <div className="flex gap-9">
        <div className="flex items-center gap-2 text-sm">
          <MdLocationOn />
          <p className="text-gray-400">Nairobi, Kenya</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TbClockHour3Filled />
          <p className="text-gray-400">2 hours ago</p>
        </div>
      </div>
      <div className="mx-auto">
        <button className="bg-bluemain px-8 py-1 text-white font-semibold cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
