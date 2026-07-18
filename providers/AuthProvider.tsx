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
    const initializeAuth = async () => {
      try {
        const storedToken = safeLocalStorage.getItem<string>("skillforge-auth-token");
        const storedUser = safeLocalStorage.getItem<SafeUser>("skillforge-user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);

          // Validate token and get fresh user info from backend
          try {
            // Configure temporary header in case interceptor hasn't run yet
            const response = await apiClient.get<{ success: boolean; data: { user: SafeUser } }>(
              "/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );

            if (response.data.success) {
              const freshUser = response.data.data.user;
              setUser(freshUser);
              safeLocalStorage.setItem("skillforge-user", freshUser);
            } else {
              // Session expired or invalid
              handleLogout();
            }
          } catch (err) {
            console.error("[AuthProvider] Session validation failed:", err);
            handleLogout();
          }
        }
      } catch (err) {
        console.error("[AuthProvider] Initialization failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
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
