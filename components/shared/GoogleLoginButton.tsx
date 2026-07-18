"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parentElement: HTMLElement,
    options: {
      type?: string;
      theme?: string;
      size?: string;
      text?: string;
      shape?: string;
      logo_alignment?: string;
      width?: number;
    }
  ) => void;
  prompt: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

export const GoogleLoginButton: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const containerId = React.useId().replace(/:/g, "-");

  // Dynamically load Google script if not already present
  React.useEffect(() => {
    if (window.google?.accounts?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScriptLoaded(true);
      return;
    }

    const scriptSrc = "https://accounts.google.com/gsi/client";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      const handleLoad = () => setScriptLoaded(true);
      existingScript.addEventListener("load", handleLoad);
      if (window.google?.accounts?.id) {
        setScriptLoaded(true);
      }
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Google Identity Services SDK.");
      toast.error("Failed to load Google Sign-In script. Check your connection.", { duration: 3000 });
    };
    document.body.appendChild(script);
  }, []);

  // Initialize and Render Button when script is ready
  React.useEffect(() => {
    if (!scriptLoaded) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in .env.local");
      return;
    }

    const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
      setIsAuthenticating(true);
      const loadingToastId = toast.loading("Verifying your Google account...");

      try {
        const idToken = response.credential;
        const apiResponse = await apiClient.post<{
          success: boolean;
          message: string;
          data: {
            accessToken: string;
            user: import("@/providers/AuthProvider").SafeUser;
          };
        }>("/auth/google", { idToken });

        const result = apiResponse.data;

        if (result.success && result.data) {
          toast.success(result.message || "Welcome back!", { id: loadingToastId, duration: 2000 });
          
          // Log user in
          login(result.data.accessToken, result.data.user);

          // Redirect to callback URL or dashboard
          const redirectTo = searchParams.get("redirect") || "/";
          router.push(redirectTo);
        } else {
          toast.error("Google authentication failed. Server returned error.", { id: loadingToastId, duration: 3000 });
        }
      } catch (err: unknown) {
        console.error("Google API Callback Error:", err);
        let errorMsg = "Could not authenticate with backend. Please check your credentials.";
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as { response?: { data?: { error?: string } } };
          if (axiosError.response?.data?.error) {
            errorMsg = axiosError.response.data.error;
          }
        }
        toast.error(errorMsg, { id: loadingToastId, duration: 3000 });
      } finally {
        setIsAuthenticating(false);
      }
    };

    try {
      const google = window.google;
      if (google?.accounts?.id) {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render Google standard button. It handles responsiveness inside.
        const parentElement = document.getElementById(containerId);
        if (parentElement) {
          google.accounts.id.renderButton(parentElement, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: parentElement.offsetWidth || 340, // fallback
          });
        }
      }
    } catch (e) {
      console.error("Error rendering Google Identity Services button:", e);
    }
  }, [scriptLoaded, containerId, login, router, searchParams]);

  // Handle responsiveness / window resizing
  React.useEffect(() => {
    if (!scriptLoaded) return;

    const handleResize = () => {
      const parentElement = document.getElementById(containerId);
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const google = window.google;
      if (parentElement && google?.accounts?.id && clientId) {
        // Re-render button to adjust to new width
        google.accounts.id.renderButton(parentElement, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: parentElement.offsetWidth || 340,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scriptLoaded, containerId]);

  return (
    <div className="w-full relative flex flex-col items-center">
      {isAuthenticating && (
        <div className="absolute inset-0 bg-white/75 dark:bg-[#090d16]/75 z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      <div 
        id={containerId} 
        className="w-full flex justify-center min-h-[44px]"
      />
    </div>
  );
};
