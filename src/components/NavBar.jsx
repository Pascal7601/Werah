import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";

function NavBar() {
  const btnBaseClass =
    "py-2 px-4 rounded-lg cursor-pointer text-sm font-semibold md:text-lg md:font-medium transition-colors";
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-bgmain flex justify-center items-center flex-col md:flex-row md:justify-between md:px-4 gap-4 py-5">
      <div className="font-bold font-mont md:text-2xl">WERAH</div>
      <div className="flex gap-5 font-mont">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <button className={`${btnBaseClass} bg-white `}>Dashboard</button>
          </Link>
        ) : (
          <Link to="/sign-up">
            <button className="bg-bluemain py-2 px-4 rounded-lg text-white cursor-pointer text-sm md:text-lg font-semibold md:font-medium">
              Sign Up
            </button>
          </Link>
        )}

        {/** conditionally render logout and login button when the user is authenticated */}
        {isAuthenticated ? (
          <button
            onClick={() => handleLogout()}
            className={`${btnBaseClass} bg-red-500 text-white hover:bg-red-600`}
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className={`${btnBaseClass} bg-white `}>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
