"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatarText: string;
  reviewText: string;
}

export default function TestimonialsSection() {
  const testimonials: TestimonialItem[] = [
    {
      id: "t1",
      name: "Sarah Jenkins",
      role: "Junior Developer at Vercel (former Marketer)",
      rating: 5,
      avatarText: "SJ",
      reviewText: "SkillForge AI completely transformed my career path. The personalized learning roadmap cut through all the noise of online tutorials. I built three portfolio projects, passed the assessment, and landed my first dev role in 6 months!",
    },
    {
      id: "t2",
      name: "David Chen",
      role: "ML Engineer at Adobe (former Analyst)",
      rating: 5,
      avatarText: "DC",
      reviewText: "The AI recommendations matched me perfectly with machine learning tracks. Having an AI co-pilot next to my coding nodes meant I got instant bug audits without getting frustrated. The quiz pacing was masterfully designed.",
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      role: "Product Designer at Figma (former Illustrator)",
      rating: 5,
      avatarText: "ER",
      reviewText: "I loved the dynamic layout of the design system nodes. The portfolio challenge specified exactly what I needed to build, and the AI assistant's UX review tips were extremely helpful. This platform is a game-changer.",
    },
    {
      id: "t4",
      name: "Marcus Thompson",
      role: "Cloud Solutions Architect at AWS (former SysAdmin)",
      rating: 5,
      avatarText: "MT",
      reviewText: "Outstanding Cloud curriculum. The Kubernetes configurations and cloud-scaling modules were highly practical. Earning my certification badges on the platform gave me the confidence to ace my architect interviews.",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // -1 = left, 1 = right

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const current = testimonials[activeIndex];

  return (
    <Section className="bg-neutral-bg dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none overflow-hidden">
      <Container className="max-w-4xl">
        
        {/* ================= Header Title ================= */}
        <Flex direction="col" align="center" className="text-center mb-10 gap-3">
          <h2 className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight">
            Success Stories
          </h2>
          <p className="text-xs text-secondary-text max-w-xl leading-relaxed">
            See how career switchers and tech enthusiasts bypassed traditional bootcamps to land positions at leading platforms.
          </p>
        </Flex>

        {/* ================= Carousel Container ================= */}
        <div className="relative flex flex-col items-center">
          
          {/* Main Card Slider */}
          <div className="relative min-h-[300px] w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full rounded-2xl border border-border-color dark:border-slate-800/40 bg-white dark:bg-[#090d16] p-6 md:p-10 shadow-sm flex flex-col gap-6"
              >
                {/* Quote Icon overlay */}
                <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-850 select-none pointer-events-none">
                  <Quote className="h-16 w-16 rotate-180" />
                </div>

                {/* Rating stars */}
                <Flex gap={1} className="text-amber-500">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </Flex>

                {/* Review Text */}
                <p className="text-sm md:text-base font-semibold text-dark-text leading-relaxed italic pr-4">
                  &ldquo;{current.reviewText}&rdquo;
                </p>

                {/* User Info */}
                <Flex align="center" gap={3} className="border-t border-border-color dark:border-slate-800/40 pt-4 mt-2">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 text-primary dark:text-primary-light font-black text-sm">
                    {current.avatarText}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-dark-text">{current.name}</span>
                    <span className="text-xxs text-secondary-text">{current.role}</span>
                  </div>
                </Flex>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ================= Carousel Navigation controls ================= */}
          <Flex align="center" justify="between" className="w-full mt-6 flex-wrap gap-4">
            
            {/* Slide indicators */}
            <Flex gap={2}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === activeIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-350 dark:hover:bg-slate-700"
                  )}
                  aria-label={`Jump to review slide ${idx + 1}`}
                />
              ))}
            </Flex>

            {/* Prev/Next buttons */}
            <Flex gap={2}>
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 bg-white dark:bg-slate-900 text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all shadow-xs"
                aria-label="Previous review slide"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 bg-white dark:bg-slate-900 text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all shadow-xs"
                aria-label="Next review slide"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </Flex>

          </Flex>

        </div>

      </Container>
    </Section>
  );
}
