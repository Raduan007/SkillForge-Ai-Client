"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMyEnrollments } from "@/hooks/useEnrollments";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Trophy, 
  Target, 
  Award, 
  Flame, 
  TrendingUp, 
  Star 
} from "lucide-react";

export default function DashboardProgressPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Fetch real enrollments
  const { 
    data: enrollments = [], 
    isLoading, 
    isError, 
    refetch 
  } = useMyEnrollments(!!user);

  // Compute metrics
  const totalEnrolled = enrollments.length;
  const completedRoadmaps = enrollments.filter((e) => e.status === "completed").length;
  const activeRoadmaps = enrollments.filter((e) => e.status === "active").length;
  
  // Calculate average progress
  const avgProgress = totalEnrolled
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrolled)
    : 0;

  // Mocked achievements matching path milestones
  const achievements = [
    {
      title: "First Step Forward",
      desc: "Enrolled in your first career learning pathway",
      unlocked: totalEnrolled > 0,
      icon: Target,
    },
    {
      title: "Quarter Master",
      desc: "Reached 25% progress in any curriculum track",
      unlocked: enrollments.some((e) => e.progress >= 25),
      icon: TrendingUp,
    },
    {
      title: "Halfway Hero",
      desc: "Reached 50% progress in any curriculum track",
      unlocked: enrollments.some((e) => e.progress >= 50),
      icon: Star,
    },
    {
      title: "Certified Pathfinder",
      desc: "Completed 100% of any enrolled roadmap",
      unlocked: completedRoadmaps > 0,
      icon: Award,
    },
  ];

  if (isError) {
    return (
      <DashboardLayout>
        <div className="py-16 flex flex-col items-center gap-4 text-center max-w-md mx-auto">
          <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center font-bold text-xl">!</div>
          <h3 className="text-sm font-black text-dark-text uppercase">Connection Error</h3>
          <p className="text-xxs text-secondary-text leading-relaxed">
            We encountered an issue retrieving your learning metrics from the server.
          </p>
          <Button
            variant="primary"
            size="medium"
            onClick={() => refetch()}
            className="text-xs font-bold px-6 py-2"
          >
            Retry Load
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col gap-1.5 pb-4 border-b border-border-color dark:border-slate-800/40 select-none">
        <h2 className="text-xl font-black text-dark-text tracking-tight flex items-center gap-2">
          <Trophy className="h-5.5 w-5.5 text-primary" />
          <span>My Learning Progress</span>
        </h2>
        <p className="text-xxs text-secondary-text leading-relaxed">
          Monitor your cumulative study stats, check progress milestones, and track unlocked certificates.
        </p>
      </div>

      {/* Progress Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Average bar */}
        <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4 select-none shadow-xxs">
          <span className="text-xxs font-bold text-secondary-text tracking-wide uppercase">
            Average Progress Rate
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-dark-text tracking-tight">{avgProgress}%</span>
            <span className="text-xxs text-secondary-text">across all paths</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${avgProgress}%` }}
            />
          </div>
        </div>

        {/* Enrollments overview count */}
        <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between select-none shadow-xxs">
          <div className="flex flex-col gap-1">
            <span className="text-xxs font-bold text-secondary-text tracking-wide uppercase">
              Enrollments Ratio
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-dark-text tracking-tight">
                {completedRoadmaps} / {totalEnrolled}
              </span>
              <span className="text-xxs text-secondary-text">paths completed</span>
            </div>
          </div>
          <div className="text-[10px] text-secondary-text font-bold mt-4">
            {activeRoadmaps} active paths in progress
          </div>
        </div>

        {/* Streak card */}
        <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between select-none shadow-xxs">
          <div className="flex flex-col gap-1">
            <span className="text-xxs font-bold text-secondary-text tracking-wide uppercase">
              Consistency Streak
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Flame className="h-7 w-7 text-orange-500 fill-orange-500/10" />
              <span className="text-2xl font-black text-dark-text tracking-tight">3 Days</span>
            </div>
          </div>
          <div className="text-[10px] text-secondary-text font-bold mt-4">
            Keep studying daily to maintain your momentum!
          </div>
        </div>
      </div>

      {/* Achievements Milestones list */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-dark-text uppercase tracking-wider select-none">
          Milestone Achievements
        </h3>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="h-20 rounded-2xl border border-slate-200/60 dark:border-slate-855 bg-white dark:bg-[#0c1220] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl p-5 flex gap-4 items-center select-none transition-all ${
                    ach.unlocked
                      ? "bg-white dark:bg-[#0c1220] border-border-color dark:border-slate-800/40 opacity-100 shadow-xxs"
                      : "bg-slate-50/40 dark:bg-slate-900/10 border-slate-200/50 dark:border-slate-850/20 opacity-50"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? "bg-indigo-50 dark:bg-indigo-950/20 text-primary border-indigo-100 dark:border-indigo-900/30"
                        : "bg-slate-100 text-secondary-text border-slate-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-dark-text leading-tight">
                      {ach.title}
                    </span>
                    <span className="text-xxs text-secondary-text leading-normal">
                      {ach.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
