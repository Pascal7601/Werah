import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-bgmain flex justify-center items-center flex-col md:flex-row md:justify-between md:px-4 gap-4 py-5">
      <div className="font-bold font-mont md:text-2xl">WERAH</div>
      <div className="flex gap-5 font-mont">
        <Link to="/login">
          <button className="bg-white py-2 px-4 rounded-lg cursor-pointer text-sm font-semibold md:text-lg md:font-medium">
            Sign In
          </button>
        </Link>
        <Link>
          <button className="bg-bluemain py-2 px-4 rounded-lg text-white cursor-pointer text-sm md:text-lg font-semibold md:font-medium">
            Post A Job
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
