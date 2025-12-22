import React from "react";
import { CiSearch } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

function HeroSection() {
  return (
    <section className="pb-7">
      {/**Hero section text section */}
      <section className="flex py-7 flex-col items-center font-roboto">
        <p className="font-bold text-2xl/9 md:text-5xl text-center tracking-wider">
          Find Work That <br />
          <span className="text-bluemain">Works For You</span>
        </p>
        <p className="text-center max-w-sm text-sm md:text-xl md:max-w-2xl">
          Discover opportunities that align with your skills, your values, and
          your ambition. The smarter way to build the career you deserve.
        </p>
      </section>

      {/**Hero section job search section*/}
      <section className="flex flex-col gap-2 items-center max-w-sm mx-auto md:max-w-2xl">
        <div className="flex gap-1 bg-bgmain px-2 py-1 items-center rounded w-full">
          <CiSearch size={20} />
          <input
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="Search for a job..."
          />
        </div>
        <div className="flex gap-1 bg-bgmain px-2 py-1 items-center rounded w-full">
          <BiCategory size={20} />
          <input
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="Select category"
          />
        </div>
        <div className="flex gap-1 bg-bgmain px-2 py-1 items-center rounded w-full">
          <IoDocumentTextOutline size={20} />
          <input
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="Select Job Type"
          />
        </div>
        <div className="flex gap-1 bg-bgmain px-2 py-1 items-center rounded w-full">
          <MdLocationOn size={20} />
          <input
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="Select Location"
          />
        </div>
      </section>
    </section>
  );
}

export default HeroSection;
