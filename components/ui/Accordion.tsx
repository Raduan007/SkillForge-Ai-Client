"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// Accordion Single Item Interfaces
export interface AccordionItem {
  id: string;
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("flex flex-col gap-3.5 w-full", className)}>
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        const triggerId = `accordion-trigger-${item.id}`;
        const contentId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-border-color dark:border-slate-800/40 bg-white dark:bg-[#090d16] overflow-hidden transition-all shadow-xs"
          >
            {/* Header Trigger */}
            <button
              id={triggerId}
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isExpanded}
              aria-controls={contentId}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-dark-text hover:text-primary dark:hover:text-primary-light focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-850/20 transition-all gap-4"
            >
              <span>{item.trigger}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-secondary-text shrink-0 transition-transform duration-300",
                  isExpanded && "rotate-180 text-primary"
                )}
              />
            </button>

            {/* Content Drawer panel */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-0.5 text-xs text-secondary-text leading-relaxed border-t border-slate-50 dark:border-slate-850/30">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
