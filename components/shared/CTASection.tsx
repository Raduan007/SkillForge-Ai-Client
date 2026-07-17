"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <Section className="relative overflow-hidden bg-white dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none py-16 md:py-24">
      
      {/* ================= Glowing Mesh Gradient Background Elements ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60 dark:opacity-40">
        {/* Floating gradient orb 1 */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 left-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
        />
        {/* Floating gradient orb 2 */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/2 right-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl"
        />
      </div>

      <Container className="relative z-10 max-w-4xl text-center">
        
        {/* ================= Content Card ================= */}
        <div className="rounded-3xl border border-border-color/60 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-850/5 p-8 md:p-14 backdrop-blur-md shadow-sm flex flex-col items-center gap-6">
          
          {/* Animated Glowing Spark */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-primary/15 to-secondary/15 border border-primary/20 text-primary mb-1 shadow-md shadow-primary/5"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-dark-text max-w-2xl">
            Ready to Forge Your Tech Career?
          </h2>

          {/* Description */}
          <p className="text-xs md:text-sm text-secondary-text max-w-xl leading-relaxed">
            Join thousands of developers using SkillForge AI to generate customized roadmaps, pass targeted quizzes, verify completion badges, and build portfolio projects. Get started for free today.
          </p>

          {/* CTA Actions */}
          <Flex gap={4} className="mt-4 flex-wrap justify-center">
            
            {/* Primary Action Button */}
            <Link href="/dashboard" passHref legacyBehavior>
              <Button
                variant="primary"
                size="large"
                className="text-xs font-bold px-7 py-3 flex items-center gap-1.5 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            {/* Secondary Action Button */}
            <Link href="/explore" passHref legacyBehavior>
              <Button
                variant="outline"
                size="large"
                className="text-xs font-bold px-7 py-3 border border-border-color dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 transition-all"
              >
                <Compass className="h-4 w-4 text-secondary-text" />
                <span>Explore Roadmaps</span>
              </Button>
            </Link>

          </Flex>

        </div>

      </Container>
    </Section>
  );
}
