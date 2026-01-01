import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import RecruiterDashBoard from "./Pages/RecruiterDashBoard";
import { useState } from "react";
import CandidateDashBoard from "./Pages/CandidateDashBoard";
import PostJob from "./Pages/PostJob";
import { isRecruiter, useAuthStore } from "./store/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import JobDetails from "./Pages/JobDetails";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./Pages/verifyEmail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/** Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route
            index
            element={
              isRecruiter() ? <RecruiterDashBoard /> : <CandidateDashBoard />
            }
          />
          <Route path="new-job" element={<PostJob />} />
        </Route>
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </>
  );
}

export default App;
