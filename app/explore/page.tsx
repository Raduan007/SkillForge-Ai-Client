"use client";

import * as React from "react";
import { SlidersHorizontal, X, LayoutGrid, Info, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, Section, Container, Grid, Flex } from "@/components/layout/Layouts";
import { SearchInput } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";

interface RoadmapMock {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  category: string;
  imageSrc: string;
}

export default function ExplorePage() {
  // Mobile drawer filter visibility state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);
  
  // Desktop sidebar visibility state (toggles layout between 3 and 4 columns grid!)
  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true);

  // Mock State Toggles (for visual reviews)
  const [isSkeleton, setIsSkeleton] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);

  // 12 Mock Careers Roadmap Data
  const mockRoadmaps: RoadmapMock[] = [
    {
      id: "rm-1",
      title: "Frontend Developer",
      description: "Master HTML, CSS, JavaScript, React, Tailwind CSS, and state libraries to build highly interactive client-side web applications.",
      difficulty: "Beginner",
      duration: "6 Months",
      rating: 4.8,
      category: "Frontend",
      imageSrc: "/careers/full-stack-developer.png",
    },
    {
      id: "rm-2",
      title: "Backend API Engineer",
      description: "Learn Node.js, Express, databases (SQL & NoSQL), API integrations, authorization systems, and server configuration guidelines.",
      difficulty: "Intermediate",
      duration: "7 Months",
      rating: 4.9,
      category: "Backend",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-3",
      title: "Data Science & AI Analyst",
      description: "Explore datasets, construct statistics pipelines, clean data, and deploy deep learning models using Python and TensorFlow.",
      difficulty: "Advanced",
      duration: "8 Months",
      rating: 4.9,
      category: "Data Science",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-4",
      title: "UI/UX Product Designer",
      description: "Learn graphic fundamentals, conduct research user interviews, wireframe paths, and create design systems inside Figma.",
      difficulty: "Beginner",
      duration: "4 Months",
      rating: 4.7,
      category: "Design",
      imageSrc: "/careers/ui-ux-designer.png",
    },
    {
      id: "rm-5",
      title: "Cloud & DevOps Architect",
      description: "Implement continuous integrations pipelines, dockerize systems, and manage Kubernetes clusters on AWS cloud environments.",
      difficulty: "Advanced",
      duration: "7 Months",
      rating: 4.9,
      category: "DevOps",
      imageSrc: "/careers/cloud-architect.png",
    },
    {
      id: "rm-6",
      title: "Mobile Apps Developer",
      description: "Construct native mobile platforms using React Native, manage phone storage, and deploy updates to iOS and Android App stores.",
      difficulty: "Intermediate",
      duration: "6 Months",
      rating: 4.6,
      category: "Mobile",
      imageSrc: "/careers/full-stack-developer.png",
    },
    {
      id: "rm-7",
      title: "Cybersecurity Specialist",
      description: "Audit security protocols, scan network vulnerabilities, patch servers, and verify encryption compliance across web configurations.",
      difficulty: "Intermediate",
      duration: "5 Months",
      rating: 4.8,
      category: "Security",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-8",
      title: "DevSecOps Engineer",
      description: "Secure deploy pipelines, write automated test cases, scan build files, and manage identity configurations on Kubernetes setups.",
      difficulty: "Advanced",
      duration: "8 Months",
      rating: 4.9,
      category: "DevOps",
      imageSrc: "/careers/cloud-architect.png",
    },
    {
      id: "rm-9",
      title: "Machine Learning Engineer",
      description: "Train complex deep neural networks, optimize model latency, build vector database systems, and integrate generative LLM interfaces.",
      difficulty: "Advanced",
      duration: "9 Months",
      rating: 4.9,
      category: "Data Science",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-10",
      title: "Technical Product Manager",
      description: "Coordinate development sprints, write engineering requirement documents, draft user profiles, and audit feature KPI analytics.",
      difficulty: "Beginner",
      duration: "3 Months",
      rating: 4.5,
      category: "Product",
      imageSrc: "/careers/ui-ux-designer.png",
    },
    {
      id: "rm-11",
      title: "Quality Assurance Analyst",
      description: "Write automated E2E test scripts, perform regression audits, write error reports, and confirm performance metric passes.",
      difficulty: "Beginner",
      duration: "4 Months",
      rating: 4.6,
      category: "QA",
      imageSrc: "/careers/full-stack-developer.png",
    },
    {
      id: "rm-12",
      title: "Solutions Enterprise Architect",
      description: "Design cloud scaling layouts, map high-availability structures, audit platform security frameworks, and direct resource migration.",
      difficulty: "Intermediate",
      duration: "6 Months",
      rating: 4.8,
      category: "Architect",
      imageSrc: "/careers/cloud-architect.png",
    },
  ];

  const handleCardDetails = (title: string) => {
    toast.success(`Details for "${title}" will load in the upcoming curriculum modules!`, {
      icon: "🎯",
      id: "card-details-toast",
    });
  };

  // Reusable Filter Sidebar Content Widget
  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Category Checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-dark-text uppercase tracking-wider">Career Domain</span>
        <div className="flex flex-col gap-2">
          {["Frontend", "Backend", "Data Science", "Design", "DevOps", "Mobile", "Security"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-xs text-secondary-text font-semibold cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border-color dark:bg-slate-800" />

      {/* Difficulty Checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-dark-text uppercase tracking-wider">Difficulty Level</span>
        <div className="flex flex-col gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <label key={level} className="flex items-center gap-2 text-xs text-secondary-text font-semibold cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border-color dark:bg-slate-800" />

      {/* Duration Checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-dark-text uppercase tracking-wider">Roadmap Duration</span>
        <div className="flex flex-col gap-2">
          {["Under 3 Months", "3-6 Months", "6+ Months"].map((dur) => (
            <label key={dur} className="flex items-center gap-2 text-xs text-secondary-text font-semibold cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span>{dur}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] select-none min-h-screen">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-[#090d16] py-10 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Flex justify="between" align="end" className="flex-wrap gap-4">
            <div className="flex flex-col gap-2.5 max-w-2xl">
              <h1 className="text-2xl font-black text-dark-text md:text-3xl lg:text-4xl tracking-tight leading-tight">
                Explore Learning Roadmaps
              </h1>
              <p className="text-xs text-secondary-text leading-relaxed">
                Find customized career pathways, generated by tech veterans and refined by artificial intelligence, to guide your developer transition.
              </p>
            </div>
            
            {/* Visual Review Toggles */}
            <Flex gap={3} className="bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-850 px-4 py-2 rounded-xl shadow-xxs flex-wrap">
              <Flex align="center" gap={2}>
                <span className="text-[10px] font-bold text-secondary-text">Skeletons:</span>
                <button
                  onClick={() => {
                    setIsSkeleton((prev) => !prev);
                    setIsEmpty(false);
                  }}
                  className={cn("relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none", isSkeleton ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}
                >
                  <span className={cn("pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-[2px] ml-[2px]", isSkeleton ? "translate-x-3.5" : "translate-x-0")} />
                </button>
              </Flex>
              <div className="w-[1px] bg-border-color dark:bg-slate-800 h-4" />
              <Flex align="center" gap={2}>
                <span className="text-[10px] font-bold text-secondary-text">Empty State:</span>
                <button
                  onClick={() => {
                    setIsEmpty((prev) => !prev);
                    setIsSkeleton(false);
                  }}
                  className={cn("relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none", isEmpty ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}
                >
                  <span className={cn("pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-[2px] ml-[2px]", isEmpty ? "translate-x-3.5" : "translate-x-0")} />
                </button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </div>

      <Section className="py-8 md:py-10">
        <Container>
          
          {/* ================= Top controls row ================= */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            
            {/* Search Input Placeholder */}
            <div className="flex-1 max-w-md">
              <SearchInput placeholder="Search career roadmaps..." />
            </div>

            {/* Sorting Dropdown & Desktop filters toggler */}
            <Flex align="center" gap={3} className="w-full md:w-auto">
              
              {/* Desktop Filters Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setShowDesktopFilters((prev) => !prev);
                  // Sync mobile menu drawer if screen wraps
                  setIsFilterDrawerOpen(false);
                }}
                className="hidden md:flex h-10 items-center justify-center gap-2 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-slate-900 px-4 text-xs font-bold text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all select-none"
              >
                <SlidersHorizontal className="h-4 w-4 text-secondary-text" />
                <span>{showDesktopFilters ? "Hide Filters" : "Show Filters"}</span>
              </button>

              {/* Sort Select components */}
              <div className="flex-1 md:w-56 md:flex-initial">
                <Select defaultValue="popular" aria-label="Sort roadmaps list select dropdown">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Paths</option>
                  <option value="difficulty-asc">Difficulty: Low to High</option>
                  <option value="difficulty-desc">Difficulty: High to Low</option>
                </Select>
              </div>

              {/* Mobile Filter Button toggle */}
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(true)}
                className="md:hidden flex h-10 items-center justify-center gap-2 rounded-lg border border-border-color dark:border-slate-800 bg-white dark:bg-slate-900 px-4 text-xs font-bold text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all select-none"
              >
                <SlidersHorizontal className="h-4 w-4 text-secondary-text" />
                <span>Filters</span>
              </button>
            </Flex>
          </div>

          {/* Results count label */}
          <div className="flex items-center justify-between border-b border-border-color dark:border-slate-800/40 pb-4 mb-6">
            <span className="text-xs font-bold text-secondary-text">
              {isEmpty ? "Showing 0 matches" : `Showing ${mockRoadmaps.length} career paths matched`}
            </span>
          </div>

          {/* ================= Main Layout Content Grid ================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Filter Sidebar Column (Span 3) */}
            {showDesktopFilters && (
              <aside className="hidden md:block md:col-span-3 bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 p-6 rounded-xl shadow-xs">
                <Flex align="center" gap={2} className="mb-5">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-black text-dark-text uppercase tracking-widest">Filters</span>
                </Flex>
                <FilterContent />
              </aside>
            )}

            {/* Results Grid Column (Span 9 or 12) */}
            <main className={cn(showDesktopFilters ? "md:col-span-9" : "md:col-span-12", "flex flex-col gap-8")}>
              
              {/* Dynamic Empty / Skeletons / Cards Content */}
              {isEmpty ? (
                /* Empty state render */
                <Card
                  isEmpty={true}
                  emptyIcon={Info}
                  emptyTitle="No Roadmaps Found"
                  emptyDescription="We couldn't find any career roadmaps matching your active filter configuration. Clear check boxes and try again."
                  className="py-16 border-dashed border-border-color dark:border-slate-800/50"
                />
              ) : (
                /* Card List grid */
                <div
                  className={cn(
                    "grid grid-cols-1 gap-5",
                    "sm:grid-cols-2",
                    showDesktopFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  )}
                >
                  {mockRoadmaps.map((roadmap) => (
                    <div key={roadmap.id} className="flex flex-col h-full w-full">
                      <Card
                        isSkeleton={isSkeleton}
                        imageSrc={roadmap.imageSrc}
                        imageAlt={roadmap.title}
                        title={roadmap.title}
                        description={roadmap.description}
                        metadata={[roadmap.difficulty, roadmap.duration, `★ ${roadmap.rating.toFixed(1)}`, roadmap.category]}
                        actionLabel="View Details"
                        onAction={() => handleCardDetails(roadmap.title)}
                        className="h-full border-border-color/60 dark:border-slate-800/40"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ================= Pagination Section Placeholder ================= */}
              {!isEmpty && (
                <Flex justify="center" align="center" gap={2} className="border-t border-border-color dark:border-slate-800/40 pt-6">
                  <button
                    type="button"
                    disabled
                    className="px-3.5 py-1.5 rounded-lg border border-border-color/60 dark:border-slate-800/30 text-xxs font-bold text-secondary-text bg-slate-50 dark:bg-slate-900/30 disabled:opacity-50 select-none cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button type="button" className="px-3.5 py-1.5 rounded-lg text-xxs font-bold text-white bg-primary">
                    1
                  </button>
                  <button type="button" className="px-3.5 py-1.5 rounded-lg border border-border-color dark:border-slate-800 text-xxs font-bold text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    2
                  </button>
                  <button type="button" className="px-3.5 py-1.5 rounded-lg border border-border-color dark:border-slate-800 text-xxs font-bold text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    3
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg border border-border-color dark:border-slate-800 text-xxs font-bold text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20"
                  >
                    Next
                  </button>
                </Flex>
              )}

            </main>
          </div>

        </Container>
      </Section>

      {/* ================= Mobile Filter Drawer Overlay ================= */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#090d16] shadow-xl z-55 p-6 flex flex-col gap-5 overflow-y-auto md:hidden"
            >
              <Flex justify="between" align="center" className="border-b border-border-color dark:border-slate-800 pb-3">
                <Flex align="center" gap={2}>
                  <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                  <span className="text-xs font-black text-dark-text uppercase tracking-widest">Filter Options</span>
                </Flex>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-850 text-secondary-text hover:text-dark-text transition-all"
                  aria-label="Close filters panel"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </Flex>

              {/* Sidebar Content drawer */}
              <div className="flex-1 mt-1">
                <FilterContent />
              </div>

              {/* Apply / Clear Buttons in drawer */}
              <Flex gap={3} className="border-t border-border-color dark:border-slate-800 pt-4 mt-auto">
                <Button
                  variant="outline"
                  size="medium"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 text-xs font-bold"
                >
                  Clear Filters
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 text-xs font-bold"
                >
                  Apply Filters
                </Button>
              </Flex>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
}
