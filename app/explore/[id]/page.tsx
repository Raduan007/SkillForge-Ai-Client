"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Award, BookOpen, Share2, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { PageWrapper, Section, Container, Flex, Grid } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";

interface RoadmapDetail {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription: string;
  skills: string[];
  outcomes: string[];
  imageSrc: string;
  modulesCount: number;
  projectsCount: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoadmapDetailsPage({ params }: PageProps) {
  // Unwrap Next.js 16 dynamic route parameters
  const { id } = React.use(params);

  // Simulated related loading state
  const [isRelatedLoading, setIsRelatedLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsRelatedLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [id]);

  // Related Roadmaps Db
  const relatedDb = [
    {
      id: "rm-1",
      title: "Frontend Developer",
      difficulty: "Beginner" as const,
      duration: "6 Months",
      rating: 4.8,
      category: "Frontend",
      imageSrc: "/careers/full-stack-developer.png",
    },
    {
      id: "rm-2",
      title: "Backend API Engineer",
      difficulty: "Intermediate" as const,
      duration: "7 Months",
      rating: 4.9,
      category: "Backend",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-3",
      title: "Data Science & AI Analyst",
      difficulty: "Advanced" as const,
      duration: "8 Months",
      rating: 4.9,
      category: "Data Science",
      imageSrc: "/careers/data-scientist.png",
    },
    {
      id: "rm-4",
      title: "UI/UX Product Designer",
      difficulty: "Beginner" as const,
      duration: "4 Months",
      rating: 4.7,
      category: "Design",
      imageSrc: "/careers/ui-ux-designer.png",
    },
    {
      id: "rm-5",
      title: "Cloud & DevOps Architect",
      difficulty: "Advanced" as const,
      duration: "7 Months",
      rating: 4.9,
      category: "DevOps",
      imageSrc: "/careers/cloud-architect.png",
    },
  ];

  const relatedRoadmaps = relatedDb.filter((rm) => rm.id !== id).slice(0, 4);

  // 12 Mock Detailed Roadmaps mapping
  const roadmapsDb: Record<string, RoadmapDetail> = {
    "rm-1": {
      id: "rm-1",
      title: "Frontend Developer Roadmap",
      category: "Frontend",
      difficulty: "Beginner",
      duration: "6 Months",
      rating: 4.8,
      reviewsCount: 1240,
      shortDescription: "Master HTML, CSS, JavaScript, React, Tailwind CSS, and state libraries to build highly interactive client-side web applications.",
      fullDescription: "Become a proficient frontend developer. This pathway guides you from absolute code layout structures up through configuring component architectures inside modern React systems. You will learn to write semantic HTML markup, manage complex typography variables, style layouts using CSS Grid and Flexbox, write asynchronous JS API requests, and optimize client-side bundle performance.",
      skills: ["Semantic HTML5 & DOM API", "CSS Flexbox & CSS Grid", "JavaScript (ES6+) & Async/Await", "React Framework & Hooks", "Tailwind CSS Styling", "State Management (Redux/Zustand)", "Git & Collaborative Version Control", "Webpack & Vite Bundle Tools"],
      outcomes: [
        "Build responsive, pixel-perfect websites conforming to Figma visual layouts.",
        "Manage application states dynamically with Redux Toolkit or Zustand.",
        "Configure, deploy, and inspect client-side bundles on hosting platforms like Vercel.",
        "Audit and optimize site performance score indicators to hit 95+ Lighthouse metrics."
      ],
      imageSrc: "/careers/full-stack-developer.png",
      modulesCount: 16,
      projectsCount: 8,
    },
    "rm-2": {
      id: "rm-2",
      title: "Backend API Engineer",
      category: "Backend",
      difficulty: "Intermediate",
      duration: "7 Months",
      rating: 4.9,
      reviewsCount: 940,
      shortDescription: "Learn Node.js, Express, databases (SQL & NoSQL), API integrations, authorization systems, and server configuration guidelines.",
      fullDescription: "Construct resilient backends. This curriculum is designed to explore the server architectures that power modern web platforms. You will learn how to initialize server ports, map REST API routes, secure endpoints with JWT validations, construct database models, write queries, and dockerize systems to deploy onto cloud nodes.",
      skills: ["Node.js & Express Framework", "SQL Databases (PostgreSQL)", "NoSQL Databases (MongoDB)", "RESTful API Design Standards", "GraphQL Schemas", "Authentication (JWT & OAuth)", "Docker Containerization", "Jest Integration Testing"],
      outcomes: [
        "Create scalable API backend microservices supporting high concurrency.",
        "Implement secure, stateless authentication tokens and cookie schemes.",
        "Design relational database schemas with complex joins and indexes.",
        "Write integration test suites covering API router path scenarios."
      ],
      imageSrc: "/careers/data-scientist.png",
      modulesCount: 14,
      projectsCount: 6,
    },
    "rm-3": {
      id: "rm-3",
      title: "Data Science & AI Analyst",
      category: "Data Science",
      difficulty: "Advanced",
      duration: "8 Months",
      rating: 4.9,
      reviewsCount: 780,
      shortDescription: "Explore datasets, construct statistics pipelines, clean data, and deploy deep learning models using Python and TensorFlow.",
      fullDescription: "Deep dive into data mining. You will study statistical mathematical paradigms, program complex pipelines, train neural networks, and extract patterns to drive corporate intelligence decisions.",
      skills: ["Python (Pandas, NumPy)", "Data Cleaning & Wrangling", "Statistical Calculations", "Scikit-Learn Classifiers", "TensorFlow & PyTorch Models", "SQL Queries & Aggregations", "Data Visualization (Matplotlib)", "Jupyter Labs Workflows"],
      outcomes: [
        "Construct data wrangling scripts to clean and parse messy raw logs.",
        "Train predictive machine learning classifiers to forecast metrics.",
        "Evaluate model performance metrics (precision, recall, ROC-AUC).",
        "Deploy model files behind API endpoints for client integrations."
      ],
      imageSrc: "/careers/data-scientist.png",
      modulesCount: 18,
      projectsCount: 10,
    },
    "rm-4": {
      id: "rm-4",
      title: "UI/UX Product Designer",
      category: "Design",
      difficulty: "Beginner",
      duration: "4 Months",
      rating: 4.7,
      reviewsCount: 1120,
      shortDescription: "Learn graphic fundamentals, conduct research user interviews, wireframe paths, and create design systems inside Figma.",
      fullDescription: "Design intuitive interfaces. This pathway guides you through graphic layouts, user interface typography, component layouts, wireframing prototypes, and performing usability testing with real users.",
      skills: ["User Experience Research", "Wireframing & Prototyping", "Design System Components", "Typography & Color Hierarchies", "Figma Advanced Features", "Usability Audit & Testing", "Visual Hierarchy Mappings", "Developer Handoff Workflows"],
      outcomes: [
        "Conduct user research interviews and compile persona profiles.",
        "Construct high-fidelity interactive visual prototypes in Figma.",
        "Maintain scalable design systems using Figma variables and auto layouts.",
        "Design visual guidelines for landing screens, checkout processes, and dashboards."
      ],
      imageSrc: "/careers/ui-ux-designer.png",
      modulesCount: 12,
      projectsCount: 5,
    },
    "rm-5": {
      id: "rm-5",
      title: "Cloud & DevOps Architect",
      category: "DevOps",
      difficulty: "Advanced",
      duration: "7 Months",
      rating: 4.9,
      reviewsCount: 650,
      shortDescription: "Implement continuous integrations pipelines, dockerize systems, and manage Kubernetes clusters on AWS cloud environments.",
      fullDescription: "Automate system operations. Learn to configure auto-scaling cloud compute clusters, trace performance logs, manage networks, and secure server accesses using modern automation script languages.",
      skills: ["AWS Cloud Components", "Docker Container Engines", "Kubernetes Orchestrations", "CI/CD (GitHub Actions/Jenkins)", "Infrastructure as Code (Terraform)", "Linux System Administrations", "Prometheus & Grafana Logs", "Network Configurations & VPCs"],
      outcomes: [
        "Provision cloud resources dynamically using Terraform state files.",
        "Configure automated pipelines to build, test, and host applications.",
        "Deploy highly available, auto-scaling Kubernetes cluster structures.",
        "Diagnose cluster bottlenecks using Grafana metrics dashboards."
      ],
      imageSrc: "/careers/cloud-architect.png",
      modulesCount: 15,
      projectsCount: 7,
    }
  };

  // Fallback default roadmap if ID matches another segment
  const defaultRoadmap: RoadmapDetail = {
    id: id || "rm-default",
    title: "Technical Solutions Architect",
    category: "Solutions Architecture",
    difficulty: "Advanced",
    duration: "6 Months",
    rating: 4.8,
    reviewsCount: 420,
    shortDescription: "Design enterprise cloud scaling layouts, map highly-available microservice divisions, and audit security compliance scopes.",
    fullDescription: "Model enterprise systems. Learn how to map high-level visual server layouts, coordinate migration pipelines, audit security parameters, and plan load-balancing architectures to host high-concurrency systems.",
    skills: ["System Architecture Design", "Microservices Design", "Cloud Infrastructure (AWS/GCP)", "Enterprise Database Sharding", "Network Latency Optimizations", "High-Availability Deployments", "Regulatory Compliance (GDPR/HIPAA)", "Load Balancing & Caching Strategies"],
    outcomes: [
      "Draft visual blueprints representing scalable microservice architectures.",
      "Design multi-region cloud cluster maps to guarantee 99.99% uptime.",
      "Implement relational database sharding configurations to handle high volumes.",
      "Optimize data caching schemes using Redis to lower latency metrics."
    ],
    imageSrc: "/careers/cloud-architect.png",
    modulesCount: 16,
    projectsCount: 6,
  };

  // Resolve matching DB key or default fallback
  const roadmap = roadmapsDb[id] || defaultRoadmap;

  const handleEnroll = () => {
    toast.success(`Successfully enrolled in "${roadmap.title}"! Course assets have been loaded.`, {
      icon: "🎉",
      id: "enroll-toast",
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Share link copied to clipboard!", {
        id: "share-toast",
      });
    }
  };

  // Difficulty styling configurations
  const getDifficultyColor = (level: RoadmapDetail["difficulty"]) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30";
      case "Intermediate":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30";
      case "Advanced":
        return "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30";
    }
  };

  return (
    <PageWrapper className="bg-slate-50 dark:bg-[#090d16] select-none min-h-screen">
      
      {/* 1. Details Header Navigation Bar */}
      <div className="bg-white dark:bg-[#090d16] py-5 border-b border-border-color dark:border-slate-800/30">
        <Container>
          <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-text hover:text-primary dark:hover:text-primary-light transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Explorer</span>
          </Link>
        </Container>
      </div>

      <Section className="py-8 md:py-12">
        <Container>
          
          {/* ================= Main Layout Details Grid ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content column (Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Main Content card */}
              <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
                
                {/* Path Category badge */}
                <Flex align="center" gap={2}>
                  <span className="text-[10px] font-bold text-primary dark:text-primary-light bg-blue-50 dark:bg-blue-950/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {roadmap.category}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-bold text-secondary-text">Self-Paced Track</span>
                </Flex>

                {/* Main Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-dark-text tracking-tight leading-tight">
                  {roadmap.title}
                </h1>

                {/* Metadata badges row */}
                <Flex align="center" gap={4} className="flex-wrap text-xxs font-bold text-secondary-text pb-4 border-b border-border-color dark:border-slate-800/30">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 ${getDifficultyColor(roadmap.difficulty)}`}>
                    {roadmap.difficulty}
                  </span>
                  
                  <Flex align="center" gap={1}>
                    <Clock className="h-4 w-4 text-secondary-text" />
                    <span>{roadmap.duration}</span>
                  </Flex>

                  <Flex align="center" gap={1} className="text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-dark-text">{roadmap.rating.toFixed(1)}</span>
                    <span className="text-secondary-text">({roadmap.reviewsCount} reviews)</span>
                  </Flex>
                </Flex>

                {/* Section: Full description */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Curriculum Overview</span>
                  </h2>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    {roadmap.fullDescription}
                  </p>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-800/40" />

                {/* Section: Skills you'll learn */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Skills You will Master</span>
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {roadmap.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-bold text-dark-text bg-slate-50 dark:bg-slate-900 border border-border-color dark:border-slate-800 px-3 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-800/40" />

                {/* Section: Learning outcomes */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-black text-dark-text uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-emerald-500" />
                    <span>Learning Accomplishments</span>
                  </h2>

                  <div className="flex flex-col gap-3">
                    {roadmap.outcomes.map((outcome, idx) => (
                      <Flex key={idx} align="start" gap={2}>
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span className="text-xs text-secondary-text leading-normal">{outcome}</span>
                      </Flex>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card Panel Column (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              
              {/* Visual Preview Box */}
              <div className="bg-white dark:bg-[#090d16] border border-border-color dark:border-slate-800/40 rounded-2xl p-6 shadow-md flex flex-col gap-5">
                
                {/* Custom Tech Badge Illustration Graphic (CSS based) */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/15 flex items-center justify-center border border-border-color dark:border-slate-850">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white dark:bg-slate-900 border border-border-color dark:border-slate-850 flex items-center justify-center text-primary shadow-md">
                      <Award className="h-8 w-8 animate-pulse text-primary" />
                    </div>
                    <span className="text-xs font-black text-dark-text tracking-wide">{roadmap.title}</span>
                    <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider">{roadmap.category} Badge</span>
                  </div>

                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 px-2 py-0.5 text-[9px] font-bold text-secondary">
                    <ShieldCheck className="h-3 w-3" />
                    <span>AI-Verified</span>
                  </div>
                </div>

                {/* Roadmap Quick Stats */}
                <div className="flex flex-col gap-3 py-2">
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Timelines:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.duration}</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Curriculum Modules:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.modulesCount} modules</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs border-b border-slate-50 dark:border-slate-850 pb-2">
                    <span className="text-secondary-text font-bold">Practical Projects:</span>
                    <span className="text-dark-text font-extrabold">{roadmap.projectsCount} builds</span>
                  </Flex>
                  <Flex align="center" justify="between" className="text-xs">
                    <span className="text-secondary-text font-bold">Milestone Badges:</span>
                    <span className="text-dark-text font-extrabold">1 verified badge</span>
                  </Flex>
                </div>

                {/* Primary CTA Action triggers */}
                <div className="flex flex-col gap-2.5">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleEnroll}
                    className="w-full text-xs font-black shadow-md shadow-primary/10 py-3"
                  >
                    Enroll in Pathway
                  </Button>
                  <Button
                    variant="outline"
                    size="large"
                    onClick={handleShare}
                    className="w-full text-xs font-bold border border-border-color dark:border-slate-800 text-dark-text flex items-center justify-center gap-1.5 py-3"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Roadmap</span>
                  </Button>
                </div>

              </div>

            </div>

          </div>

        </Container>
      </Section>

      {/* ================= 2. Related Roadmaps Section ================= */}
      <Section className="border-t border-border-color dark:border-slate-850/60 bg-slate-50 dark:bg-[#070b12] py-12 md:py-16 select-none">
        <Container>
          
          {/* Section heading */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-widest">
              Curriculum Paths
            </span>
            <h2 className="text-xl md:text-2xl font-black text-dark-text tracking-tight">
              Related Roadmaps
            </h2>
          </div>

          {/* Cards Grid */}
          <Grid cols={1} colsSm={2} colsLg={4} gap={5}>
            {relatedRoadmaps.map((rm) => (
              <Link href={`/explore/${rm.id}`} key={rm.id} className="flex flex-col h-full w-full">
                <Card
                  isSkeleton={isRelatedLoading}
                  imageSrc={rm.imageSrc}
                  imageAlt={rm.title}
                  title={rm.title}
                  description=""
                  metadata={[rm.difficulty, rm.duration, `★ ${rm.rating.toFixed(1)}`, rm.category]}
                  actionLabel="View Details"
                  className="h-full cursor-pointer border-border-color/60 dark:border-slate-800/40"
                />
              </Link>
            ))}
          </Grid>

        </Container>
      </Section>

    </PageWrapper>
  );
}
