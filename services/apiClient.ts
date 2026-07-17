import axios from "axios";
import { handleApiError } from "./errorHandler";

// Read Next.js env configuration
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Reusable Axios Client Instance configured with:
 * - Base URL from environment variables
 * - Automated JSON Content-Type headers
 * - Request interceptor for authorization placeholders
 * - Response interceptor for centralized error warning triggers
 */
export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 12000, // 12 seconds request timeout
});

// REQUEST INTERCEPTORS (Authorization header placeholder)
apiClient.interceptors.request.use(
  (config) => {
    // Only execute on browser runtime
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("skillforge-auth-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTORS (Automated JSON handling, global error warnings)
apiClient.interceptors.response.use(
  (response) => {
    // Return standard response data directly
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      return handleApiError(error);
    }
    return Promise.reject(error);
  }
);
