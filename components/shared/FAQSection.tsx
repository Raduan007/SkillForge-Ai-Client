"use client";

import * as React from "react";
import Link from "next/link";
import { HelpCircle, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

export default function FAQSection() {
  const faqItems: AccordionItem[] = [
    {
      id: "faq-1",
      trigger: "How does the AI roadmap generator construct my learning path?",
      content: "The generator processes your target technical role, experience background, and weekly availability constraints. It filters curriculum topics, recommends free high-quality documentation and video assets, and drafts custom projects to guide you sequentially.",
    },
    {
      id: "faq-2",
      trigger: "Are the platform certification badges verifiable?",
      content: "Yes. Completing all module quizzes and milestone project challenges unlocks a verified digital credential badge on your profile. These badges can be exported directly to your LinkedIn profile or resume.",
    },
    {
      id: "faq-3",
      trigger: "Can I use the AI co-pilot assistant for free?",
      content: "All registered members get access to standard monthly tokens to chat with the AI assistant beside roadmap nodes and quizzes. Pro tiers offer unlimited co-pilot chat access and deep resume reviews.",
    },
    {
      id: "faq-4",
      trigger: "What happens if I fail a roadmap quiz assessment?",
      content: "Quizzes are designed to reinforce retention. If you do not pass, the AI assistant analyzes your incorrect questions to summarize the exact review topics you need, letting you study and retry the quiz immediately.",
    },
    {
      id: "faq-5",
      trigger: "Can I adjust or customize an active roadmap?",
      content: "Absolutely. You can edit nodes, append custom topics, adjust weekly duration limits, or re-route paths dynamically from your roadmap manager settings page as your goals evolve.",
    },
    {
      id: "faq-6",
      trigger: "How do milestone portfolio projects work?",
      content: "Every learning phase concludes with a project challenge. We outline strict engineering requirements. You write the project code locally, test it, and upload the repository URL to trigger automated lint and structure checks.",
    },
  ];

  return (
    <Section className="bg-white dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none">
      <Container className="max-w-3xl">
        
        {/* ================= Header Title ================= */}
        <Flex direction="col" align="center" className="text-center mb-10 gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/20 text-primary mb-1 animate-pulse">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-secondary-text max-w-xl leading-relaxed">
            Got questions about roadmaps, career matching quizzes, or AI mentoring credits? Find answers below.
          </p>
        </Flex>

        {/* ================= Accordion List ================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <Accordion items={faqItems} />
        </motion.div>

        {/* ================= Still Have Questions Box ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-2xl border border-border-color dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-850/10 text-center flex flex-col items-center gap-3.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/30 text-primary">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-extrabold text-dark-text">Still have questions?</h3>
            <p className="text-xxs text-secondary-text leading-normal max-w-md">
              Can&apos;t find the answers you&apos;re looking for? Reach out directly to our student support team for assistance.
            </p>
          </div>
          <Link href="/contact" passHref legacyBehavior>
            <Button
              variant="outline"
              size="medium"
              className="text-xs font-bold border border-border-color dark:border-slate-800 hover:bg-primary hover:text-white dark:hover:text-[#090d16] dark:hover:bg-primary-light hover:border-transparent flex items-center justify-center gap-1.5 transition-all mt-1"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>

      </Container>
    </Section>
  );
}
