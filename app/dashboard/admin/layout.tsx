"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== "admin") {
    // Show a minimal loading state or nothing while redirecting
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
