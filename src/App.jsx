import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import RecruiterDashBoard from "./Pages/RecruiterDashBoard";
import { useState } from "react";
import CandidateDashBoard from "./Pages/CandidateDashBoard";

function App() {
  const [isRecruiter, setRecruiter] = useState(true);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            isRecruiter ? <RecruiterDashBoard /> : <CandidateDashBoard />
          }
        />
      </Routes>
    </>
  );
}

export default App;
