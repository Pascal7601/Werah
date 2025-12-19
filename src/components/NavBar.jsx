import React from "react";

function NavBar() {
  return (
    <nav className="bg-bgmain flex justify-center items-center flex-col gap-4 py-5">
      <div>WERAH</div>
      <div className="flex gap-5">
        <button className="bg-white py-2 px-4 rounded-xl cursor-pointer">
          Sign In
        </button>
        <button className="bg-bluemain py-2 px-4 rounded-xl text-white cursor-pointer">
          Post A Job
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
