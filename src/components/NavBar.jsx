import React from "react";

function NavBar() {
  return (
    <nav className="bg-bgmain flex justify-center items-center flex-col gap-4 py-5">
      <div className="font-bold font-mont">WERAH</div>
      <div className="flex gap-5 font-mont">
        <button className="bg-white py-2 px-4 rounded-lg cursor-pointer text-sm font-semibold">
          Sign In
        </button>
        <button className="bg-bluemain py-2 px-4 rounded-lg text-white cursor-pointer text-sm font-semibold">
          Post A Job
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
