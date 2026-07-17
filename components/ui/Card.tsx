"use client";

import * as React from "react";
import { Loader2, HelpCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

export interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  metadata?: string[];
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  isSkeleton?: boolean;
  isEmpty?: boolean;
  emptyIcon?: React.ComponentType<{ className?: string }>;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt = "Card image",
  title,
  description,
  metadata = [],
  actionLabel,
  onAction,
  isLoading = false,
  isSkeleton = false,
  isEmpty = false,
  emptyIcon: EmptyIcon = HelpCircle,
  emptyTitle = "No data available",
  emptyDescription = "There is currently no information to display in this card.",
  className,
  icon: Icon,
}) => {
  // 1. SKELETON STATE RENDERER
  if (isSkeleton) {
    return (
      <div
        className={cn(
          "flex flex-col h-full w-full rounded-xl border border-border-color bg-white shadow-sm overflow-hidden select-none animate-pulse",
          className
        )}
      >
        {/* Skeleton Image */}
        <div className="h-44 w-full bg-slate-200" />
        
        {/* Skeleton Body */}
        <div className="flex flex-col flex-1 p-5 gap-3.5">
          {/* Skeleton Metadata */}
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-slate-200" />
            <div className="h-5 w-20 rounded-full bg-slate-200" />
          </div>
          {/* Skeleton Title */}
          <div className="h-6 w-3/4 rounded bg-slate-200" />
          {/* Skeleton Description */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
          </div>
          {/* Skeleton Button */}
          <div className="h-10 w-full rounded-lg bg-slate-200 mt-2" />
        </div>
      </div>
    );
  }

  // 2. EMPTY STATE RENDERER
  if (isEmpty) {
    return (
      <div
        className={cn(
          "flex flex-col h-full w-full items-center justify-center rounded-xl border border-dashed border-border-color bg-slate-50 p-6 text-center shadow-inner min-h-[250px]",
          className
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-secondary-text mb-3">
          <EmptyIcon className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-dark-text mb-1">{emptyTitle}</h3>
        <p className="text-xs text-secondary-text max-w-[220px]">{emptyDescription}</p>
      </div>
    );
  }

  // 3. REGULAR RENDERER (Supports loading overlay, hover animations, flexible height & width)
  return (
    <div
      className={cn(
        "group relative flex flex-col h-full w-full rounded-xl border border-border-color bg-white overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300",
        isLoading && "pointer-events-none select-none",
        className
      )}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px] transition-all">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Card Cover Image */}
      {imageSrc && (
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Card Icon Header */}
      {Icon && !imageSrc && (
        <div className="pt-5 px-5 shrink-0 select-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/25 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Metadata Badges */}
        {metadata.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {metadata.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xxs font-semibold text-secondary-text border border-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-base font-bold text-dark-text leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-secondary-text leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && (
          <div className="mt-2 shrink-0">
            <Button
              onClick={onAction}
              variant="outline"
              size="medium"
              className="w-full text-xs font-bold border border-border-color text-dark-text group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-200"
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Card };
