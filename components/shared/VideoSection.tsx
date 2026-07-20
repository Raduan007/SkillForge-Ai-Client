"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <Section className="bg-slate-50 dark:bg-[#0c1220] py-16 md:py-24 select-none relative overflow-hidden">
      <Container>
        <Flex direction="col" align="center" className="text-center mb-12 gap-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-black text-dark-text md:text-4xl tracking-tight leading-tight"
          >
            See SkillForge AI in Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-secondary-text max-w-2xl leading-relaxed"
          >
            Watch how our platform instantly generates interactive, step-by-step career roadmaps customized exactly to your technical background.
          </motion.p>
        </Flex>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border-color/60 dark:border-slate-800/60 bg-slate-900 group cursor-pointer"
        >
          {/* Placeholder tech video */}
          <video
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            src="https://cdn.pixabay.com/video/2020/07/22/45366-443324684_large.mp4" 
            autoPlay
            loop
            muted
            playsInline
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none">
             <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary/90 group-hover:border-primary transition-all duration-300">
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white fill-white ml-1" />
             </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
