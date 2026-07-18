"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { PageWrapper, Container } from "./Layouts";
import { toast } from "react-hot-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect if unauthenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please sign in to access your dashboard.");
      router.push(`/login?redirect=${pathname || "/dashboard"}`);
    }
  }, [user, isLoading, router, pathname]);

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
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
      <Container className="py-6 md:py-10">
        <main className="w-full flex flex-col gap-6">
          {children}
        </main>
      </Container>
    </PageWrapper>
  );
}
