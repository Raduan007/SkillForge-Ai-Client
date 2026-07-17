"use client";

import * as React from "react";
import { Users, Map, Sparkles, TrendingUp, Globe } from "lucide-react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { Container, Section, Grid, Flex } from "@/components/layout/Layouts";
import { cn } from "@/utils/cn";

// Sub-component: Animated Counter
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.8,
  suffix = "",
  decimals = 0,
}) => {
  const count = useMotionValue(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  React.useEffect(() => {
    return count.on("change", (latest) => {
      if (ref.current) {
        const formatted = decimals > 0
          ? latest.toFixed(decimals)
          : Math.round(latest).toLocaleString();
        ref.current.textContent = formatted + suffix;
      }
    });
  }, [count, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// Main Stats Section
interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  decimals?: number;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
}

export default function StatsSection() {
  const stats: StatItem[] = [
    {
      id: "students",
      label: "Active Students",
      targetValue: 45000,
      suffix: "+",
      icon: Users,
      colorClass: "text-primary",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100/40 dark:border-indigo-900/10",
    },
    {
      id: "roadmaps",
      label: "Roadmaps Generated",
      targetValue: 120000,
      suffix: "+",
      icon: Map,
      colorClass: "text-secondary",
      bgClass: "bg-amber-50 dark:bg-amber-950/20 border-amber-100/40 dark:border-amber-900/10",
    },
    {
      id: "ai-gens",
      label: "AI Node Generations",
      targetValue: 850000,
      suffix: "+",
      icon: Sparkles,
      colorClass: "text-amber-500",
      bgClass: "bg-amber-50 dark:bg-amber-950/20 border-amber-100/40 dark:border-amber-900/10",
    },
    {
      id: "success-rate",
      label: "Quiz Pass Rate",
      targetValue: 94.6,
      suffix: "%",
      decimals: 1,
      icon: TrendingUp,
      colorClass: "text-primary",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100/40 dark:border-indigo-900/10",
    },
    {
      id: "community",
      label: "Global Members",
      targetValue: 28000,
      suffix: "+",
      icon: Globe,
      colorClass: "text-secondary",
      bgClass: "bg-amber-50 dark:bg-amber-950/20 border-amber-100/40 dark:border-amber-900/10",
    },
  ];

  return (
    <Section className="bg-neutral-bg dark:bg-[#090d16] border-t border-border-color dark:border-slate-800/30 select-none py-12 md:py-16">
      <Container>
        
        {/* ================= Grid Layout Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={cn(
                "flex flex-col items-center text-center p-5 rounded-xl border bg-white dark:bg-[#090d16] shadow-xs hover:shadow-md transition-all duration-300",
                "border-border-color/60 dark:border-slate-850/40"
              )}
            >
              {/* Rounded icon container */}
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border mb-3.5", stat.bgClass)}>
                <stat.icon className={cn("h-5.5 w-5.5", stat.colorClass)} />
              </div>

              {/* Counter Value */}
              <span className="text-xl md:text-2xl font-black text-dark-text tracking-tight mb-1">
                <AnimatedCounter
                  value={stat.targetValue}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </span>

              {/* Description Label */}
              <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
