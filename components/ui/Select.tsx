"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, children, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={id}
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              "w-full h-10 px-3 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50 appearance-none pr-10",
              error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
              className
            )}
            {...props}
          >
            {children}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute right-3 pointer-events-none flex items-center gap-1">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-secondary-text" />}
            <svg
              className="h-4 w-4 text-secondary-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
