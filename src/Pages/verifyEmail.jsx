import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../utils";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State for the UI
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("Verifying your email address...");

  // Ref to prevent double-firing in React Strict Mode
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token found.");
      return;
    }

    // Prevent running twice in development
    if (verificationAttempted.current) return;
    verificationAttempted.current = true;

    const verifyToken = async () => {
      try {
        // Call your Django API
        await fetch(`${API_BASE_URL}/auth/verify-email/?token=${token}`);

        setStatus("success");
        setMessage(
          "Your email has been successfully verified! You can now log in to your account."
        );
      } catch (error) {
        setStatus("error");
        // Try to get the specific error message from backend, or fallback
        const errorMsg =
          error.response?.data?.token?.[0] ||
          error.response?.data?.message ||
          "Verification failed. The link may be invalid or expired.";
        setMessage(errorMsg);
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        {/* --- STATUS ICONS --- */}
        <div className="flex justify-center mb-6">
          {status === "verifying" && (
            <div className="p-4 bg-blue-50 rounded-full animate-pulse">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          )}
          {status === "success" && (
            <div className="p-4 bg-green-50 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          )}
          {status === "error" && (
            <div className="p-4 bg-red-50 rounded-full">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          )}
        </div>

        {/* --- TITLE --- */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {status === "verifying" && "Verifying..."}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* --- MESSAGE --- */}
        <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>

        {/* --- ACTIONS --- */}
        {status === "success" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Proceed to Login
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {status === "error" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-all"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
