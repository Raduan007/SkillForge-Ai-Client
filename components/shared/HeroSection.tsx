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

          {/* ================= Right Column: Creative AI Roadmap Visualization ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 flex items-center justify-center relative w-full h-[400px] lg:h-[500px]"
          >
            {/* Ambient background glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1], 
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-tr from-primary/30 via-secondary/20 to-indigo-500/30 blur-3xl rounded-full opacity-60 dark:opacity-40"
            />

            {/* Central Glass Container */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full max-w-lg max-h-[500px] rounded-[2rem] border border-white/20 bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center"
            >
              
              {/* Dynamic SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(79,70,229,0.5))" }}>
                 <motion.path 
                   d="M 50% 50% Q 25% 30% 20% 20%" 
                   stroke="url(#grad1)" strokeWidth="3" fill="none" strokeDasharray="5 5"
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 0.6 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 />
                 <motion.path 
                   d="M 50% 50% Q 75% 30% 80% 25%" 
                   stroke="url(#grad2)" strokeWidth="3" fill="none" strokeDasharray="5 5"
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 0.6 }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                 />
                 <motion.path 
                   d="M 50% 50% Q 50% 80% 50% 85%" 
                   stroke="url(#grad1)" strokeWidth="3" fill="none" strokeDasharray="5 5"
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 0.6 }}
                   transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1 }}
                 />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#4F46E5" />
                     <stop offset="100%" stopColor="#10B981" />
                   </linearGradient>
                   <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#F59E0B" />
                     <stop offset="100%" stopColor="#EC4899" />
                   </linearGradient>
                 </defs>
              </svg>

              {/* Central AI Core Node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(79,70,229,0.5)", "0 0 40px rgba(79,70,229,0.8)", "0 0 20px rgba(79,70,229,0.5)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center shadow-2xl border border-white/20 rotate-45"
                >
                  <Sparkles className="h-8 w-8 text-white -rotate-45" />
                </motion.div>
                {/* Orbital Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 rounded-full border border-dashed border-primary/40"
                />
              </div>

              {/* Skill Nodes */}
              {/* Node 1 (Top Left) */}
              <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                 className="absolute left-[10%] top-[15%] z-20"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-slate-900 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <span className="text-[10px] font-bold text-emerald-400">React</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/5 text-[9px] font-mono text-dark-text dark:text-white/80 font-semibold shadow-sm">Frontend</span>
                </div>
              </motion.div>

              {/* Node 2 (Top Right) */}
              <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 5, repeat: Infinity, delay: 1.2 }}
                 className="absolute right-[10%] top-[20%] z-20"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-slate-900 border border-orange-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <span className="text-[10px] font-bold text-orange-400">Node.js</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/5 text-[9px] font-mono text-dark-text dark:text-white/80 font-semibold shadow-sm">Backend</span>
                </div>
              </motion.div>

              {/* Node 3 (Bottom Center) */}
              <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 4.5, repeat: Infinity, delay: 0.8 }}
                 className="absolute left-1/2 -translate-x-1/2 bottom-[15%] z-20"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-slate-900 border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <span className="text-[10px] font-bold text-purple-400">Python</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/5 text-[9px] font-mono text-dark-text dark:text-white/80 font-semibold shadow-sm">AI / ML</span>
                </div>
              </motion.div>

              {/* Floating particles inside the container */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -100, 0], 
                    x: [0, (i % 2 === 0 ? 50 : -50), 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 5 + i * 2, 
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                  className="absolute bottom-1/4 h-1.5 w-1.5 rounded-full bg-primary/40 blur-[1px]"
                  style={{ left: `${30 + i * 10}%` }}
                />
              ))}

              {/* Scanning laser line overlay */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(79,70,229,0.6)] z-30 opacity-50"
              />

            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
