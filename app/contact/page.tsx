"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { toast } from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Briefcase,
  MessageSquare,
  Sparkles,
  Send,
} from "lucide-react";

// ─── Validation Schema ────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject is too long")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .trim(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── FAQ Seed Data ───────────────────────────────────────────────────────────

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "faq-1",
    trigger: "How does SkillForge AI generate career roadmaps?",
    content:
      "SkillForge AI utilizes a combination of advanced semantic search engines, aggregate industry-standard curriculum standards, and dynamic AI models to analyze roles. It then breaks down roles into specific, sequential learning nodes grouped by categories.",
  },
  {
    id: "faq-2",
    trigger: "Can I request custom categories or new roadmap topics?",
    content:
      "Yes! Registered users can use the 'Create Career Roadmap' feature under /items/add to custom-configure new roadmaps. You can define metadata tags, custom category titles, estimated study durations, and initial difficulty levels.",
  },
  {
    id: "faq-3",
    trigger: "How do the interactive copilot quizzes work?",
    content:
      "At each learning node within a career path, you can invoke the AI Quiz Copilot. The system dynamically reads the skill context and generates multiple-choice questions to test your conceptual and syntax comprehension in real-time.",
  },
  {
    id: "faq-4",
    trigger: "Is my personal data and training progress secure?",
    content:
      "Absolutely. All user profiles, authentication sequences, and local tokens are encrypted and stored utilizing secure MongoDB database standards. Progress markers and custom roadmaps are associated exclusively with your authenticated sub claim.",
  },
  {
    id: "faq-5",
    trigger: "How can I update my name or custom avatar settings?",
    content:
      "Once you log in, click on your profile icon in the navigation bar. You can view your current working context and update your avatar URL, names, or password credentials inside your settings profile tab.",
  },
];

export default function ContactPage() {
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  // ─── Form Handlers ──────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmittingForm(true);
    const loadingToastId = toast.loading("Sending your message...");

    try {
      // Simulate network request latency
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Submitted Contact Form Data:", data);

      toast.success("Thank you! Your message has been sent successfully.", {
        id: loadingToastId,
      });
      reset();
    } catch (err) {
      console.error("[ContactPage] Error:", err);
      toast.error("Failed to send message. Please try again later.", {
        id: loadingToastId,
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-200 select-none">
      
      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-border-color dark:border-slate-800/40 bg-gradient-to-b from-indigo-50/30 to-transparent dark:from-indigo-950/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.05),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-white dark:bg-[#0c1220] shadow-sm mb-5 animate-pulse">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xxs font-bold uppercase tracking-wider text-primary">
              We&apos;re Here to Help
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Get in Touch with SkillForge AI
          </h1>
          <p className="mt-4 text-base text-secondary-text max-w-xl mx-auto leading-relaxed">
            Have questions about customized roadmaps, enterprise access, or billing? Drop us a note, and our support team will reach out shortly.
          </p>
        </div>
      </section>

      {/* ─── 2. CONTACT INFORMATION & FORM ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-color dark:border-slate-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info Cards & Social Links (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-black text-dark-text tracking-tight mb-2">
                Contact Information
              </h2>
              <p className="text-xs text-secondary-text leading-relaxed">
                Connect with our core team or visit our office. Our standard response window is within 24 business hours.
              </p>
            </div>

            {/* Information Stack */}
            <div className="flex flex-col gap-4">
              
              {/* Email */}
              <div className="flex gap-4 p-4 rounded-xl border border-border-color dark:border-slate-800/50 bg-white dark:bg-[#0c1220] shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark-text">Support Email</span>
                  <a
                    href="mailto:support@skillforge.ai"
                    className="text-xs text-secondary-text hover:text-primary transition-all mt-0.5"
                  >
                    support@skillforge.ai
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-4 rounded-xl border border-border-color dark:border-slate-800/50 bg-white dark:bg-[#0c1220] shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark-text">Phone Support</span>
                  <span className="text-xs text-secondary-text mt-0.5">
                    +1 (800) 555-0199
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 p-4 rounded-xl border border-border-color dark:border-slate-800/50 bg-white dark:bg-[#0c1220] shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark-text">Office Address</span>
                  <span className="text-xs text-secondary-text mt-0.5 leading-relaxed">
                    100 Innovation Way, Suite 400, San Francisco, CA 94107
                  </span>
                </div>
              </div>

              {/* Clock */}
              <div className="flex gap-4 p-4 rounded-xl border border-border-color dark:border-slate-800/50 bg-white dark:bg-[#0c1220] shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-secondary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark-text">Working Hours</span>
                  <span className="text-xs text-secondary-text mt-0.5">
                    Monday - Friday, 9:00 AM - 6:00 PM PST
                  </span>
                </div>
              </div>

            </div>

            {/* Social Link Badges */}
            <div className="pt-4 border-t border-border-color dark:border-slate-800/40">
              <span className="text-xs font-bold text-dark-text block mb-3">
                Join our communities:
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-slate-800/30 text-secondary-text hover:text-dark-text text-xs transition-all"
                >
                  <Globe className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-slate-800/30 text-secondary-text hover:text-dark-text text-xs transition-all"
                >
                  <Briefcase className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-slate-800/30 text-secondary-text hover:text-dark-text text-xs transition-all"
                >
                  <Globe className="h-4 w-4" />
                  Twitter
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-slate-800/30 text-secondary-text hover:text-dark-text text-xs transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  Discord
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0c1220] p-6 sm:p-10 rounded-2xl border border-border-color dark:border-slate-800/50 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(79,70,229,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <h2 className="text-xl font-black text-dark-text tracking-tight mb-6">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              
              {/* Name */}
              <Input
                label="Your Full Name"
                placeholder="John Doe"
                error={errors.name?.message}
                disabled={isSubmittingForm}
                {...register("name")}
              />

              {/* Email */}
              <Input
                label="Your Email Address"
                placeholder="john.doe@example.com"
                type="email"
                error={errors.email?.message}
                disabled={isSubmittingForm}
                {...register("email")}
              />

              {/* Subject */}
              <Input
                label="Message Subject"
                placeholder="Roadmap customization, pricing, bug report..."
                error={errors.subject?.message}
                disabled={isSubmittingForm}
                {...register("subject")}
              />

              {/* Message */}
              <Textarea
                label="Your Message"
                placeholder="Type your message in detail here..."
                className="min-h-[140px]"
                error={errors.message?.message}
                disabled={isSubmittingForm}
                {...register("message")}
              />

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  isLoading={isSubmittingForm}
                  className="w-full text-xs font-bold gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ─── 3. FAQ SECTION (Bottom) ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-dark-text tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-secondary-text leading-relaxed">
            Find immediate answers regarding platform mechanics, roadmaps, and account customization.
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#0c1220] p-6 rounded-2xl border border-border-color dark:border-slate-800/50 shadow-sm">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

    </div>
  );
}
