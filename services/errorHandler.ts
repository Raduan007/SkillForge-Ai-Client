import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface BackendErrorResponse {
  error?: string;
  message?: string;
}

/**
 * Global HTTP error handling utility.
 * Intercepts Axios responses to emit toast warnings and format errors.
 */
export function handleApiError(error: AxiosError): Promise<never> {
  // Extract error description if present in payload
  const responseData = error.response?.data as BackendErrorResponse | undefined;
  const message = responseData?.error || responseData?.message || error.message || "A network transaction error occurred.";

  // Emit toast notification (on browser-side runtime only)
  if (typeof window !== "undefined") {
    toast.error(message, {
      id: "api-error-toast", // deduplicate double triggers
    });
  }

  console.error("[API ERROR INTERCEPTOR]:", {
    status: error.response?.status,
    url: error.config?.url,
    message,
  });

  return Promise.reject(new Error(message));
}
