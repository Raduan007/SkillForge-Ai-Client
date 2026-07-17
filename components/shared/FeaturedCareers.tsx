"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Clock, BarChart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Grid, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

// Career Data Interfaces
interface CareerPath {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  imageSrc: string;
}

export default function FeaturedCareers() {
  const [isSkeleton, setIsSkeleton] = React.useState(false);

  // Seed Mock Data
  const careerPaths: CareerPath[] = [
    {
      id: "fs-dev",
      title: "Full Stack Developer",
      description: "Master modern front-end and back-end architectures, databases, and DevOps practices using React and Node.js.",
      difficulty: "Intermediate",
      duration: "6 Months",
      rating: 4.8,
      imageSrc: "/careers/full-stack-developer.png",
    },
    {
      id: "data-sci",
      title: "Data Scientist",
      description: "Analyze large-scale datasets, engineer pipelines, and deploy deep learning models using Python and PyTorch.",
      difficulty: "Advanced",
      duration: "8 Months",
      rating: 4.9,
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "ui-ux",
      title: "UI/UX Designer",
      description: "Design gorgeous user interfaces, build design systems, and map research wireframes for premium digital products.",
      difficulty: "Beginner",
      duration: "4 Months",
      rating: 4.7,
      imageSrc: "/careers/ui-ux-designer.png",
    },
    {
      id: "cloud-arch",
      title: "Cloud Architect",
      description: "Design and implement highly available, fault-tolerant, and secure cloud infrastructures on AWS and Kubernetes.",
      difficulty: "Advanced",
      duration: "7 Months",
      rating: 4.9,
      imageSrc: "/careers/cloud-architect.png",
    },
  ];

  // Difficulty Badges style helper
  const getDifficultyStyles = (level: CareerPath["difficulty"]) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30";
      case "Intermediate":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30";
      case "Advanced":
        return "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30";
    }
  };

  return (
    <Section className="bg-neutral-bg dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none">
      <Container>
        
        {/* ================= Header Title & Preview Toggle ================= */}
        <Flex justify="between" align="end" className="mb-10 flex-wrap gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight">
              Featured Career Paths
            </h2>
            <p className="text-xs text-secondary-text leading-relaxed">
              Explore our customized learning journeys designed by tech veterans. Select a roadmap, pass assessments, and get hired.
            </p>
          </div>
          
          {/* Skeleton Preview Toggle Switch */}
          <Flex align="center" gap={2} className="bg-white dark:bg-slate-900 border border-border-color dark:border-slate-850 px-3 py-1.5 rounded-xl shadow-xs">
            <span className="text-[10px] font-bold text-secondary-text">Skeleton View:</span>
            <button
              onClick={() => setIsSkeleton((prev) => !prev)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none",
                isSkeleton ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-[2px] ml-[2px]",
                  isSkeleton ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </Flex>
        </Flex>

        {/* ================= Grid Layout Cards ================= */}
        <Grid cols={1} colsSm={2} colsLg={4} gap={6}>
          {careerPaths.map((career, idx) => (
            <React.Fragment key={career.id}>
              {isSkeleton ? (
                /* Card Skeleton Loader */
                <div className="flex flex-col h-full w-full rounded-xl border border-border-color dark:border-slate-800/40 bg-white dark:bg-[#090d16] shadow-xs overflow-hidden animate-pulse">
                  <div className="h-44 w-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex flex-col flex-1 p-5 gap-3.5">
                    <div className="flex justify-between items-center">
                      <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="flex flex-col gap-2 flex-1 mt-1">
                      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800 mt-2" />
                  </div>
                </div>
              ) : (
                /* Card Content Card Render */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="group flex flex-col h-full w-full rounded-xl border border-border-color dark:border-slate-800/40 bg-white dark:bg-[#090d16] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Cover Image */}
                  <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0">
                    <Image
                      src={career.imageSrc}
                      alt={career.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    
                    {/* Metadata Header */}
                    <Flex justify="between" align="center" className="flex-wrap gap-1">
                      {/* Difficulty Badge */}
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold select-none",
                          getDifficultyStyles(career.difficulty)
                        )}
                      >
                        {career.difficulty}
                      </span>

                      {/* rating badge */}
                      <Flex align="center" gap={1} className="text-amber-500 dark:text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-[11px] font-bold text-dark-text">{career.rating.toFixed(1)}</span>
                      </Flex>
                    </Flex>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-dark-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-snug">
                      {career.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-secondary-text leading-relaxed flex-1">
                      {career.description}
                    </p>

                    {/* Footer Specifications Info */}
                    <Flex align="center" gap={3} className="text-xxs text-secondary-text border-t border-border-color dark:border-slate-800/40 pt-3 mt-1">
                      <Flex align="center" gap={1}>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{career.duration}</span>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <BarChart className="h-3.5 w-3.5" />
                        <span>Self-Paced</span>
                      </Flex>
                    </Flex>

                    {/* View Details Button */}
                    <div className="mt-2 shrink-0">
                      <Button
                        variant="outline"
                        size="medium"
                        className="w-full text-xs font-bold border border-border-color dark:border-slate-800 text-dark-text group-hover:bg-primary group-hover:text-white dark:group-hover:text-[#090d16] dark:group-hover:bg-primary-light group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>

                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </Grid>

      </Container>
    </Section>
  );
}
