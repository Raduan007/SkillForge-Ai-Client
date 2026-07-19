"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "enrollment" | "progress" | "completion";
  message: string;
  timestamp: string;
}

interface RecentActivityProps {
  enrollments: any[];
}

export function RecentActivity({ enrollments }: RecentActivityProps) {
  const getActivities = (): ActivityItem[] => {
    const list: ActivityItem[] = [];

    enrollments.forEach((enroll) => {
      const title = enroll.roadmapId?.title || "Career Pathway";
      const date = new Date(enroll.enrolledAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

      // Add enrollment activity
      list.push({
        id: `${enroll._id}-enroll`,
        type: "enrollment",
        message: `Enrolled in "${title}" pathway`,
        timestamp: date,
      });

      // Add progress activity if they have progress
      if (enroll.progress > 0) {
        list.push({
          id: `${enroll._id}-progress`,
          type: "progress",
          message: `Reached ${enroll.progress}% progress in "${title}"`,
          timestamp: "Recent",
        });
      }

      // Add completion activity
      if (enroll.status === "completed") {
        list.push({
          id: `${enroll._id}-complete`,
          type: "completion",
          message: `Completed all modules in "${title}"!`,
          timestamp: date,
        });
      }
    });

    // Sort by type (completions, then progress, then enrollments)
    return list.slice(0, 4);
  };

  const activities = getActivities();

  return (
    <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4 select-none shadow-xxs">
      <h3 className="text-sm font-black text-dark-text uppercase tracking-wider">
        Recent Activity Feed
      </h3>

      {activities.length === 0 ? (
        <div className="py-8 text-center text-xxs font-bold text-secondary-text leading-relaxed">
          No recent activities found. Start enrolling in roadmap pathways to populate your feed!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((act) => {
            const isEnroll = act.type === "enrollment";
            const isComplete = act.type === "completion";

            return (
              <div key={act.id} className="flex gap-3 items-start text-xxs font-bold">
                <div
                  className={cn(
                    "h-7 w-7 rounded-lg border flex items-center justify-center shrink-0",
                    isComplete
                      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
                      : isEnroll
                      ? "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30"
                      : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : isEnroll ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <span className="text-dark-text leading-normal">{act.message}</span>
                  <span className="text-[10px] text-secondary-text leading-none">{act.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
