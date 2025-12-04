import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// =========================
// REQUEST INTERCEPTOR
// =========================
apiClient.interceptors.request.use(
  (config) => {
    const path = window.location.pathname;

    // Do NOT attach token on login/register pages
    if (path === "/auth" || path === "/auth") {
      return config;
    }

    const token = Cookies.get("token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const path = window.location.pathname;

    // Prevent infinite retry loop
    if (err.config && err.config._retry) {
      return Promise.reject(err);
    }

    err.config._retry = true;

    if (status === 401) {
      // Remove all stored auth
      Cookies.remove("token");


      // Prevent redirect loop
      if (path !== "/auth") {
        window.location.href = "/auth";
      }
    }

    return Promise.reject(err);
  }
);