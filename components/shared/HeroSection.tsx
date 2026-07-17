"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, CheckCircle2, Play, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <Section className="relative overflow-hidden bg-white dark:bg-[#090d16] select-none py-16 md:py-24">
      
      {/* Mesh Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
        <div className="absolute -left-10 top-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
        <div className="absolute -right-10 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ================= Left Column: Copy & Actions ================= */}
          <div className="flex flex-col gap-6 lg:col-span-6 text-left">
            
            {/* AI badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 text-xxs font-bold text-primary dark:text-primary-light border border-primary/10 shadow-xxs"
            >
              <Sparkles className="h-3.5 w-3.5 fill-primary/10" />
              <span>Next-Gen AI Career Planning</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-dark-text"
            >
              Accelerate Your Tech Journey with{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Roadmaps
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs md:text-sm text-secondary-text leading-relaxed max-w-xl"
            >
              Bypass generic, outdated bootcamps. Construct highly customized study schedules, test your coding skills with interactive quizzes, and unlock verified credentials.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-4 flex-wrap mt-2"
            >
              <Link href="/dashboard" passHref legacyBehavior>
                <Button
                  variant="primary"
                  size="large"
                  className="text-xs font-bold px-6 flex items-center gap-1.5 shadow-md shadow-primary/10 hover:shadow-lg transition-all"
                >
                  <span>Build My Roadmap</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/explore" passHref legacyBehavior>
                <Button
                  variant="outline"
                  size="large"
                  className="text-xs font-bold px-6 border border-border-color dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/20 flex items-center gap-1.5 transition-all"
                >
                  <Compass className="h-4 w-4 text-secondary-text" />
                  <span>How It Works</span>
                </Button>
              </Link>
            </motion.div>

          </div>

          {/* ================= Right Column: Interactive CSS Roadmap Mockup ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center relative"
          >
            {/* Ambient glow behind card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/10 to-secondary/15 blur-xl opacity-70" />

            {/* Main Interactive Card */}
            <div className="relative w-full max-w-md rounded-2xl border border-border-color/60 dark:border-slate-800/40 bg-white dark:bg-[#090d16] p-6 shadow-xl flex flex-col gap-6">
              
              {/* Card Header */}
              <Flex align="center" justify="between" className="border-b border-border-color dark:border-slate-850 pb-4">
                <div className="flex flex-col">
                  <span className="text-xxs font-bold text-secondary-text uppercase tracking-widest">Active Curriculum</span>
                  <span className="text-sm font-extrabold text-dark-text">Frontend Developer Path</span>
                </div>
                <div className="h-2 w-16 rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </Flex>

              {/* Roadmap Timeline Nodes */}
              <div className="flex flex-col gap-5 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-850">
                
                {/* Node 1: Completed */}
                <Flex align="center" gap={3} className="relative z-10">
                  <div className="h-8.5 w-8.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/20 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-dark-text">HTML & CSS Foundations</span>
                    <span className="text-[10px] text-secondary-text font-semibold">Phase 1 • 6 Topics Completed</span>
                  </div>
                </Flex>

                {/* Node 2: Active */}
                <Flex align="center" gap={3} className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], borderColor: ["#4F46E5", "#F59E0B", "#4F46E5"] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="h-8.5 w-8.5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 border border-primary flex items-center justify-center text-primary shrink-0"
                  >
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5 animate-pulse" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary dark:text-primary-light">JavaScript DOM Manipulation</span>
                    <span className="text-[10px] text-secondary-text font-semibold">Phase 2 • Topic 4/8 In Progress</span>
                  </div>
                </Flex>

                {/* Node 3: Locked */}
                <Flex align="center" gap={3} className="relative z-10">
                  <div className="h-8.5 w-8.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-800 flex items-center justify-center text-secondary-text shrink-0">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-secondary-text">React Application State</span>
                    <span className="text-[10px] text-secondary-text font-semibold">Phase 3 • Locked</span>
                  </div>
                </Flex>

              </div>

            </div>

          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
