import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BiBriefcaseAlt } from "react-icons/bi";

function SignUp() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-roboto">Werah</h1>
      <h2 className="font-roboto text-2xl font-semibold">Create an Account</h2>
      <p>Join thousands of professionals finding their dream jobs.</p>

      <div className="flex gap-2">
        <div>
          <MdOutlinePersonOutline />
          <p>Candidate</p>
        </div>
        <div>
          <BiBriefcaseAlt />
          <p>Recruiter</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
