import React, { use, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "Yup";
import { Link } from "react-router-dom";
import { inputClass, labelClass } from "./SignUp";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { postUser } from "../utils";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number")
    .required("Password is required"),
});

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //nhandles user details submission and updates auth store
  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await postUser(payload, "auth/login");
      useAuthStore
        .getState()
        .login(response.access_token, response.user_details);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-sm py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-roboto text-slate-900 mb-2 text-center">
          Werah
        </h1>
        <h2 className="font-roboto text-2xl font-semibold text-slate-800 text-center">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-sm mt-1 text-center">
          Enter your details to access your dashboard.
        </p>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
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
                  placeholder="john@example.com"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all mt-4"
            >
              {isSubmitting ? "signing in..." : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="py-2">
        <p className="text-sm text-slate-600 text-center">
          Don't have an account?
          <Link to="/sign-up">
            <span className="text-bluemain ml-1 hover:cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
