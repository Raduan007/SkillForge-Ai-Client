import axios from "axios";
import { handleApiError } from "./errorHandler";

// Read Next.js env configuration
let rawApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!rawApiUrl) {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      rawApiUrl = "http://localhost:5000/api";
    } else {
      rawApiUrl = "https://skill-forge-ai-server-kappa.vercel.app/api";
    }
  } else {
    rawApiUrl = "https://skill-forge-ai-server-kappa.vercel.app/api";
  }
}

// Defensive parsing to prevent relative URL and missing protocol/path suffix issues:
if (rawApiUrl) {
  rawApiUrl = rawApiUrl.replace(/['"]/g, "").trim();
  
  // Ensure it has a protocol prefix
  if (!rawApiUrl.startsWith("http://") && !rawApiUrl.startsWith("https://")) {
    rawApiUrl = `https://${rawApiUrl}`;
  }
  
  // Ensure it has the /api path suffix
  if (!rawApiUrl.endsWith("/api")) {
    if (rawApiUrl.endsWith("/")) {
      rawApiUrl = rawApiUrl.slice(0, -1);
    }
    rawApiUrl = `${rawApiUrl}/api`;
  }
}

const BASE_API_URL = rawApiUrl;

console.log(`[API CLIENT] Initialized with Base URL: ${BASE_API_URL}`);

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
      let token = localStorage.getItem("skillforge-auth-token");
      if (token) {
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
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
