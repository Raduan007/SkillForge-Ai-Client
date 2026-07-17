"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            id={id}
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              "w-full min-h-[80px] px-3 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50",
              error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
              isLoading && "pr-9",
              className
            )}
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 top-3 pointer-events-none">
              <Loader2 className="h-4 w-4 animate-spin text-secondary-text" />
            </div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
