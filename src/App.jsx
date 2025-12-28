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

function App() {
  const { user } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route
            index
            element={
              isRecruiter() ? <RecruiterDashBoard /> : <CandidateDashBoard />
            }
          />
          <Route path=":new-job" element={<PostJob />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
