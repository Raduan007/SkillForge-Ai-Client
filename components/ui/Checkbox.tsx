"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <div className="relative flex items-center h-5">
            <input
              id={id}
              type="checkbox"
              ref={ref}
              disabled={disabled || isLoading}
              className={cn(
                "h-4 w-4 rounded border text-primary focus:ring-primary focus:ring-offset-1 focus:outline-none transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color",
                className
              )}
              {...props}
            />
            {isLoading && (
              <div className="absolute -right-5 pointer-events-none">
                <Loader2 className="h-3 w-3 animate-spin text-secondary-text" />
              </div>
            )}
          </div>
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium",
                disabled ? "text-secondary-text" : "text-dark-text"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {(error || helperText) && (
          <div className="pl-6">
            {error && <span className="text-xs font-medium text-red-500">{error}</span>}
            {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
