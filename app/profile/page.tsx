/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth, SafeUser } from "@/providers/AuthProvider";
import { apiClient } from "@/services/apiClient";
import { PageWrapper, Container, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, updateUser } = useAuth();

  const [name, setName] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Initialize values when user is loaded
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Protect route
  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to access profile settings.");
      router.push("/login?redirect=/profile");
    }
  }, [user, isAuthLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await apiClient.put<{ success: boolean; data: SafeUser }>("/auth/profile", {
        name,
      });

      // Update auth context state & local storage
      updateUser(response.data.data);
      toast.success("Profile updated successfully!", {
        icon: "🎉",
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      let msg = "Failed to update profile settings.";
      if (err && typeof err === "object") {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          msg = axiosError.response.data.error;
        }
      }
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isAuthLoading || !user) {
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
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen select-none">
      
      {/* 1. Header navigation */}
      <div className="bg-white dark:bg-[#090d16] py-4 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Flex align="center" justify="between" className="flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-sm font-black text-dark-text uppercase tracking-wider">
              Profile Settings
            </h1>
          </Flex>
        </Container>
      </div>

      {/* 2. Main content container */}
      <Container className="py-10 max-w-2xl">
        <div className="bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
          


          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name-input" className="text-xs font-black text-dark-text flex items-center gap-1">
                <User className="h-4 w-4 text-primary" />
                <span>Display Name</span>
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-primary/60 transition-all font-semibold"
                required
              />
            </div>



            {/* Actions button */}
            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-6 mt-4">
              <Button
                onClick={() => router.push("/dashboard")}
                type="button"
                variant="outline"
                size="medium"
                className="text-xs font-bold border border-slate-200 dark:border-slate-800 text-dark-text hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isUpdating}
                className="text-xs font-black shadow-md shadow-primary/10"
              >
                {isUpdating ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>

        </div>
      </Container>
    </PageWrapper>
  );
}
