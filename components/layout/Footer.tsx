"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { Container, Flex } from "@/components/layout/Layouts";
import { cn } from "@/utils/cn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/40 select-none py-12 md:py-16 mt-auto">
      <Container>
        
        {/* ================= Top Grid Column Info ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
          
          {/* Logo & Description Column (Span 4/5) */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-5 items-center text-center sm:items-start sm:text-left">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative h-9 w-9 transition-transform group-hover:scale-[1.03]">
                <Image 
                  src="/assets/logo.png" 
                  alt="SkillForge AI Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SkillForge AI
              </span>
            </Link>
            
            <p className="text-xxs md:text-xs text-secondary-text leading-relaxed max-w-sm">
              Accelerate your engineering transition with personalized AI-generated learning roadmaps, interactive skill assessment quizzes, and 24/7 co-pilot chat mentoring.
            </p>

            {/* Social Icons with hover effects (Inline SVG definitions to bypass lucide brand exports differences) */}
            <Flex gap={3} className="mt-2 justify-center sm:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 text-secondary-text hover:text-[#24292e] hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-850/40 focus:outline-none transition-all shadow-xxs flex items-center justify-center"
                aria-label="SkillForge AI GitHub profile link"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 text-secondary-text hover:text-[#1da1f2] hover:bg-slate-50 dark:hover:text-[#1da1f2] dark:hover:bg-slate-850/40 focus:outline-none transition-all shadow-xxs flex items-center justify-center"
                aria-label="SkillForge AI Twitter profile link"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 text-secondary-text hover:text-[#0a66c2] hover:bg-slate-50 dark:hover:text-[#0a66c2] dark:hover:bg-slate-850/40 focus:outline-none transition-all shadow-xxs flex items-center justify-center"
                aria-label="SkillForge AI LinkedIn profile link"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-.79 1.75-1.764.783-1.764-1.75-1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border-color dark:border-slate-850 text-secondary-text hover:text-[#ff0000] hover:bg-slate-50 dark:hover:text-[#ff0000] dark:hover:bg-slate-850/40 focus:outline-none transition-all shadow-xxs flex items-center justify-center"
                aria-label="SkillForge AI YouTube channel link"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.043 0 12 0 12s0 3.957.502 5.837c.28 1.05.9 1.887 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.004 3.004 0 0 0 2.11-2.108C24 15.957 24 12 24 12s0-3.957-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </Flex>
          </div>

          {/* Quick Links Column (Span 2) */}
          <div className="flex flex-col gap-3.5 sm:col-span-1 lg:col-span-2 items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] font-bold text-dark-text uppercase tracking-widest">
              Quick Links
            </span>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link href="/" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Home
              </Link>
              <Link href="/explore" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Explore Paths
              </Link>
              <Link href="/about" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                About Us
              </Link>
              <Link href="/blog" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                News Blog
              </Link>
              <Link href="/contact" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Contact Page
              </Link>
            </div>
          </div>

          {/* Resources Column (Span 2) */}
          <div className="flex flex-col gap-3.5 sm:col-span-1 lg:col-span-2 items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] font-bold text-dark-text uppercase tracking-widest">
              Resources
            </span>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link href="/docs" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Documentation
              </Link>
              <Link href="/help" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Help Center
              </Link>
              <Link href="/status" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                API Status
              </Link>
              <Link href="/privacy" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xxs md:text-xs text-secondary-text hover:text-primary dark:hover:text-primary-light transition-all w-fit">
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Contact Information Column (Span 3) */}
          <div className="flex flex-col gap-3.5 sm:col-span-2 lg:col-span-3 items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] font-bold text-dark-text uppercase tracking-widest">
              Get in Touch
            </span>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <Flex align="center" gap={2} className="text-xxs md:text-xs text-secondary-text">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">support@skillforge.ai</span>
              </Flex>
              <Flex align="center" gap={2} className="text-xxs md:text-xs text-secondary-text">
                <MapPin className="h-4.5 w-4.5 text-secondary shrink-0" />
                <span>San Francisco, CA</span>
              </Flex>
            </div>
          </div>

        </div>

        {/* ================= Bottom copyright footer segment ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-color dark:border-slate-800/40 pt-8 gap-4 text-center sm:text-left">
          <span className="text-[11px] font-medium text-secondary-text">
            &copy; {currentYear} SkillForge AI. All rights reserved.
          </span>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <Link href="/privacy" className="text-[11px] font-semibold text-secondary-text hover:text-dark-text transition-all">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[11px] font-semibold text-secondary-text hover:text-dark-text transition-all">
              Terms of Service
            </Link>

            {/* Back to top button */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="p-2 rounded-lg border border-border-color dark:border-slate-850 text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-850/40 focus:outline-none transition-all shadow-xxs flex items-center justify-center"
              aria-label="Scroll back to top of viewport"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
}
