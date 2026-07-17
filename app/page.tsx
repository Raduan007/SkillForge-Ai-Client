import HeroSection from "@/components/shared/HeroSection";
import FeaturedCareers from "@/components/shared/FeaturedCareers";
import FeaturesSection from "@/components/shared/FeaturesSection";
import StatsSection from "@/components/shared/StatsSection";
import AIFeaturesSection from "@/components/shared/AIFeaturesSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import CTASection from "@/components/shared/CTASection";
import { PageWrapper } from "@/components/layout/Layouts";

export default function Home() {
  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16]">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Featured Career Paths Section */}
      <FeaturedCareers />

      {/* 4. Platform Capabilities Features Section */}
      <FeaturesSection />

      {/* 5. Platform Metrics Statistics Section */}
      <StatsSection />

      {/* 6. AI Features Highlight Section */}
      <AIFeaturesSection />

      {/* 7. Success Stories Testimonials Section */}
      <TestimonialsSection />

      {/* 8. Frequently Asked Questions FAQ Section */}
      <FAQSection />

      {/* 9. Final Call-to-Action CTA Section */}
      <CTASection />
    </PageWrapper>
  );
}
