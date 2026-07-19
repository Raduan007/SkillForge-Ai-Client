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

      {/* Enrolled Roadmaps Progress List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-dark-text uppercase tracking-wider select-none">
          Active Path Details
        </h3>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="h-28 rounded-2xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0c1220] animate-pulse" />
            ))}
          </div>
        ) : enrollments.length === 0 ? (
          <div className="bg-white dark:bg-[#0c1220] border border-dashed border-border-color dark:border-slate-800/40 rounded-2xl p-8 text-center text-xxs font-bold text-secondary-text leading-relaxed">
            No active roadmaps to track. Browse our selection and enroll to get started.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {enrollments.map((enroll) => {
              const roadmap = enroll.roadmapId;
              if (!roadmap) return null;

              const totalNodes = roadmap.skills?.length || 0;
              const completedCount = Math.round((enroll.progress / 100) * totalNodes);
              const remainingCount = totalNodes - completedCount;
              const isCompleted = enroll.status === "completed";

              const lastActiveDate = new Date(enroll.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={enroll._id}
                  className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 shadow-xxs"
                >
                  <div className="flex gap-4 items-center min-w-0">
                    {roadmap.coverImage && (
                      <div className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 border border-border-color/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={roadmap.coverImage}
                          alt={roadmap.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-wider">
                        {roadmap.category}
                      </span>
                      <h4 className="text-sm font-black text-dark-text truncate mt-0.5 leading-snug">
                        {roadmap.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 select-none text-[10px] font-bold text-secondary-text">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 border text-[9px] uppercase tracking-wider ${
                          isCompleted
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
                            : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30"
                        }`}>
                          {enroll.status}
                        </span>
                        <span>•</span>
                        <span>Last updated {lastActiveDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-1.5 w-full md:w-48 shrink-0">
                    <div className="flex justify-between items-center text-[10px] font-bold text-secondary-text w-full">
                      <span>{enroll.progress}% Progress</span>
                      <span className="text-dark-text">{completedCount}/{totalNodes} skills</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${enroll.progress}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-secondary-text font-bold leading-none mt-0.5 self-start md:self-auto">
                      {remainingCount} skills remaining
                    </span>
                  </div>

                  <div className="w-full md:w-auto shrink-0 select-none">
                    <Button
                      onClick={() => router.push(`/explore/${roadmap.slug}`)}
                      variant="outline"
                      size="small"
                      className="w-full text-xs font-bold border border-border-color text-dark-text hover:bg-primary hover:text-white hover:border-transparent transition-all px-4 py-2.5"
                    >
                      View Pathway Checklist
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
