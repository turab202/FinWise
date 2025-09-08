import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// --- Attach token to every request ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("finwise_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Handle 401: try refresh token ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("finwise_refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(`${API}/auth/refresh`, { refreshToken });

          const { token, refreshToken: newRefreshToken } = res.data;

          localStorage.setItem("finwise_token", token);
          if (newRefreshToken) localStorage.setItem("finwise_refresh_token", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // retry original request
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
