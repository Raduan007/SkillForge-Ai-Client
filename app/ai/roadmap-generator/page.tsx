"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { PageWrapper, Section, Container, Flex, Grid } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import {
  Compass,
  Sparkles,
  ArrowLeft,
  Calendar,
  BookOpen,
  Award,
  RotateCw,
  Clock
} from "lucide-react";

interface Roadmap {
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface Milestone {
  week: number;
  title: string;
  topics: string[];
  description: string;
}

interface Project {
  title: string;
  description: string;
  difficulty: string;
}

interface Resource {
  title: string;
  url: string;
  type: string;
}

interface GeneratedRoadmap {
  roadmap: Roadmap;
  milestones: Milestone[];
  skills: string[];
  projects: Project[];
  resources: Resource[];
  estimatedDuration: string;
}

const loadingTexts = [
  "Analyzing career goal inputs...",
  "Querying SkillForge AI engines...",
  "Drafting week-by-week milestones...",
  "Mapping relevant learning references...",
  "Structuring hands-on portfolio projects...",
  "Synthesizing customized timeline..."
];

export default function AIRoadmapGeneratorPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // Form states
  const [careerGoal, setCareerGoal] = React.useState("");
  const [currentExperience, setCurrentExperience] = React.useState("Entry-Level");
  const [existingSkills, setExistingSkills] = React.useState("");
  const [weeklyStudyHours, setWeeklyStudyHours] = React.useState("10");
  const [preferredLearningStyle, setPreferredLearningStyle] = React.useState("Mixed");
  const [targetCompletionTime, setTargetCompletionTime] = React.useState("3 months");

  const [roadmapData, setRoadmapData] = React.useState<GeneratedRoadmap | null>(null);

  // Protection Check
  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to access the AI generator.");
      router.push("/login?redirect=/ai/roadmap-generator");
    }
  }, [user, isAuthLoading, router]);

  // Loading text cycling
  const [loadingTextIndex, setLoadingTextIndex] = React.useState(0);

  // TanStack Mutation configuration
  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<{ success: boolean; data: GeneratedRoadmap }>("/ai/roadmap", {
        careerGoal,
        currentExperience,
        existingSkills,
        weeklyStudyHours,
        preferredLearningStyle,
        targetCompletionTime
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      setRoadmapData(data);
      toast.success("AI Career Roadmap generated successfully!");
    },
    onError: (err: unknown) => {
      console.error("[AIRoadmapGenerator] Error:", err);
      let errMsg = "Failed to generate roadmap. Please check your network and try again.";
      if (err && typeof err === "object") {
        const axiosError = err as { response?: { data?: { error?: string } }; message?: string };
        if (axiosError.response?.data?.error) {
          errMsg = axiosError.response.data.error;
        } else if (axiosError.message) {
          errMsg = axiosError.message;
        }
      }
      toast.error(errMsg);
    }
  });

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generateMutation.isPending) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [generateMutation.isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerGoal.trim()) {
      toast.error("Please state your career goal.");
      return;
    }
    generateMutation.mutate();
  };

  const handleRegenerate = () => {
    generateMutation.mutate();
  };

  if (isAuthLoading || (!user && !isAuthLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] min-h-screen">
      
      {/* Page Header banner */}
      <div className="bg-white dark:bg-[#0c1220]/30 py-4 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Flex align="center" justify="between" className="flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </Flex>
        </Container>
      </div>

      <Section className="py-8 md:py-12">
        <Container>
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            
            {/* Title block */}
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md shadow-primary/10 mb-2">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#090d16]">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-dark-text tracking-tight">
                AI Career Roadmap Generator
              </h1>
              <p className="text-xs text-secondary-text leading-relaxed">
                Provide your profile details and let the SkillForge AI build a week-by-week personalized progression pathway packed with milestone targets, reference outcomes, and projects.
              </p>
            </div>

            {/* Main grid split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Input Form (Span 4) */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-xs font-black text-dark-text uppercase tracking-widest pb-3 border-b border-border-color dark:border-slate-800/20">
                  Profile Details
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input
                    label="Career Goal"
                    placeholder="e.g. Senior Frontend Dev, Data Scientist..."
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    disabled={generateMutation.isPending}
                    required
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-dark-text select-none">
                      Current Experience
                    </label>
                    <select
                      className="w-full h-10 px-3 py-2 rounded-lg border border-border-color bg-white text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 dark:bg-[#0c1220] dark:border-slate-800"
                      value={currentExperience}
                      onChange={(e) => setCurrentExperience(e.target.value)}
                      disabled={generateMutation.isPending}
                    >
                      <option value="No experience (Absolute beginner)">Absolute Beginner</option>
                      <option value="Entry-Level (Some self-study)">Entry-Level</option>
                      <option value="Junior (Under 2 years)">Junior Developer</option>
                      <option value="Mid-Level (2-5 years)">Mid-Level Developer</option>
                      <option value="Senior (5+ years)">Senior Developer</option>
                    </select>
                  </div>

                  <Input
                    label="Existing Skills (Optional)"
                    placeholder="e.g. HTML, basic Python, SQL..."
                    value={existingSkills}
                    onChange={(e) => setExistingSkills(e.target.value)}
                    disabled={generateMutation.isPending}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-dark-text select-none">
                      Weekly Study Hours
                    </label>
                    <select
                      className="w-full h-10 px-3 py-2 rounded-lg border border-border-color bg-white text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 dark:bg-[#0c1220] dark:border-slate-800"
                      value={weeklyStudyHours}
                      onChange={(e) => setWeeklyStudyHours(e.target.value)}
                      disabled={generateMutation.isPending}
                    >
                      <option value="5">5 hours/week (Casual)</option>
                      <option value="10">10 hours/week (Standard)</option>
                      <option value="20">20 hours/week (Accelerated)</option>
                      <option value="30">30+ hours/week (Intensive)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-dark-text select-none">
                      Learning Style
                    </label>
                    <select
                      className="w-full h-10 px-3 py-2 rounded-lg border border-border-color bg-white text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 dark:bg-[#0c1220] dark:border-slate-800"
                      value={preferredLearningStyle}
                      onChange={(e) => setPreferredLearningStyle(e.target.value)}
                      disabled={generateMutation.isPending}
                    >
                      <option value="Mixed (Balanced resource stack)">Mixed (Articles, videos, labs)</option>
                      <option value="Hands-on (Building projects first)">Hands-on (Coding projects)</option>
                      <option value="Visual (Video-based courses)">Visual (Video-heavy)</option>
                      <option value="Reading (Reading books/documentation)">Reading (Docs & Books)</option>
                    </select>
                  </div>

                  <Input
                    label="Target Completion Time"
                    placeholder="e.g. 3 months, 6 months..."
                    value={targetCompletionTime}
                    onChange={(e) => setTargetCompletionTime(e.target.value)}
                    disabled={generateMutation.isPending}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="w-full mt-2 text-xs font-bold gap-1.5"
                    isLoading={generateMutation.isPending}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Roadmap
                  </Button>
                </form>
              </div>

              {/* Right Column: AI Output Render (Span 8) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* 1. Loading state */}
                {generateMutation.isPending && (
                  <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[450px] shadow-sm animate-pulse">
                    <div className="relative flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-primary flex items-center justify-center animate-bounce">
                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin h-16 w-16" />
                    </div>
                    
                    <div className="flex flex-col gap-2 max-w-sm">
                      <h3 className="text-sm font-black text-dark-text uppercase tracking-wider animate-pulse">
                        Crafting Pathway...
                      </h3>
                      <p className="text-xs text-secondary-text leading-relaxed">
                        {loadingTexts[loadingTextIndex]}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Empty state (No roadmap generated yet) */}
                {!generateMutation.isPending && !roadmapData && (
                  <div className="bg-white dark:bg-[#0c1220] border border-dashed border-border-color dark:border-slate-800/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 min-h-[450px] shadow-sm select-none">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center">
                      <Compass className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-black text-dark-text">Your learning path will appear here</h3>
                    <p className="text-xs text-secondary-text max-w-sm leading-relaxed">
                      Fill out the profile goal parameter values on the left side form and tap Generate to let the AI process your custom track.
                    </p>
                  </div>
                )}

                {/* 3. Generated Roadmap Render */}
                {!generateMutation.isPending && roadmapData && (
                  <div className="flex flex-col gap-8 animate-fade-in duration-500">
                    
                    {/* Header Summary Card */}
                    <div className="bg-gradient-to-br from-white to-slate-50/50 dark:from-[#0c1220] dark:to-[#0f182c] border border-border-color dark:border-slate-800/50 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
                      <Flex align="center" justify="between" className="flex-wrap gap-4 pb-4 border-b border-border-color/60 dark:border-slate-800/20">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-md self-start">
                            {roadmapData.roadmap.category}
                          </span>
                          <h2 className="text-xl md:text-2xl font-black text-dark-text tracking-tight mt-1.5">
                            {roadmapData.roadmap.title}
                          </h2>
                        </div>
                        
                        <Button
                          onClick={handleRegenerate}
                          variant="outline"
                          size="small"
                          className="text-xs font-bold gap-1.5 shrink-0"
                        >
                          <RotateCw className="h-3.5 w-3.5" />
                          Regenerate
                        </Button>
                      </Flex>

                      <p className="text-xs text-secondary-text leading-relaxed">
                        {roadmapData.roadmap.description}
                      </p>

                      <Flex align="center" gap={6} className="flex-wrap text-xxs font-bold text-secondary-text mt-2 pt-2 border-t border-border-color/60 dark:border-slate-800/20">
                        <Flex align="center" gap={2}>
                          <Award className="h-4 w-4 text-primary" />
                          <span>Difficulty: {roadmapData.roadmap.difficulty}</span>
                        </Flex>
                        
                        <Flex align="center" gap={2}>
                          <Clock className="h-4 w-4 text-primary" />
                          <span>Timeline: {roadmapData.estimatedDuration}</span>
                        </Flex>

                        <Flex align="center" gap={2}>
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Commitment: {weeklyStudyHours} hours/week</span>
                        </Flex>
                      </Flex>
                    </div>

                    {/* Weekly Milestones Timeline */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xs font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5 px-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Weekly Milestones Timeline</span>
                      </h3>

                      <div className="flex flex-col gap-4">
                        {roadmapData.milestones.map((milestone) => (
                          <div
                            key={milestone.week}
                            className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-xl p-5 flex flex-col sm:flex-row gap-4 shadow-xs"
                          >
                            {/* Week number badge */}
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/45 text-primary flex items-center justify-center shrink-0 select-none">
                              <span className="text-xs font-black">W{milestone.week}</span>
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                              <h4 className="font-bold text-dark-text text-sm">
                                {milestone.title}
                              </h4>
                              
                              <p className="text-xs text-secondary-text leading-relaxed">
                                {milestone.description}
                              </p>

                              {milestone.topics && milestone.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {milestone.topics.map((topic) => (
                                    <span
                                      key={topic}
                                      className="text-[9px] font-bold text-dark-text bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-850 px-2 py-0.5 rounded"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lower details: Skills & Projects */}
                    <Grid cols={1} colsMd={2} gap={6}>
                      
                      {/* Required Skills Card */}
                      <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-xs font-black text-dark-text uppercase tracking-widest pb-3 border-b border-border-color/60 dark:border-slate-800/20 flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-emerald-500" />
                          <span>Core Competencies</span>
                        </h3>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {roadmapData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-bold text-dark-text bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-800/80 px-2.5 py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio Projects Card */}
                      <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-xs font-black text-dark-text uppercase tracking-widest pb-3 border-b border-border-color/60 dark:border-slate-800/20 flex items-center gap-1.5">
                          <Compass className="h-4 w-4 text-amber-500" />
                          <span>Suggested Projects</span>
                        </h3>

                        <div className="flex flex-col gap-4">
                          {roadmapData.projects.map((proj, idx) => (
                            <div key={idx} className="flex flex-col gap-1.5 pb-3 last:pb-0 border-b border-slate-50 dark:border-slate-850 last:border-0">
                              <div className="flex justify-between items-center gap-2">
                                <h4 className="text-xs font-bold text-dark-text truncate">{proj.title}</h4>
                                <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
                                  {proj.difficulty}
                                </span>
                              </div>
                              <p className="text-[10px] text-secondary-text leading-relaxed">
                                {proj.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </Grid>

                    {/* Suggested Learning Resources */}
                    {roadmapData.resources && roadmapData.resources.length > 0 && (
                      <div className="bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/50 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-xs font-black text-dark-text uppercase tracking-widest pb-3 border-b border-border-color/60 dark:border-slate-800/20 flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>Recommended Learning Materials</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {roadmapData.resources.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex items-start justify-between gap-4 border border-border-color/60 dark:border-slate-800/60 p-3.5 rounded-xl hover:border-primary/30 dark:hover:border-primary/20 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-all select-none"
                            >
                              <div className="flex flex-col gap-1.5 min-w-0">
                                <span className="text-[9px] font-bold text-primary dark:text-primary-light uppercase tracking-wider leading-none">
                                  {res.type}
                                </span>
                                <h4 className="text-xs font-bold text-dark-text truncate leading-snug">
                                  {res.title}
                                </h4>
                              </div>
                              <Compass className="h-4 w-4 text-secondary-text group-hover:text-primary transition-colors shrink-0 mt-0.5 animate-none" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>
        </Container>
      </Section>

    </PageWrapper>
  );
}
