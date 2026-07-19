"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMyEnrollments } from "@/hooks/useEnrollments";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/layout/Layouts";
import { BookOpen, Calendar, Award } from "lucide-react";
import { cn } from "@/utils/cn";

export default function MyRoadmapsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const { data: enrollments = [], isLoading, isError } = useMyEnrollments(!!user);

  return (
    <DashboardLayout>
      {/* Page Header block */}
      <div className="flex flex-col gap-1.5 pb-4 border-b border-slate-200/60 dark:border-slate-800/40 select-none">
        <h2 className="text-xl font-black text-dark-text tracking-tight flex items-center gap-2">
          <BookOpen className="h-5.5 w-5.5 text-primary" />
          <span>My Enrolled Roadmaps</span>
        </h2>
        <p className="text-xxs text-secondary-text leading-relaxed">
          Manage your active learning curves. Review study progress, access curriculum guides, and track milestone accomplishments.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="h-72 rounded-2xl border border-slate-250/60 dark:border-slate-800 bg-white dark:bg-[#0c1220] animate-pulse" />
          ))}
        </div>
      ) : isError || enrollments.length === 0 ? (
        <Card
          isEmpty={true}
          emptyIcon={BookOpen}
          emptyTitle="No Enrolled Roadmaps"
          emptyDescription="You are not enrolled in any roadmap pathway yet. Browse our selection and enroll today!"
          actionLabel="Browse Roadmaps"
          onAction={() => router.push("/explore")}
          className="py-16 border-dashed bg-white dark:bg-[#0c1220]"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enroll) => {
            const roadmap = enroll.roadmapId;
            if (!roadmap) return null;

            const enrolledDate = new Date(enroll.enrolledAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric"
            });

            const isActive = enroll.status === "active";

            return (
              <div
                key={enroll._id}
                className="group relative flex flex-col h-full w-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0c1220] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Image Cover */}
                {roadmap.coverImage && (
                  <div className="relative h-36 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-850">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={roadmap.coverImage}
                      alt={roadmap.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-3 right-3 select-none">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border",
                          isActive
                            ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30"
                            : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
                        )}
                      >
                        {enroll.status}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5 gap-3.5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary dark:text-primary-light bg-indigo-50 dark:bg-indigo-950/25 px-2 py-0.5 rounded-md uppercase tracking-wider self-start select-none">
                      {roadmap.category}
                    </span>
                    <h4 className="text-xs font-black text-dark-text leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors mt-2 select-text">
                      {roadmap.title}
                    </h4>
                  </div>

                  <Flex align="center" gap={3} className="text-[9px] text-secondary-text font-bold select-none">
                    <Flex align="center" gap={1}>
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Joined {enrolledDate}</span>
                    </Flex>
                    <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <span>{roadmap.difficulty}</span>
                  </Flex>

                  <div className="flex flex-col gap-1.5 mt-1 select-none">
                    <div className="flex justify-between items-center text-[9px] font-bold text-secondary-text">
                      <span>Curriculum progress</span>
                      <span className="text-dark-text">{enroll.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${enroll.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 shrink-0">
                    <Button
                      onClick={() => router.push(`/explore/${roadmap.slug}`)}
                      variant="primary"
                      size="medium"
                      className="w-full text-xs font-bold shadow-xs py-2.5 flex items-center justify-center gap-1.5"
                    >
                      <Award className="h-4 w-4" />
                      <span>Continue Learning</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
