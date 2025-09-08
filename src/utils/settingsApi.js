import axios from "axios";

// Make sure your .env has VITE_API_URL ending with /api
const API = import.meta.env.VITE_API_URL;

// Create a separate instance for settings
const settingsApi = axios.create({
  baseURL: API, // e.g., http://localhost:5000/api
  headers: { "Content-Type": "application/json" },
});

// Attach token manually
settingsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("finwise_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: simple response interceptor to log errors
settingsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Settings API Error:", error);
    return Promise.reject(error);
  }
);

export default settingsApi;
