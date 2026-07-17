"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Flex } from "@/components/layout/Layouts";
import { cn } from "@/utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // Navigation boundaries safety
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrev = () => {
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  // Generate pagination items for Desktop
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Always include page 1
    pages.push(1);

    // Left ellipsis
    if (currentPage > 3) {
      pages.push("ellipsis-left");
    }

    // Surrounding pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push("ellipsis-right");
    }

    // Always include last page (if totalPages > 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn("w-full select-none", className)}>
      
      {/* 1. Desktop Pagination Layout */}
      <div className="hidden sm:flex items-center justify-between border-t border-border-color dark:border-slate-850 pt-6">
        
        {/* Results indicator */}
        <span className="text-xxs font-semibold text-secondary-text">
          Showing page {currentPage} of {totalPages}
        </span>

        {/* Action button grids */}
        <Flex align="center" gap={2}>
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirstPage}
            className={cn(
              "inline-flex h-8.5 px-3 items-center justify-center gap-1.5 rounded-lg border border-border-color dark:border-slate-800 text-xxs font-bold text-dark-text bg-white dark:bg-slate-900 transition-colors",
              isFirstPage ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
            )}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          {/* Numbers list */}
          <Flex align="center" gap={1}>
            {getPageNumbers().map((item, idx) => {
              if (item === "ellipsis-left" || item === "ellipsis-right") {
                return (
                  <div
                    key={`${item}-${idx}`}
                    className="flex h-8.5 w-8.5 items-center justify-center text-secondary-text"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                );
              }

              const pageNum = item as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "h-8.5 w-8.5 text-xxs font-bold rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-white font-extrabold shadow-sm shadow-primary/10"
                      : "border border-border-color dark:border-slate-800 text-dark-text bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/20"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </Flex>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isLastPage}
            className={cn(
              "inline-flex h-8.5 px-3 items-center justify-center gap-1.5 rounded-lg border border-border-color dark:border-slate-800 text-xxs font-bold text-dark-text bg-white dark:bg-slate-900 transition-colors",
              isLastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
            )}
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

        </Flex>
      </div>

      {/* 2. Mobile Compact Pagination Layout */}
      <div className="flex sm:hidden items-center justify-between border-t border-border-color dark:border-slate-850 pt-5">
        
        {/* Previous Button (Chevron) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirstPage}
          aria-label="Previous page"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-color dark:border-slate-800 text-dark-text bg-white dark:bg-slate-900 transition-colors",
            isFirstPage ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Compact Text status */}
        <span className="text-[11px] font-bold text-dark-text select-none">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button (Chevron) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Next page"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-color dark:border-slate-800 text-dark-text bg-white dark:bg-slate-900 transition-colors",
            isLastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>

    </div>
  );
};
