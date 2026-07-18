import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  GraduationCap,
  Users,
  ShieldCheck,
  Workflow,
  CheckCircle,
  Database,
  Flame,
  Globe,
  Zap,
} from "lucide-react";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us | SkillForge AI",
  description:
    "Learn about SkillForge AI, our mission to democratize skill acquisition, the technology stack we leverage, and our values in helping professionals master career roadmaps.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-200">
      
      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-border-color dark:border-slate-800/40 bg-gradient-to-b from-indigo-50/30 to-transparent dark:from-indigo-950/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.06),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-white dark:bg-[#0c1220] shadow-sm mb-6 select-none animate-pulse">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xxs font-bold uppercase tracking-wider text-primary">
              Forging the Future of Learning
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent max-w-4xl mx-auto">
            Democratizing Career Growth through AI-Driven Learning
          </h1>
          <p className="mt-6 text-base sm:text-lg text-secondary-text max-w-2xl mx-auto leading-relaxed">
            SkillForge AI generates, updates, and structures career roadmaps in real-time. Navigate from beginner concepts to advanced specialties with ease.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/explore">
              <Button variant="primary" size="large" className="text-xs font-bold gap-2">
                <Compass className="h-4 w-4" />
                Explore Roadmaps
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="large" className="text-xs font-semibold">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. OUR MISSION ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-color dark:border-slate-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Our Vision & Scope
            </span>
            <h2 className="text-3xl font-black text-dark-text tracking-tight">
              Bridging the Global Tech Skills Gap
            </h2>
            <p className="mt-4 text-sm text-secondary-text leading-relaxed">
              Traditional curriculums struggle to keep pace with rapid technical innovation. SkillForge AI was created to provide static, real-time, and dynamic paths of study tailored to industry-standard benchmarks. 
            </p>
            <p className="mt-3 text-sm text-secondary-text leading-relaxed">
              Whether you are transitioning into a new role or mastering advanced systems engineering, we synthesize structured learning modules, resource recommendations, and interactive validation questions to keep you ahead.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 bg-white dark:bg-[#0c1220] p-8 rounded-2xl border border-border-color dark:border-slate-800/50 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(79,70,229,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="text-center p-4 border border-border-color/60 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10">
              <div className="text-3xl font-black text-primary">50+</div>
              <div className="text-xxs font-bold text-secondary-text uppercase tracking-wider mt-1.5">Topics Covered</div>
            </div>
            <div className="text-center p-4 border border-border-color/60 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10">
              <div className="text-3xl font-black text-secondary">10k+</div>
              <div className="text-xxs font-bold text-secondary-text uppercase tracking-wider mt-1.5">Paths Generated</div>
            </div>
            <div className="text-center p-4 border border-border-color/60 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10">
              <div className="text-3xl font-black text-primary">24/7</div>
              <div className="text-xxs font-bold text-secondary-text uppercase tracking-wider mt-1.5">AI Calibration</div>
            </div>
            <div className="text-center p-4 border border-border-color/60 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10">
              <div className="text-3xl font-black text-secondary">99%</div>
              <div className="text-xxs font-bold text-secondary-text uppercase tracking-wider mt-1.5">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHY CHOOSE US ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-100/50 dark:bg-slate-900/10 border-b border-border-color dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-dark-text tracking-tight">
              Why Choose SkillForge AI
            </h2>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed">
              We leverage adaptive technology to offer a significantly more effective path to professional mastery than traditional passive tutorials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white dark:bg-[#0c1220] p-6 rounded-xl border border-border-color dark:border-slate-800/50 shadow-sm flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-dark-text text-base leading-tight">Adaptive Node Tracking</h3>
                <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                  Never get lost in generic learning guides. Our paths auto-calibrate based on your speed, existing knowledge, and customized feedback milestones.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-[#0c1220] p-6 rounded-xl border border-border-color dark:border-slate-800/50 shadow-sm flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-dark-text text-base leading-tight">Autonomous Copilot Quizzer</h3>
                <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                  Assess comprehension on the fly. Interactive AI quizzes query specific skills, providing immediate solutions and routing suggestions.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-[#0c1220] p-6 rounded-xl border border-border-color dark:border-slate-800/50 shadow-sm flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-dark-text text-base leading-tight">Verified Milestones</h3>
                <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                  Every step is cataloged and verified. Track achievements, manage your progress, and highlight credentials to stand out to global employers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-color dark:border-slate-800/40">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            The Flow
          </span>
          <h2 className="text-3xl font-black text-dark-text tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-secondary-text leading-relaxed">
            Our platform simplifies career transition down into four high-impact phases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border-color dark:bg-slate-800/60 z-0" />
          
          {/* Step 1 */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white dark:bg-[#0c1220] border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shadow-md">
              1
            </div>
            <div>
              <h3 className="font-bold text-dark-text text-sm">Define Career Goal</h3>
              <p className="mt-1.5 text-xs text-secondary-text leading-relaxed max-w-[200px] mx-auto">
                Search our library of roles or enter a custom target profile into our dashboard.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white dark:bg-[#0c1220] border-2 border-secondary text-secondary flex items-center justify-center font-bold text-sm shadow-md">
              2
            </div>
            <div>
              <h3 className="font-bold text-dark-text text-sm">AI Generates Path</h3>
              <p className="mt-1.5 text-xs text-secondary-text leading-relaxed max-w-[200px] mx-auto">
                The engine evaluates, aggregates, and builds a multi-level roadmap of specific skills.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white dark:bg-[#0c1220] border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shadow-md">
              3
            </div>
            <div>
              <h3 className="font-bold text-dark-text text-sm">Interactive Quiz Check</h3>
              <p className="mt-1.5 text-xs text-secondary-text leading-relaxed max-w-[200px] mx-auto">
                Take automated quizzes at each level to verify mastery before moving forward.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white dark:bg-[#0c1220] border-2 border-secondary text-secondary flex items-center justify-center font-bold text-sm shadow-md">
              4
            </div>
            <div>
              <h3 className="font-bold text-dark-text text-sm">Achieve Vetted Success</h3>
              <p className="mt-1.5 text-xs text-secondary-text leading-relaxed max-w-[200px] mx-auto">
                Unlock milestones, track your analytics, and confidently apply for verified tech roles.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 5. TECHNOLOGIES WE USE ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-100/50 dark:bg-slate-900/10 border-b border-border-color dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Our Technical Foundation
            </span>
            <h2 className="text-3xl font-black text-dark-text tracking-tight">
              Technologies We Use
            </h2>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed">
              SkillForge AI is engineered utilizing a high-performance modern stack built for durability, responsiveness, and scale.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            
            {/* Next.js */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">Next.js</span>
            </div>

            {/* React */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
                <Workflow className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">React 19</span>
            </div>

            {/* TypeScript */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">TypeScript</span>
            </div>

            {/* Node.js */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">Node.js</span>
            </div>

            {/* Express */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">Express</span>
            </div>

            {/* MongoDB */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Database className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">MongoDB</span>
            </div>

            {/* TanStack Query */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">TanStack Query</span>
            </div>

            {/* AI Provider */}
            <div className="bg-white dark:bg-[#0c1220] p-5 rounded-xl border border-border-color dark:border-slate-800/50 text-center flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="font-bold text-xs text-dark-text">AI Provider</span>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. OUR CORE VALUES ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-color dark:border-slate-800/40">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-dark-text tracking-tight">
            Our Core Values
          </h2>
          <p className="mt-2 text-sm text-secondary-text leading-relaxed">
            The principles guiding our vision, software architecture, and roadmap curation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Innovation */}
          <div className="p-5 border border-border-color dark:border-slate-850 bg-white dark:bg-[#0c1220] rounded-xl flex flex-col gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-dark-text text-sm">Innovation First</h3>
            <p className="text-xxs text-secondary-text leading-relaxed">
              Harnessing state-of-the-art LLMs and heuristics to map skills correctly.
            </p>
          </div>

          {/* Accessibility */}
          <div className="p-5 border border-border-color dark:border-slate-850 bg-white dark:bg-[#0c1220] rounded-xl flex flex-col gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
              <Globe className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-dark-text text-sm">Accessibility</h3>
            <p className="text-xxs text-secondary-text leading-relaxed">
              Making structured, professional-grade technical knowledge open to all.
            </p>
          </div>

          {/* Continuous Learning */}
          <div className="p-5 border border-border-color dark:border-slate-850 bg-white dark:bg-[#0c1220] rounded-xl flex flex-col gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-dark-text text-sm">Continuous Growth</h3>
            <p className="text-xxs text-secondary-text leading-relaxed">
              Promoting software adaptability, iterative milestones, and skill upkeep.
            </p>
          </div>

          {/* Community */}
          <div className="p-5 border border-border-color dark:border-slate-850 bg-white dark:bg-[#0c1220] rounded-xl flex flex-col gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-dark-text text-sm">Community Powered</h3>
            <p className="text-xxs text-secondary-text leading-relaxed">
              Encouraging shared reviews, feedback cycles, and joint learning.
            </p>
          </div>

        </div>
      </section>

      {/* ─── 7. CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-t from-indigo-50/20 to-transparent dark:from-indigo-950/5 relative select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(79,70,229,0.04),transparent_40%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-text tracking-tight">
            Forge Your Career Path Today
          </h2>
          <p className="text-sm text-secondary-text max-w-xl leading-relaxed">
            Stop wandering through disjointed video guides. Let SkillForge AI assemble your target study roadmaps in seconds.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link href="/explore">
              <Button variant="primary" size="large" className="text-xs font-bold gap-2">
                Get Started Now
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="large" className="text-xs font-semibold bg-white dark:bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
