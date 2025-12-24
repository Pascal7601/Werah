import React, { useState } from "react";
import {
  User,
  Briefcase,
  Mail,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "Yup";
import { Link } from "react-router-dom";

// --- Validation Schema ---
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

// reusable styles for inputs
export const inputClass = (error, touched) =>
  `block w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm placeholder-slate-400 ${
    error && touched ? "border-red-500 ring-1 ring-red-500" : "border-slate-200"
  }`;
export const labelClass =
  "block text-xs font-semibold font-roboto text-slate-700 mb-1.5 uppercase tracking-wider";

function SignUp() {
  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      role: role,
    };
    console.log("submiting", payload);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="w-full mx-auto max-w-sm py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-roboto text-slate-900 mb-2 text-center">
          Werah
        </h1>
        <h2 className="font-roboto text-2xl font-semibold text-slate-800 text-center">
          Create an Account
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Join thousands of professionals finding their dream jobs.
        </p>
      </div>

      {/* 2. Role Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-8 border border-slate-200">
        <button
          onClick={() => setRole("candidate")}
          className={`flex items-center justify-center hover:cursor-pointer gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            role === "candidate"
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <User className="w-5 h-5" />
          Candidate
        </button>

        <button
          onClick={() => setRole("recruiter")}
          className={`flex items-center justify-center hover:cursor-pointer gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            role === "recruiter"
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          Recruiter
        </button>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <Field
                  name="firstName"
                  placeholder="Jane"
                  className={`px-4 ${inputClass(
                    errors.firstName,
                    touched.firstName
                  ).replace("pl-10", "")}`} // Remove left padding as no icon here
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <Field
                  name="lastName"
                  placeholder="Doe"
                  className={`px-4 ${inputClass(
                    errors.lastName,
                    touched.lastName
                  ).replace("pl-10", "")}`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass(errors.email, touched.email)}
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClass(errors.password, touched.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:cursor-pointer hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Repeat Password */}
            <div>
              <label className={labelClass}>Repeat Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <Field
                  name="repeatPassword"
                  type="password"
                  placeholder="••••••••"
                  className={inputClass(
                    errors.repeatPassword,
                    touched.repeatPassword
                  )}
                />

                {/* Right Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:cursor-pointer hover:text-slate-600 focus:outline-none"
                >
                  {showRepeatPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all mt-4"
            >
              {isSubmitting
                ? "Creating Account..."
                : `Join as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </Form>
        )}
      </Formik>
      <div className="py-2">
        <p className="text-sm text-slate-600 text-center">
          Already have an account?
          <Link to="/login">
            <span className="text-bluemain ml-1 hover:cursor-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
