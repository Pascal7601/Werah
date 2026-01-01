import { toast } from "react-toastify";

export const API_BASE_URL = "https://werah.me/api";

// API Call to Sign In/ register User
export const postUser = async (payload, endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("API response data:", data);

  // Check if request failed
  if (!response.ok) {
    // Create an Error object
    const error = new Error(data.detail || "Something went wrong");

    // Attach the backend validation errors  to the error object
    error.validationErrors = data;

    throw error;
  }

  return data;
};
