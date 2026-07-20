"use client";

import * as React from "react";
import {
  Bot,
  Map,
  Award,
  Terminal,
  ClipboardCheck,
  LineChart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Grid, Flex } from "@/components/layout/Layouts";
import { Card } from "@/components/ui/Card";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function FeaturesSection() {
  // Feature Cards configurations
  const features: FeatureItem[] = [
    {
      id: "ai-copilot",
      title: "AI Career Co-Pilot",
      description: "Receive instant technical guidance, explain complex concepts, and audit your quiz errors with our Gemini-powered chat co-pilot.",
      icon: Bot,
    },
    {
      id: "dynamic-roadmaps",
      title: "AI-Powered Roadmaps",
      description: "Generate highly customized, weekly study plans tailored to your technical background, time limits, and career path aspirations.",
      icon: Map,
    },
    {
      id: "skill-assessments",
      title: "Interactive Skill Quizzes",
      description: "Take targeted coding assessments to test your knowledge, earn scores, and dynamically unlock next-level roadmap nodes.",
      icon: ClipboardCheck,
    },
    {
      id: "habit-building",
      title: "Habit-Building Gamification",
      description: "Stay consistently motivated and track progress using daily streak counters, verified badges, and milestone checkmarks.",
      icon: Award,
    },
    {
      id: "portfolio-projects",
      title: "Milestone Portfolio Projects",
      description: "Build actual software projects specified at the end of each roadmap phase, ready to showcase to recruiters and hiring managers.",
      icon: Terminal,
    },
    {
      id: "career-analytics",
      title: "Career Match Analytics",
      description: "Review skill gap diagrams, target career match scores, and track your transition readiness metrics against actual market listings.",
      icon: LineChart,
    },
  ];

  return (
    <Section className="bg-white dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none">
      <Container>
        
        {/* ================= Header Title ================= */}
        <Flex direction="col" align="center" className="text-center mb-12 gap-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight"
          >
            Platform Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs text-secondary-text max-w-xl leading-relaxed"
          >
            SkillForge AI blends state-of-the-art AI generation tools with proven learning principles to speed up your career transition.
          </motion.p>
        </Flex>

        {/* ================= Features Grid ================= */}
        <Grid cols={1} colsSm={2} colsLg={3} gap={6}>
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Reuse our core Card component configured with top-level Lucide Icons */}
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="hover:scale-[1.01] active:scale-[0.99] border-border-color/60 dark:border-slate-800/40"
              />
            </motion.div>
          ))}
        </Grid>

      </Container>
    </Section>
  );
}
