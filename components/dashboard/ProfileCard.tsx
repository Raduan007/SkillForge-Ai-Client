"use client";

import * as React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { User, Mail, Shield, Calendar } from "lucide-react";

export function ProfileCard() {
  const { user } = useAuth();

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "July 2026";

  return (
    <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-5 select-none shadow-xxs">
      <div className="flex items-center gap-4 border-b border-border-color dark:border-slate-800/20 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20 shrink-0">
          {user?.name ? user.name.slice(0, 2).toUpperCase() : "SP"}
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-black text-dark-text leading-tight">{user?.name}</h3>
          <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider mt-0.5">Student Pathfinder</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-xxs font-bold text-secondary-text">
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 text-primary shrink-0" />
          <span className="text-dark-text truncate">{user?.email || "pathfinder@skillforge.ai"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Shield className="h-4 w-4 text-primary shrink-0" />
          <span className="text-dark-text">Account Secured</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <span>Member since {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
