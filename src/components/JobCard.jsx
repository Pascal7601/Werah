import React from "react";
import { MdLocationOn } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";

function JobCard() {
  return (
    <div className="bg-white p-4 md:p-8  flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <div className="bg-blue-200 w-15 md:w-16 p-3 md:p-5 text-center">
          <p>PP</p>
        </div>
        <div className="font-mont">
          <p className="font-semibold md:font-semibold md:text-lg">
            Senior Backend Engineer
          </p>
          <p className="text-sm md:text-lg">Malimali Solutions</p>
        </div>
      </div>
      <div className="text-sm line-clamp-3 md:line-clamp-2 text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        praesentium non laborum quam autem, deleniti quasi debitis doloribus
        rerum ratione, sed aliquid explicabo ducimus minus eveniet molestiae,
        possimus excepturi corrupti.
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
        <button className="bg-bluemain px-8 md:px-20 py-1 text-white font-semibold cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
