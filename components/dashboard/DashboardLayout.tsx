"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { PageWrapper } from "../layout/Layouts";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { toast } from "react-hot-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Redirect if unauthenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please sign in to access your dashboard.");
      router.push(`/login?redirect=${pathname || "/dashboard"}`);
    }
  }, [user, isLoading, router, pathname]);

  // Handle closing mobile sidebar on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isLoading || !user) {
    return (
      <PageWrapper className="min-h-screen bg-slate-50 dark:bg-[#090d16] flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-secondary-text">Verifying session...</span>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-[#090d16] min-h-screen flex flex-row">
      {/* Mobile Sidebar backdrop overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-15 bg-slate-900/50 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <DashboardSidebar 
        isOpen={isSidebarOpen || isMobileOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Content wrapper panel */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

        {/* Scrollable contents card */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
