"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthProvider";

// ==========================================
// 1. THEME PROVIDER & CONTEXT
// ==========================================
export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = React.useState<Theme>("light");

  const updateDocumentClass = (activeTheme: Theme) => {
    const root = window.document.documentElement;
    if (activeTheme === "dark") {
      root.classList.add("dark");
      root.style.setProperty("--background", "#090d16");
      root.style.setProperty("--foreground", "#f8fafc");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--background", "#F8FAFC");
      root.style.setProperty("--foreground", "#0F172A");
    }
  };

  // Sync theme setting on mount from LocalStorage or system setting
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("skillforge-theme") as Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(savedTheme);
      updateDocumentClass(savedTheme);
    } else {
      // System default fallback
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(systemPreference);
      updateDocumentClass(systemPreference);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("skillforge-theme", newTheme);
    updateDocumentClass(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ==========================================
// 2. QUERY CLIENT PROVIDER
// ==========================================
// We create a client-side single instance of QueryClient
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server-side: always create a new query client
    return makeQueryClient();
  } else {
    // Browser-side: create a new query client if it doesn't exist
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// ==========================================
// 3. COMBINED APP PROVIDERS WRAPPER
// ==========================================
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Toast notifications configuration matching theme color palettes */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FFFFFF",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              fontSize: "0.875rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#F59E0B",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
