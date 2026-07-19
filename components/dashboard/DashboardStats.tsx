"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Flame 
} from "lucide-react";

interface DashboardStatsProps {
  totalEnrollments: number;
  activeRoadmaps: number;
  completedRoadmaps: number;
  learningStreak: number;
}

export function DashboardStats({
  totalEnrollments,
  activeRoadmaps,
  completedRoadmaps,
  learningStreak,
}: DashboardStatsProps) {
  const statsConfig = [
    {
      label: "Total Enrollments",
      value: totalEnrollments,
      icon: BookOpen,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30",
    },
    {
      label: "Active Roadmaps",
      value: activeRoadmaps,
      icon: Clock,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
    },
    {
      label: "Completed Roadmaps",
      value: completedRoadmaps,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30",
    },
    {
      label: "Learning Streak",
      value: `${learningStreak} days`,
      icon: Flame,
      color: "text-orange-600 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400 border-orange-100 dark:border-orange-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {statsConfig.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 p-5 rounded-2xl shadow-xxs flex flex-col gap-2.5"
          >
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center border shrink-0", stat.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xxs font-bold text-secondary-text tracking-wide uppercase">
                {stat.label}
              </span>
              <span className="text-lg font-black text-dark-text tracking-tight mt-0.5">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
