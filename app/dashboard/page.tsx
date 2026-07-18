"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMyEnrollments } from "@/hooks/useEnrollments";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  ArrowRight
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Fetch real MongoDB enrollments
  const { data: enrollments = [], isLoading, isError } = useMyEnrollments(!!user);

  // Compute stats
  const totalEnrolled = enrollments.length;
  const completedPaths = enrollments.filter((e) => e.status === "completed").length;
  const activePaths = enrollments.filter((e) => e.status === "active").length;
  const avgProgress = totalEnrolled
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrolled)
    : 0;

  // Active pathways
  const activeEnrollments = enrollments.filter((e) => e.status === "active").slice(0, 2);

  return (
    <DashboardLayout>
      {/* 1. Welcome Banner Card */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 rounded-2xl p-6 md:p-8 select-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-black text-dark-text tracking-tight flex items-center gap-2">
            <span>Welcome back, {user?.name}!</span>
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
          </h2>
          <p className="text-xs text-secondary-text leading-relaxed max-w-xl">
            Accelerate your career development velocity. Track your enrolled learning metrics, practice coding projects, and refine skill accomplishments.
          </p>
        </div>
        <Button
          onClick={() => router.push("/explore")}
          variant="primary"
          size="medium"
          className="text-xs font-bold whitespace-nowrap gap-1 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Find Roadmaps</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* 2. Stats Grid Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Enrolled Paths",
            value: totalEnrolled,
            icon: BookOpen,
            color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400"
          },
          {
            label: "Active Study",
            value: activePaths,
            icon: Clock,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400"
          },
          {
            label: "Completed",
            value: completedPaths,
            icon: CheckCircle2,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400"
          },
          {
            label: "Avg Progress",
            value: `${avgProgress}%`,
            icon: Trophy,
            color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400"
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-xxs flex flex-col gap-2 select-none"
            >
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", stat.color)}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xxs font-bold text-secondary-text">{stat.label}</span>
                <span className="text-xl font-black text-dark-text mt-0.5">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Learning Pathways Segment */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-dark-text uppercase tracking-wider select-none">
          Active Pathways
        </h3>

        {isLoading ? (
          // Loaders
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((s) => (
              <div key={s} className="h-48 rounded-2xl border border-slate-250/60 dark:border-slate-800 bg-white dark:bg-[#0c1220] animate-pulse" />
            ))}
          </div>
        ) : isError || enrollments.length === 0 ? (
          // Empty State
          <Card
            isEmpty={true}
            emptyIcon={BookOpen}
            emptyTitle="No Active Enrollments"
            emptyDescription="You haven't enrolled in any learning pathways yet. Check out the explorer to select a pathway and start studying."
            actionLabel="Browse Roadmaps"
            onAction={() => router.push("/explore")}
            className="py-12 border-dashed bg-white dark:bg-[#0c1220]"
          />
        ) : (
          // Real Enrolled Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeEnrollments.map((enroll) => {
              const roadmap = enroll.roadmapId;
              if (!roadmap) return null;
              return (
                <div
                  key={enroll._id}
                  className="bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xxs hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  <div className="flex gap-3">
                    {roadmap.coverImage && (
                      <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 border border-slate-200/30">
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
                      <h4 className="text-xs font-black text-dark-text truncate mt-0.5 leading-snug">
                        {roadmap.title}
                      </h4>
                    </div>
                  </div>

                  {/* Progress tracker */}
                  <div className="flex flex-col gap-1.5 mt-1 select-none">
                    <div className="flex justify-between items-center text-[10px] font-bold text-secondary-text">
                      <span>Course Progress</span>
                      <span className="text-dark-text">{enroll.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${enroll.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-2 shrink-0">
                    <Button
                      onClick={() => router.push(`/explore/${roadmap.slug}`)}
                      variant="outline"
                      size="small"
                      className="w-full text-[10px] font-bold border border-slate-200 hover:bg-primary hover:text-white hover:border-transparent transition-colors py-2"
                    >
                      Continue Learning
                    </Button>
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
