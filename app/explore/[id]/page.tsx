"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Award, BookOpen, Share2, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { PageWrapper, Section, Container, Flex, Grid } from "@/components/layout/Layouts";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";
import { useRoadmapBySlug, useRoadmaps } from "@/hooks/useRoadmaps";
import { useAuth } from "@/providers/AuthProvider";
import { useMyEnrollments, useEnrollRoadmap } from "@/hooks/useEnrollments";
import { useProgress, useUpdateProgress } from "@/hooks/useProgress";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoadmapDetailsPage({ params }: PageProps) {
  // Unwrap Next.js 16 dynamic route parameters
  const { id } = React.use(params);

  // TanStack Query hooks integration
  const { data: roadmap, isLoading: isLoadingDetail, isError: isDetailError, error: detailError, refetch } = useRoadmapBySlug(id);
  const { data: relatedData, isLoading: isRelatedLoading } = useRoadmaps({ limit: 5 });

  // Map related roadmaps dynamically (filtering out active details view slug)
  const relatedRoadmaps = (relatedData?.roadmaps || [])
    .filter((rm) => rm.slug !== roadmap?.slug)
    .slice(0, 4);

  const { user } = useAuth();
  const router = useRouter();
  const { data: enrollments = [] } = useMyEnrollments(!!user);
  const enrollMutation = useEnrollRoadmap();

  const isEnrolled = roadmap
    ? enrollments.some((e) => e.roadmapId?._id === roadmap._id || (typeof e.roadmapId === "string" && e.roadmapId === roadmap._id))
    : false;

  // Progress tracking queries & mutations
  const { data: progressData } = useProgress(roadmap?._id || "", isEnrolled);
  const updateProgressMutation = useUpdateProgress(roadmap?._id || "");

  const completedNodes = progressData?.completedNodes || [];
  const progressPercentage = progressData?.progressPercentage || 0;

  const handleEnroll = () => {
    if (!roadmap) return;
    if (!user) {
      toast.error("Please sign in to enroll in a roadmap.");
      router.push(`/login?redirect=/explore/${roadmap.slug}`);
      return;
    }

    if (isEnrolled) {
      router.push("/roadmaps");
      return;
    }

    enrollMutation.mutate(roadmap._id, {
      onSuccess: () => {
        toast.success(`Successfully enrolled in "${roadmap.title}"!`, {
          icon: "🎉",
          id: "enroll-toast",
        });
      },
      onError: (err: unknown) => {
        let msg = "Enrollment failed. Please try again.";
        if (err && typeof err === "object") {
          const axiosError = err as { response?: { data?: { error?: string } } };
          if (axiosError.response?.data?.error) {
            msg = axiosError.response.data.error;
          }
        }
        toast.error(msg);
      }
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Share link copied to clipboard!", {
        id: "share-toast",
      });
    }
  };

  // Difficulty styling configurations
  const getDifficultyColor = (level: "Beginner" | "Intermediate" | "Advanced") => {
    switch (level) {
      case "Beginner":
        return "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30";
      case "Intermediate":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30";
      case "Advanced":
        return "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30";
    }
  };

  const is404 = detailError && typeof detailError === "object" && 
                "response" in detailError && 
                (detailError as any).response?.status === 404;

  if (isLoadingDetail) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] select-none min-h-screen animate-pulse">
        {/* Header Navigation Bar Skeleton */}
        <div className="bg-white dark:bg-[#090d16] py-3.5 border-b border-border-color dark:border-slate-800/30">
          <Container>
            <Flex align="center" justify="between" className="flex-wrap gap-4">
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
            </Flex>
          </Container>
        </div>

        <Section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column Skeleton */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                  <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <Flex gap={4} className="pb-4 border-b border-border-color dark:border-slate-800/30">
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  </Flex>
                  <div className="flex flex-col gap-3">
                    <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
                  <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-5 w-full bg-slate-100 dark:bg-slate-900 rounded" />
                    ))}
                  </div>
                  <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  if (is404) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] flex items-center justify-center min-h-screen select-none">
        <Flex direction="col" align="center" gap={4} className="text-center max-w-sm px-6">
          <div className="h-14 w-14 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center font-bold text-2xl">404</div>
          <h2 className="text-sm font-black text-dark-text uppercase tracking-wider">Roadmap Not Found</h2>
          <p className="text-xxs text-secondary-text leading-relaxed">
            The roadmap pathway with slug <span className="font-extrabold text-dark-text">&quot;{id}&quot;</span> does not exist or has been removed.
          </p>
          <Link href="/explore">
            <Button variant="primary" size="medium" className="text-xs font-bold px-6">
              Return to Explorer
            </Button>
          </Link>
        </Flex>
      </PageWrapper>
    );
  }

  if (isDetailError || !roadmap) {
    return (
      <PageWrapper className="bg-slate-50 dark:bg-[#090d16] flex items-center justify-center min-h-screen select-none">
        <Flex direction="col" align="center" gap={4} className="text-center max-w-sm px-6">
          <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center font-bold text-2xl">!</div>
          <h2 className="text-sm font-black text-dark-text uppercase tracking-wider">Connection Failure</h2>
          <p className="text-xxs text-secondary-text leading-relaxed">
            We couldn&apos;t connect to the backend server to load this pathway. Verify your internet connection or server status.
          </p>
          <Flex gap={3}>
            <Button
              variant="primary"
               size="medium"
              onClick={() => refetch()}
              className="text-xs font-bold px-6"
            >
              Retry Connection
            </Button>
            <Link href="/explore">
              <Button
                variant="outline"
                size="medium"
                className="text-xs font-bold px-6 border border-border-color dark:border-slate-800 text-dark-text"
              >
                Go Back
              </Button>
            </Link>
          </Flex>
        </Flex>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] select-none min-h-screen">
      
      {/* 1. Details Header Navigation Bar */}
      <div className="bg-white dark:bg-[#090d16] py-3.5 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Flex align="center" justify="between" className="flex-wrap gap-4">
            <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Explorer</span>
            </Link>

            <Breadcrumb
              items={[
                { label: "Explore", href: "/explore" },
                { label: roadmap.category, href: `/explore?category=${roadmap.category}` },
                { label: roadmap.title }
              ]}
            />
          </Flex>
        </Container>
      </div>

      <Section className="py-8 md:py-12">
        <Container>
          
          {/* ================= Main Layout Details Grid ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content column (Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Main Content card */}
              <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
                
                {/* Path Category badge */}
                <Flex align="center" gap={2}>
                  <span className="text-[10px] font-bold text-primary dark:text-primary-light bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {roadmap.category}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-bold text-secondary-text">Self-Paced Track</span>
                </Flex>

                {/* Main Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-dark-text tracking-tight leading-tight">
                  {roadmap.title}
                </h1>

                {/* Metadata badges row */}
                <Flex align="center" gap={4} className="flex-wrap text-xxs font-bold text-secondary-text pb-4 border-b border-border-color dark:border-slate-800/30">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 ${getDifficultyColor(roadmap.difficulty)}`}>
                    {roadmap.difficulty}
                  </span>
                  
                  <Flex align="center" gap={1}>
                    <Clock className="h-4 w-4 text-secondary-text" />
                    <span>{roadmap.duration}</span>
                  </Flex>

                  <Flex align="center" gap={1} className="text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-dark-text">{roadmap.rating.toFixed(1)}</span>
                    <span className="text-secondary-text">({roadmap.totalRatings || 0} reviews)</span>
                  </Flex>
                </Flex>

                {/* Interactive User Progress Bar */}
                {isEnrolled && (
                  <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/20 rounded-2xl p-5 flex flex-col gap-2 select-none shadow-xxs">
                    <div className="flex justify-between items-center text-xxs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      <span>Your Learning Journey Progress</span>
                      <span>{progressPercentage}% Completed</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-secondary-text font-bold leading-relaxed mt-1">
                      {completedNodes.length} of {roadmap.skills.length} skills mastered. Toggle individual skills below to track progress.
                    </span>
                  </div>
                )}

                {/* Section: Full description */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Curriculum Overview</span>
                  </h2>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    {roadmap.fullDescription}
                  </p>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-800/40" />

                {/* Section: Skills you'll learn */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Skills You will Master</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {roadmap.skills.map((skill) => {
                      const isCompleted = completedNodes.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          disabled={!isEnrolled || updateProgressMutation.isPending}
                          onClick={() => {
                            if (!isEnrolled) return;
                            const exists = completedNodes.includes(skill);
                            const nextNodes = exists
                              ? completedNodes.filter((s) => s !== skill)
                              : [...completedNodes, skill];
                            updateProgressMutation.mutate(nextNodes);
                          }}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-xs font-bold transition-all",
                            isCompleted
                              ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                              : "bg-slate-50/50 dark:bg-slate-900/20 border-border-color dark:border-slate-800/40 text-dark-text hover:border-primary/20",
                            !isEnrolled && "cursor-default hover:border-border-color dark:hover:border-slate-800/40"
                          )}
                        >
                          <div className={cn(
                            "h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors",
                            isCompleted
                              ? "bg-emerald-500 border-transparent text-white"
                              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d16]"
                          )}>
                            {isCompleted && <CheckCircle className="h-3.5 w-3.5" />}
                          </div>
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-800/40" />

                {/* Section: Learning outcomes */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-emerald-500" />
                    <span>Learning Accomplishments</span>
                  </h2>

                  <div className="flex flex-col gap-3">
                    {roadmap.learningOutcomes?.map((outcome, idx) => (
                      <Flex key={idx} align="start" gap={2}>
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-secondary-text leading-normal">{outcome}</span>
                      </Flex>
                    ))}
                  </div>
                </div>

              </div>

              {/* ================= 1.5 Reviews & Ratings Section Card ================= */}
              <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-8">
                
                {/* Section Header */}
                <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-50 dark:border-slate-850/40 pb-4">
                  <Star className="h-4.5 w-4.5 text-amber-500 fill-current" />
                  <span>Reviews & Ratings</span>
                </h2>

                {/* Rating Breakdown block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50 dark:bg-slate-900/10 p-5 rounded-xl border border-border-color/40 dark:border-slate-850/40">
                  
                  {/* Score circle (Col 4) */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl md:text-5xl font-black text-dark-text">{roadmap.rating.toFixed(1)}</span>
                    <Flex className="text-amber-500 my-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4.5 w-4.5 fill-current" />
                      ))}
                    </Flex>
                    <span className="text-xxs font-bold text-secondary-text">
                      Based on {roadmap.totalRatings || 0} ratings
                    </span>
                  </div>

                  {/* Breakdown Bars (Col 8) */}
                  <div className="md:col-span-8 flex flex-col gap-2.5">
                    {[
                      { stars: 5, pct: "78%" },
                      { stars: 4, pct: "15%" },
                      { stars: 3, pct: "5%" },
                      { stars: 2, pct: "1%" },
                      { stars: 1, pct: "1%" },
                    ].map((row) => (
                      <Flex key={row.stars} align="center" gap={3} className="text-xxs font-bold text-secondary-text">
                        <span className="w-4 shrink-0 text-right">{row.stars}★</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: row.pct }} />
                        </div>
                        <span className="w-8 shrink-0 text-left">{row.pct}</span>
                      </Flex>
                    ))}
                  </div>

                </div>

                {/* Individual reviews listing */}
                <div className="flex flex-col gap-6">
                  {isRelatedLoading ? (
                    // Render reviews list loading skeletons
                    [1, 2, 3].map((s) => (
                      <div key={s} className="flex gap-4 animate-pulse pb-6 border-b border-slate-50 dark:border-slate-850/40 last:border-0 last:pb-0">
                        <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                        <div className="flex flex-col gap-2.5 flex-1">
                          <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="flex flex-col gap-1.5 mt-1">
                            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                            <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Render loaded reviews
                    [
                      {
                        initials: "ER",
                        color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400",
                        name: "Elena Rostova",
                        rating: 5,
                        date: "July 14, 2026",
                        text: "Exceptional curriculum structure. I constructed my entire development portfolio off this exact study timeline. The references match standard industry environments.",
                      },
                      {
                        initials: "SJ",
                        color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400",
                        name: "Sarah Jenkins",
                        rating: 5,
                        date: "July 12, 2026",
                        text: "The progression from basic JavaScript DOM structures to dynamic React states was incredibly clear. Perfect for transitioners looking to avoid generic visual tutorials.",
                      },
                      {
                        initials: "DC",
                        color: "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400",
                        name: "David Chen",
                        rating: 4,
                        date: "July 08, 2026",
                        text: "Highly recommended for self-paced learners. The outcomes checklists let me track my learning velocity and focus targets. Prepared me well for backend testing.",
                      },
                      {
                        initials: "MV",
                        color: "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400",
                        name: "Marcus Vance",
                        rating: 5,
                        date: "July 01, 2026",
                        text: "Super clean layout configurations. It includes Git and bundle optimization details which bootcamps usually skip. Very pleased with the learning curve.",
                      },
                    ].map((review, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 pb-6 border-b border-slate-50 dark:border-slate-850/40 last:border-0 last:pb-0"
                      >
                        {/* Avatar initials */}
                        <div className={`h-9 w-9 rounded-full ${review.color} flex items-center justify-center text-xs font-bold shrink-0 shadow-xxs`}>
                          {review.initials}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-1 flex-1">
                          <Flex justify="between" align="center" className="flex-wrap gap-1">
                            <span className="text-xs font-black text-dark-text">{review.name}</span>
                            <span className="text-[10px] text-secondary-text font-bold">{review.date}</span>
                          </Flex>
                          
                          {/* Stars */}
                          <Flex className="text-amber-500 my-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={cn("h-3 w-3", s <= review.rating ? "fill-current" : "opacity-20")}
                              />
                            ))}
                          </Flex>

                          {/* Review comment */}
                          <p className="text-xxs text-secondary-text leading-relaxed mt-1">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>

            {/* Right Card Panel Column (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              
              {/* Visual Preview Box */}
              <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 shadow-md flex flex-col gap-5">
                
                {/* Custom Tech Badge Illustration Graphic (CSS based) */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/15 flex items-center justify-center border border-border-color dark:border-slate-850">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white dark:bg-slate-900 border border-border-color dark:border-slate-850 flex items-center justify-center text-primary shadow-md">
                      <Award className="h-8 w-8 animate-pulse text-primary" />
                    </div>
                    <span className="text-xs font-black text-dark-text tracking-wide">{roadmap.title}</span>
                    <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider">{roadmap.category} Badge</span>
                  </div>

                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                    <ShieldCheck className="h-3 w-3" />
                    <span>AI-Verified</span>
                  </div>
                </div>

                {/* Roadmap Quick Stats */}
                <div className="flex flex-col gap-3 py-2">
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Timelines:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.duration}</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Curriculum Modules:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.skills ? roadmap.skills.length * 2 : 12} modules</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Practical Projects:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.learningOutcomes ? roadmap.learningOutcomes.length : 6} builds</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs">
                    <span className="text-secondary-text font-bold">Milestone Badges:</span>
                    <span className="text-dark-text font-extrabold">1 verified badge</span>
                  </Flex>
                </div>

                {/* Primary CTA Action triggers */}
                <div className="flex flex-col gap-2.5">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="w-full text-xs font-black shadow-md shadow-primary/10 py-3"
                  >
                    {enrollMutation.isPending ? "Enrolling..." : isEnrolled ? "Continue Learning" : "Enroll in Pathway"}
                  </Button>
                  <Button
                    variant="outline"
                    size="large"
                    onClick={handleShare}
                    className="w-full text-xs font-bold border border-border-color dark:border-slate-800 text-dark-text flex items-center justify-center gap-1.5 py-3"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Roadmap</span>
                  </Button>
                </div>

              </div>

            </div>

          </div>

        </Container>
      </Section>

      {/* ================= 2. Related Roadmaps Section ================= */}
      <Section className="border-t border-border-color dark:border-slate-850/60 bg-slate-50 dark:bg-[#070b12] py-12 md:py-16 select-none">
        <Container>
          
          {/* Section heading */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-widest">
              Curriculum Paths
            </span>
            <h2 className="text-xl md:text-2xl font-black text-dark-text tracking-tight">
              Related Roadmaps
            </h2>
          </div>

          {/* Cards Grid */}
          <Grid cols={1} colsSm={2} colsLg={4} gap={5}>
            {relatedRoadmaps.map((rm) => {
              const isRmEnrolled = enrollments.some(
                (e) => e.roadmapId?._id === rm._id || (typeof e.roadmapId === "string" && e.roadmapId === rm._id)
              );
              const cardMetadata = [rm.difficulty, rm.duration, `★ ${rm.rating.toFixed(1)}`, rm.category];
              if (isRmEnrolled) {
                cardMetadata.push("✓ Enrolled");
              }
              return (
                <Link href={`/explore/${rm.slug}`} key={rm._id} className="flex flex-col h-full w-full">
                  <Card
                    isSkeleton={isRelatedLoading}
                    imageSrc={rm.coverImage}
                    imageAlt={rm.title}
                    title={rm.title}
                    description=""
                    metadata={cardMetadata}
                    actionLabel="View Details"
                    className="h-full cursor-pointer border-border-color/60 dark:border-slate-800/40"
                  />
                </Link>
              );
            })}
          </Grid>

        </Container>
      </Section>

    </PageWrapper>
  );
}
