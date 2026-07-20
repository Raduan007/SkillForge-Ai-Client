"use client";

import * as React from "react";
import { Cpu, Compass, Bot, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Grid, Flex } from "@/components/layout/Layouts";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";

interface AIFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
}

export default function AIFeaturesSection() {
  const aiFeatures: AIFeatureItem[] = [
    {
      id: "roadmap-gen",
      title: "AI Learning Roadmap Generator",
      description: "Input your career goal and available hours to instantly build a customized, interactive learning roadmap filled with resources, topics, and projects.",
      icon: Cpu,
      badgeText: "Core Tool",
    },
    {
      id: "career-match",
      title: "AI Career Match Engine",
      description: "Answer strategic questions about your interests and skills to get matched with high-paying modern tech careers and custom curriculum options.",
      icon: Compass,
      badgeText: "Career Finder",
    },
    {
      id: "ai-assistant",
      title: "AI Career Assistant Co-Pilot",
      description: "Engage in context-aware conversations directly beside roadmap nodes or quizzes. Ask for code explanations, review tips, or resume advice.",
      icon: Bot,
      badgeText: "AI Assistant",
    },
  ];

  const handleLearnMore = (title: string) => {
    toast.success(`More details about "${title}" will be unlocked in the upcoming chapters!`, {
      icon: "🚀",
      id: "learn-more-toast",
    });
  };

  return (
    <Section className="bg-white dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none">
      <Container>
        
        {/* ================= Header Title ================= */}
        <Flex direction="col" align="center" className="text-center mb-12 gap-3">
          {/* Animated decorative spark */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-primary mb-1 animate-pulse"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight"
          >
            AI-Powered Career Building
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs text-secondary-text max-w-xl leading-relaxed"
          >
            SkillForge AI embeds advanced large language models directly into your learning flow to construct paths, recommend jobs, and mentor you 24/7.
          </motion.p>
        </Flex>

        {/* ================= Grid Cards ================= */}
        <Grid cols={1} colsSm={2} colsLg={3} gap={6}>
          {aiFeatures.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              {/* Reuse our core Card component configured with top icons and bottom actions */}
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                metadata={[feature.badgeText]}
                actionLabel="Learn More"
                onAction={() => handleLearnMore(feature.title)}
                className="hover:scale-[1.01] active:scale-[0.99] border-border-color/60 dark:border-slate-800/40"
              />
            </motion.div>
          ))}
        </Grid>

      </Container>
    </Section>
  );
}
