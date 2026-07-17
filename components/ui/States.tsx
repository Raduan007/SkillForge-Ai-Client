"use client";

import * as React from "react";
import { Loader2, Search, Inbox, BellOff, AlertTriangle, WifiOff } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

// 1. SKELETON CARD (Standalone version)
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-full rounded-xl border border-border-color bg-white shadow-sm overflow-hidden animate-pulse select-none",
        className
      )}
    >
      <div className="h-40 w-full bg-slate-200" />
      <div className="flex flex-col p-5 gap-3">
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full bg-slate-200" />
          <div className="h-5 w-20 rounded-full bg-slate-200" />
        </div>
        <div className="h-6 w-3/4 rounded bg-slate-200" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-4/5 rounded bg-slate-200" />
        </div>
        <div className="h-9 w-full rounded-lg bg-slate-200 mt-2" />
      </div>
    </div>
  );
};

// 2. SKELETON TABLE
export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({ rows = 4, className }) => {
  return (
    <div className={cn("w-full border border-border-color rounded-xl bg-white overflow-hidden animate-pulse select-none", className)}>
      <div className="h-12 bg-slate-50 border-b border-border-color flex items-center px-6 gap-4">
        <div className="h-4 w-1/4 rounded bg-slate-200" />
        <div className="h-4 w-1/4 rounded bg-slate-200" />
        <div className="h-4 w-1/6 rounded bg-slate-200" />
        <div className="h-4 w-1/6 rounded bg-slate-200" />
      </div>
      <div className="flex flex-col divide-y divide-border-color">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="h-16 flex items-center px-6 gap-4">
            <div className="h-4 w-1/4 rounded bg-slate-100" />
            <div className="h-4 w-1/4 rounded bg-slate-100" />
            <div className="h-4 w-1/6 rounded bg-slate-100" />
            <div className="h-4 w-1/6 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. SKELETON DASHBOARD
export const SkeletonDashboard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full flex flex-col gap-6 animate-pulse select-none", className)}>
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="border border-border-color rounded-xl bg-white p-5 flex flex-col gap-3">
            <div className="h-4 w-1/3 rounded bg-slate-200" />
            <div className="h-8 w-1/2 rounded bg-slate-200" />
            <div className="h-3.5 w-2/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
      
      {/* Workspace Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-8 w-1/3 rounded bg-slate-200" />
          <SkeletonTable rows={3} />
        </div>
        {/* Side Panel Area */}
        <div className="border border-border-color rounded-xl bg-white p-5 flex flex-col gap-4">
          <div className="h-5 w-1/2 rounded bg-slate-200" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-lg bg-slate-200 shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3.5 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. PAGE LOADER
export const PageLoader: React.FC<{ message?: string; className?: string }> = ({
  message = "Loading SkillForge AI platform...",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 items-center justify-center min-h-[400px] w-full p-6 text-center select-none",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary mb-4 animate-bounce">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <h3 className="text-base font-bold text-dark-text">{message}</h3>
      <p className="text-xs text-secondary-text mt-1 max-w-sm">
        Please wait while we sync database records and prepare your career learning workspace.
      </p>
    </div>
  );
};

// 5. EMPTY SEARCH
export interface EmptySearchProps {
  query?: string;
  onClear?: () => void;
  className?: string;
}

export const EmptySearch: React.FC<EmptySearchProps> = ({ query, onClear, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-border-color rounded-xl bg-slate-50 p-8 text-center min-h-[300px]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-secondary-text mb-4">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-dark-text">No results match filters</h3>
      <p className="text-xs text-secondary-text mt-1.5 mb-4 max-w-xs leading-relaxed">
        {query
          ? `We couldn't find any documents or skills matching "${query}". Try adjusting your keywords.`
          : "We couldn't find any resources matching your selected filter parameters."}
      </p>
      {onClear && (
        <Button onClick={onClear} variant="outline" size="small" className="text-xs">
          Reset Filter Parameters
        </Button>
      )}
    </div>
  );
};

// 6. EMPTY DATA
export const EmptyData: React.FC<{
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title = "No information found",
  description = "There are currently no items configured to show in this view tab.",
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-border-color rounded-xl bg-slate-50 p-8 text-center min-h-[300px]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-secondary-text mb-4">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-dark-text">{title}</h3>
      <p className="text-xs text-secondary-text mt-1.5 max-w-xs leading-relaxed mb-4">
        {description}
      </p>
      {onAction && actionLabel && (
        <Button onClick={onAction} variant="primary" size="medium" className="text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// 7. EMPTY NOTIFICATION
export const EmptyNotification: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center min-h-[180px] w-full",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-secondary-text mb-3">
        <BellOff className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-semibold text-dark-text">All caught up!</h4>
      <p className="text-xs text-secondary-text mt-1 max-w-[200px]">
        You have no new notifications or path milestones.
      </p>
    </div>
  );
};

// 8. ERROR STATE
export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An error occurred while fetching roadmap nodes or processing quiz answers. Please try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-red-100 rounded-xl bg-red-50/30 p-8 text-center min-h-[300px]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4 animate-pulse">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-red-800">{title}</h3>
      <p className="text-xs text-red-700 mt-1.5 mb-5 max-w-xs leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="danger" size="medium" className="text-xs font-bold">
          Try Again
        </Button>
      )}
    </div>
  );
};

// 9. NO INTERNET STATE
export const NoInternetState: React.FC<{ onRetry?: () => void; className?: string }> = ({
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-border-color rounded-xl bg-slate-50 p-8 text-center min-h-[350px]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-secondary-text mb-4">
        <WifiOff className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-dark-text">Unable to connect</h3>
      <p className="text-xs text-secondary-text mt-1.5 mb-4 max-w-xs leading-relaxed">
        We can't establish a network socket connection to the SkillForge AI server. Please verify your internet router connection or check if the server is offline.
      </p>
      <ul className="text-xxs text-secondary-text text-left max-w-xs bg-white border border-border-color rounded-lg p-3 flex flex-col gap-1.5 mb-5">
        <li className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          Check network cable connections
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          Verify server terminal runs `node server.js`
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          Reload the browser web page
        </li>
      </ul>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="medium" className="text-xs font-bold">
          Retry Network Check
        </Button>
      )}
    </div>
  );
};
