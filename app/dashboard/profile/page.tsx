"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth, SafeUser } from "@/providers/AuthProvider";
import { apiClient } from "@/services/apiClient";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { User, Mail } from "lucide-react";

export default function DashboardProfilePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, updateUser } = useAuth();

  const [name, setName] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

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

  return (
    <DashboardLayout>
      <div className="max-w-2xl bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 md:p-8 select-none flex flex-col gap-6 shadow-xxs">
        <div className="flex flex-col gap-1 border-b border-border-color dark:border-slate-800/20 pb-4">
          <h2 className="text-base font-black text-dark-text uppercase tracking-wider">
            Edit Profile Details
          </h2>
          <p className="text-xxs text-secondary-text leading-relaxed">
            Update your public pathfinder name. Email change actions require administrative coordination.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email input (Disabled) */}
          <div className="flex flex-col gap-2">
            <label className="text-xxs font-bold text-secondary-text uppercase tracking-wide flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200/60 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/20 text-secondary-text cursor-not-allowed outline-hidden"
            />
          </div>

          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label className="text-xxs font-bold text-secondary-text uppercase tracking-wide flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-250 dark:border-slate-800/80 bg-white dark:bg-[#0c1220] text-dark-text focus:border-primary dark:focus:border-primary-light focus:ring-1 focus:ring-primary dark:focus:ring-primary-light outline-hidden transition-all"
              placeholder="e.g. Raduan Hossen"
            />
          </div>

          {/* Save button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isUpdating}
              className="text-xs font-bold px-8 shadow-md"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
