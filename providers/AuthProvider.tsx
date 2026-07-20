"use client";

import * as React from "react";
import { safeLocalStorage } from "@/utils/storage";
import { apiClient } from "@/services/apiClient";

export interface SafeUser {
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
  provider: "local" | "google";
  role: "user" | "admin";
  isVerified: boolean;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: SafeUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: SafeUser) => void;
  logout: () => void;
  updateUser: (user: SafeUser) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<SafeUser | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleLogout = React.useCallback(() => {
    setToken(null);
    setUser(null);
    safeLocalStorage.removeItem("skillforge-auth-token");
    safeLocalStorage.removeItem("skillforge-user");
  }, []);

  // Load token and user from local storage on mount
  React.useEffect(() => {
    console.log("[AUTH] Starting auth check");

    // Abort controller with 5s deadline — prevents hanging on a slow/dead backend
    const controller = new AbortController();
    const authCheckTimeout = setTimeout(() => controller.abort(), 5000);

    const initializeAuth = async () => {
      try {
        const storedToken = safeLocalStorage.getItem<string>("skillforge-auth-token");
        const storedUser = safeLocalStorage.getItem<SafeUser>("skillforge-user");

        if (storedToken && storedUser) {
          // Optimistically set the cached user immediately — app renders without waiting
          setToken(storedToken);
          setUser(storedUser);

          // Validate token with backend in the background (soft refresh)
          try {
            console.log("[AUTH] Request sent");
            const response = await apiClient.get<{ success: boolean; data: { user: SafeUser } }>(
              "/auth/me",
              {
                headers: { Authorization: `Bearer ${storedToken}` },
                signal: controller.signal,
              }
            );
            console.log("[AUTH] Request finished");

            if (response.data.success) {
              const freshUser = response.data.data.user;
              setUser(freshUser);
              safeLocalStorage.setItem("skillforge-user", freshUser);
            } else {
              // Session expired or invalid — log out silently
              handleLogout();
            }
          } catch (err: unknown) {
            // If the request was aborted (timeout) keep the cached user — don't log out
            const isAbort =
              (err instanceof Error && err.name === "AbortError") ||
              (err instanceof Error && err.message === "canceled");
            if (isAbort) {
              console.warn("[AUTH] Session validation timed out — using cached credentials");
            } else {
              console.error("[AUTH] Session validation failed:", err);
              handleLogout();
            }
          }
        }
      } catch (err) {
        console.error("[AuthProvider] Initialization failed:", err);
      } finally {
        // CRITICAL: always release the loading gate so the app renders
        clearTimeout(authCheckTimeout);
        setIsLoading(false);
        console.log("[AUTH] Loading false");
        console.log("[AUTH] Auth check complete");
      }
    };

    initializeAuth();

    return () => {
      controller.abort();
      clearTimeout(authCheckTimeout);
    };
  }, [handleLogout]);

  const handleLogin = (newToken: string, newUser: SafeUser) => {
    setToken(newToken);
    setUser(newUser);
    safeLocalStorage.setItem("skillforge-auth-token", newToken);
    safeLocalStorage.setItem("skillforge-user", newUser);
  };

  const handleUpdateUser = (updatedUser: SafeUser) => {
    setUser(updatedUser);
    safeLocalStorage.setItem("skillforge-user", updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        updateUser: handleUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
