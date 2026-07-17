"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Flex } from "@/components/layout/Layouts";
import { cn } from "@/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav
      aria-label="Breadcrumb navigation tracker"
      className={cn("flex select-none py-1.5", className)}
    >
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2 text-[10px] md:text-xxs font-bold text-secondary-text">
        
        {/* Home Item (Always first prefix) */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {/* Dynamic Items Mapping */}
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <React.Fragment key={idx}>
              {/* Separator chevron */}
              <li className="flex items-center" aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-700 shrink-0" />
              </li>

              {/* Breadcrumb path element */}
              <li className="flex items-center">
                {isLast || !item.href ? (
                  // Current Item or Unlinked Route
                  <span
                    aria-current="page"
                    className="text-dark-text font-black max-w-[150px] md:max-w-xs truncate"
                  >
                    {item.label}
                  </span>
                ) : (
                  // Clickable Link Item
                  <Link
                    href={item.href}
                    className="hover:text-primary dark:hover:text-primary-light transition-colors max-w-[100px] md:max-w-xs truncate"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}

      </ol>
    </nav>
  );
};
