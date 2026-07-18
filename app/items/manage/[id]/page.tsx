"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useRoadmapById } from "@/hooks/useRoadmaps";
import { ArrowLeft, Star, Clock, BookOpen, Award, CheckCircle, ShieldCheck } from "lucide-react";
import { PageWrapper, Section, Container, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { ErrorState, EmptyData } from "@/components/ui/States";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";
import type { Roadmap } from "@/services/roadmapService";

interface ExtendedRoadmap extends Roadmap {
  prerequisites?: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoadmapDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { id } = React.use(params);

  // Protection Check
  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to view the roadmap details.");
      router.push(`/login?redirect=/items/manage/${id}`);
    }
  }, [user, isAuthLoading, router, id]);

  const { data: roadmap, isLoading: isDataLoading, isError, refetch } = useRoadmapById(id);

  const getDifficultyColor = (level: "Beginner" | "Intermediate" | "Advanced") => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30";
      case "Intermediate":
        return "bg-indigo-50 dark:bg-indigo-950/20 text-primary-light dark:text-primary-light border-indigo-100 dark:border-indigo-900/30";
      case "Advanced":
        return "bg-amber-50 dark:bg-amber-950/20 text-amber-650 dark:text-amber-400 border-amber-100 dark:border-amber-900/30";
    }
  };

  if (isAuthLoading || (!user && !isAuthLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isDataLoading) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
        <Container className="py-12">
          {/* Skeleton Header */}
          <div className="animate-pulse flex flex-col gap-4 pb-6 border-b border-border-color dark:border-slate-800/30">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="flex gap-4">
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
          {/* Skeleton Body Layout */}
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="h-60 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="lg:col-span-4 border border-border-color dark:border-slate-800/40 bg-white dark:bg-[#0c1220] p-6 rounded-2xl flex flex-col gap-4">
              <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
          </div>
        </Container>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
        <Container className="py-12 flex justify-center">
          <ErrorState
            title="Roadmap Fetch Failure"
            message="We were unable to load the roadmap data from the database. Please check your connection or server status."
            onRetry={refetch}
            className="w-full max-w-lg"
          />
        </Container>
      </PageWrapper>
    );
  }

  if (!roadmap) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
        <Container className="py-12 flex justify-center">
          <EmptyData
            title="Roadmap Not Found"
            description="The requested roadmap details could not be found or does not exist in the system database."
            actionLabel="Return to Management"
            onAction={() => router.push("/items/manage")}
            className="w-full max-w-lg"
          />
        </Container>
      </PageWrapper>
    );
  }

  // Cast type to satisfy strict TS
  const fullRoadmap = roadmap as ExtendedRoadmap;

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
      
      {/* Detail Header navigation link */}
      <div className="bg-white dark:bg-[#0c1220]/30 py-3.5 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Link
            href="/items/manage"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Manage Items</span>
          </Link>
        </Container>
      </div>

      <Section className="py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content column (Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                
                {/* Cover Image banner */}
                <div className="h-64 sm:h-80 md:h-96 w-full relative bg-slate-100 dark:bg-slate-800 border-b border-border-color dark:border-slate-800/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fullRoadmap.coverImage}
                    alt={fullRoadmap.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-black text-primary dark:text-primary-light bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-md uppercase tracking-wider shadow-sm select-none">
                      {fullRoadmap.category}
                    </span>
                  </div>
                </div>

                {/* Primary Content body */}
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  
                  {/* Title & Metadata row */}
                  <div className="flex flex-col gap-3">
                    <h1 className="text-2xl md:text-3xl font-black text-dark-text tracking-tight leading-tight">
                      {fullRoadmap.title}
                    </h1>

                    <Flex align="center" gap={4} className="flex-wrap text-xxs font-bold text-secondary-text pb-4 border-b border-border-color dark:border-slate-800/20">
                      <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 select-none", getDifficultyColor(fullRoadmap.difficulty))}>
                        {fullRoadmap.difficulty}
                      </span>
                      
                      <Flex align="center" gap={1}>
                        <Clock className="h-4 w-4 text-secondary-text" />
                        <span>{fullRoadmap.duration}</span>
                      </Flex>

                      <Flex align="center" gap={1} className="text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-dark-text">{fullRoadmap.rating?.toFixed(1)}</span>
                        <span className="text-secondary-text">({fullRoadmap.totalRatings || 0} ratings)</span>
                      </Flex>
                    </Flex>
                  </div>

                  {/* Short Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-black text-dark-text uppercase tracking-wider">Summary</h3>
                    <p className="text-xs text-secondary-text leading-relaxed font-semibold italic">
                      &ldquo;{fullRoadmap.shortDescription}&rdquo;
                    </p>
                  </div>

                  {/* Full Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-black text-dark-text uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Curriculum Overview</span>
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      {fullRoadmap.fullDescription}
                    </p>
                  </div>

                  {/* Skills mastered */}
                  {fullRoadmap.skills && fullRoadmap.skills.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2">
                      <h3 className="text-xs font-black text-dark-text uppercase tracking-wider">Skills Acquired</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {fullRoadmap.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="text-[10px] font-bold text-dark-text bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-800/80 px-2.5 py-1 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning outcomes */}
                  {fullRoadmap.learningOutcomes && fullRoadmap.learningOutcomes.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 dark:border-slate-850/30">
                      <h3 className="text-xs font-black text-dark-text uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="h-4 w-4 text-emerald-500" />
                        <span>Learning Achievements</span>
                      </h3>
                      <div className="flex flex-col gap-2.5">
                        {fullRoadmap.learningOutcomes.map((outcome: string, idx: number) => (
                          <Flex key={idx} align="start" gap={2}>
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-secondary-text leading-normal">{outcome}</span>
                          </Flex>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prerequisites (if available) */}
                  {fullRoadmap.prerequisites && fullRoadmap.prerequisites.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 dark:border-slate-850/30">
                      <h3 className="text-xs font-black text-dark-text uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>Prerequisites</span>
                      </h3>
                      <div className="flex flex-col gap-2.5">
                        {fullRoadmap.prerequisites.map((prereq: string, idx: number) => (
                          <Flex key={idx} align="start" gap={2}>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="text-xs text-secondary-text leading-normal">{prereq}</span>
                          </Flex>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right Information card (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-xs font-black text-dark-text uppercase tracking-widest pb-3 border-b border-border-color dark:border-slate-800/20">
                  Course Metadata Info
                </h3>

                <div className="flex flex-col gap-4 select-none">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-secondary-text">Category</span>
                    <span className="font-bold text-dark-text">{fullRoadmap.category}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-secondary-text">Duration</span>
                    <span className="font-bold text-dark-text">{fullRoadmap.duration}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-secondary-text">Difficulty Level</span>
                    <span className="font-bold text-dark-text">{fullRoadmap.difficulty}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-secondary-text">Reviews Count</span>
                    <span className="font-bold text-dark-text">{fullRoadmap.totalRatings || 0} reviews</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-secondary-text">Rating Score</span>
                    <div className="flex items-center gap-1.5 font-bold text-dark-text">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{fullRoadmap.rating?.toFixed(1)} / 5.0</span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-850" />

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => router.push("/items/manage")}
                    variant="outline"
                    className="w-full text-xs font-bold"
                  >
                    Back to Management
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </Section>

    </PageWrapper>
  );
}
