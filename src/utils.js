export const API_BASE_URL = "http://localhost:8000/api";

// API Call to Sign In/ register User
export const postUser = async (payload, endpoint) => {
  return await fetch(`${API_BASE_URL}/${endpoint}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (!response.ok) {
      console.log("Response not ok:", response);
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
