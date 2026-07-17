import FeaturedCareers from "@/components/shared/FeaturedCareers";
import FeaturesSection from "@/components/shared/FeaturesSection";
import StatsSection from "@/components/shared/StatsSection";
import AIFeaturesSection from "@/components/shared/AIFeaturesSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { Container, PageWrapper } from "@/components/layout/Layouts";
import { Compass } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16]">
      {/* Visual Hero Intro Banner */}
      <div className="bg-white dark:bg-[#090d16] py-16 border-b border-border-color dark:border-slate-800/30">
        <Container className="max-w-4xl text-center flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/20 text-primary mb-2">
            <Compass className="h-6 w-6 animate-spin text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-dark-text tracking-tight">
            SkillForge AI Workspace Foundation
          </h1>
          <p className="text-sm text-secondary-text max-w-2xl leading-relaxed">
            Welcome to the SkillForge AI frontend client. Explore technical configurations, interactive reusable components, design tokens, and modular custom hooks below.
          </p>
        </Container>
      </div>

      {/* Featured Career Paths Section */}
      <FeaturedCareers />

      {/* Platform Capabilities Section */}
      <FeaturesSection />

      {/* Platform Metrics Statistics Section */}
      <StatsSection />

      {/* AI Features Highlight Section */}
      <AIFeaturesSection />

      {/* Success Stories Testimonials Section */}
      <TestimonialsSection />
    </PageWrapper>
  );
}
