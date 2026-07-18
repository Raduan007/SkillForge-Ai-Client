"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useFeaturedRoadmaps } from "@/hooks/useRoadmaps";
import { Card } from "@/components/ui/Card";
import { Container, Section, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";

export default function FeaturedCareers() {
  const router = useRouter();

  // Fetch real featured roadmaps from backend via TanStack Query
  const { data: featuredRoadmaps = [], isLoading, isError } = useFeaturedRoadmaps();

  // Limit displayed items to 4 on the client
  const displayedRoadmaps = featuredRoadmaps.slice(0, 4);

  const showSkeletons = isLoading;

  return (
    <Section className="bg-neutral-bg dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none">
      <Container>
        
        {/* ================= Header Title ================= */}
        <Flex justify="between" align="end" className="mb-10 flex-wrap gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight">
              Featured Career Paths
            </h2>
            <p className="text-xs text-secondary-text leading-relaxed">
              Explore our customized learning journeys designed by tech veterans. Select a roadmap, pass assessments, and get hired.
            </p>
          </div>
        </Flex>

        {/* ================= Grid Layout Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showSkeletons ? (
            // Render 4 skeleton loaders
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col h-full w-full">
                <Card
                  isSkeleton={true}
                  className="h-full border-border-color/60 dark:border-slate-800/40"
                />
              </div>
            ))
          ) : isError || displayedRoadmaps.length === 0 ? (
            // Graceful fallback for empty/error state
            <div className="col-span-full py-8 text-center text-xs text-secondary-text">
              No featured roadmaps found. Create or feature one on the dashboard!
            </div>
          ) : (
            // Render actual roadmaps using reused Card component
            displayedRoadmaps.map((roadmap) => (
              <div key={roadmap._id} className="flex flex-col h-full w-full">
                <Card
                  isSkeleton={false}
                  imageSrc={roadmap.coverImage}
                  imageAlt={roadmap.title}
                  title={roadmap.title}
                  description={roadmap.shortDescription}
                  metadata={[
                    roadmap.difficulty,
                    roadmap.duration,
                    `★ ${roadmap.rating.toFixed(1)}`,
                    roadmap.category
                  ]}
                  actionLabel="View Details"
                  onAction={() => router.push(`/explore/${roadmap.slug}`)}
                  className="h-full border-border-color/60 dark:border-slate-800/40"
                />
              </div>
            ))
          )}
        </div>

        {/* ================= View All Roadmaps CTA Button ================= */}
        <Flex justify="center" className="mt-12">
          <Button
            onClick={() => router.push("/explore")}
            variant="primary"
            size="medium"
            className="text-xs font-bold px-8 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            View All Roadmaps
          </Button>
        </Flex>

      </Container>
    </Section>
  );
}
