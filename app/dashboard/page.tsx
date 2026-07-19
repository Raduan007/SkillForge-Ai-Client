"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMyEnrollments } from "@/hooks/useEnrollments";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStreak } from "@/hooks/useStreak";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  Map, 
  Compass, 
  Zap,
  Flame 
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Fetch real MongoDB enrollments using custom TanStack Query hook
  const { 
    data: enrollments = [], 
    isLoading, 
    isError, 
    refetch 
  } = useMyEnrollments(!!user);

  // Fetch live learning streak from backend
  const { data: streakData, isLoading: isStreakLoading } = useStreak(!!user);

  // Compute stat metrics dynamically
  const totalEnrollments = enrollments.length;
  const activeRoadmaps = enrollments.filter((e) => e.status === "active").length;
  const completedRoadmaps = enrollments.filter((e) => e.status === "completed").length;
  
  // Learning streak metric
  const learningStreak = streakData?.currentStreak || 0;

  const activeEnrollments = enrollments.filter((e) => e.status === "active").slice(0, 2);

  if (isError) {
    return (
      <DashboardLayout>
        <div className="py-16 flex flex-col items-center gap-4 text-center max-w-md mx-auto">
          <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center font-bold text-xl">!</div>
          <h3 className="text-sm font-black text-dark-text uppercase">Connection Error</h3>
          <p className="text-xxs text-secondary-text leading-relaxed">
            We encountered an issue retrieving your study enrollment records from the server.
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
      {/* 1. Welcome Back Section Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 rounded-2xl p-6 md:p-8 select-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-black text-dark-text tracking-tight flex items-center gap-2">
            <span>Welcome back, {user?.name || "Pathfinder"}!</span>
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
          className="text-xs font-bold whitespace-nowrap gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Find Roadmaps</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 2. Stats Grid Cards */}
      {isLoading || isStreakLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="h-24 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#0c1220] animate-pulse" />
          ))}
        </div>
      ) : (
        <DashboardStats
          totalEnrollments={totalEnrollments}
          activeRoadmaps={activeRoadmaps}
          completedRoadmaps={completedRoadmaps}
          learningStreak={learningStreak}
        />
      )}

      {/* 3. Main Dashboard split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Recent Activity Feed */}
          <RecentActivity enrollments={enrollments} />

          {/* Active study pathways progress */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-dark-text uppercase tracking-wider select-none">
              My Active Pathways
            </h3>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2].map((s) => (
                  <div key={s} className="h-40 rounded-2xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0c1220] animate-pulse" />
                ))}
              </div>
            ) : activeEnrollments.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeEnrollments.map((enroll) => {
                  const roadmap = enroll.roadmapId;
                  if (!roadmap) return null;
                  return (
                    <div
                      key={enroll._id}
                      className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-5 shadow-xxs hover:shadow-md transition-shadow flex flex-col gap-4"
                    >
                      <div className="flex gap-3">
                        {roadmap.coverImage && (
                          <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 border border-border-color/30">
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

                      {/* Course progress bar */}
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
                          className="w-full text-[10px] font-bold border border-border-color text-dark-text hover:bg-primary hover:text-white hover:border-transparent transition-colors py-2"
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
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Card */}
          <ProfileCard />

          {/* Daily Learning Streak Widget */}
          <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4 select-none shadow-xxs">
            <div className="flex justify-between items-center border-b border-border-color dark:border-slate-800/20 pb-3">
              <h3 className="text-sm font-black text-dark-text uppercase tracking-wider flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-orange-500 fill-orange-500/10 animate-pulse" />
                <span>Streak Tracker</span>
              </h3>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-200/50 dark:border-orange-900/30">
                {learningStreak} Days Active
              </span>
            </div>

            {isStreakLoading ? (
              <div className="h-16 bg-slate-50 dark:bg-slate-900/10 rounded-xl animate-pulse" />
            ) : (
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xxs font-bold text-secondary-text">
                  <span>Current Streak:</span>
                  <span className="text-dark-text">{learningStreak} days</span>
                </div>
                <div className="flex justify-between items-center text-xxs font-bold text-secondary-text">
                  <span>Best Streak Record:</span>
                  <span className="text-dark-text">{streakData?.bestStreak || 0} days</span>
                </div>
                <div className="flex justify-between items-center text-xxs font-bold text-secondary-text">
                  <span>Last Active Day:</span>
                  <span className="text-dark-text">
                    {streakData?.lastActiveDate
                      ? new Date(streakData.lastActiveDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Never"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4 select-none shadow-xxs">
            <h3 className="text-sm font-black text-dark-text uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push("/explore")}
                variant="outline"
                size="medium"
                className="w-full text-xs font-bold justify-start gap-2.5 border-border-color text-dark-text py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                <Compass className="h-4.5 w-4.5 text-primary" />
                <span>Browse New Roadmaps</span>
              </Button>
              <Button
                onClick={() => router.push("/ai/roadmap-generator")}
                variant="outline"
                size="medium"
                className="w-full text-xs font-bold justify-start gap-2.5 border-border-color text-dark-text py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                <Zap className="h-4.5 w-4.5 text-amber-500 fill-amber-500/10" />
                <span>Generate Custom AI Path</span>
              </Button>
              <Button
                onClick={() => router.push("/ai/chat")}
                variant="outline"
                size="medium"
                className="w-full text-xs font-bold justify-start gap-2.5 border-border-color text-dark-text py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                <MessageSquare className="h-4.5 w-4.5 text-emerald-500" />
                <span>Ask Career Chatbot</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
