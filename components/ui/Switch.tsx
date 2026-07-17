"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, checked, onChange, ...props }, ref) => {
    const id = React.useId();
    const [isChecked, setIsChecked] = React.useState(!!checked);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(!!checked);
      }
    }, [checked]);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || isLoading) return;
      setIsChecked(e.target.checked);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <label htmlFor={id} className="relative inline-flex items-center cursor-pointer select-none">
            <input
              id={id}
              type="checkbox"
              ref={ref}
              checked={isChecked}
              onChange={handleToggle}
              disabled={disabled || isLoading}
              className="sr-only peer"
              {...props}
            />
            {/* The Switch slider bar */}
            <div
              className={cn(
                "relative w-10 h-6 rounded-full transition-all duration-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-1 disabled:opacity-50",
                isChecked ? "bg-primary" : "bg-slate-200",
                error && "border border-red-500",
                success && "border border-secondary"
              )}
            >
              {/* The slider thumb */}
              <div
                className={cn(
                  "absolute top-0.5 left-[2px] bg-white border border-slate-300 rounded-full h-5 w-5 transition-all duration-200 shadow-sm",
                  isChecked ? "translate-x-full border-primary" : "translate-x-0"
                )}
              />
            </div>
            {isLoading && (
              <div className="absolute -right-5 pointer-events-none">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-secondary-text" />
              </div>
            )}
          </label>
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm select-none cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                disabled ? "text-secondary-text" : "text-dark-text"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {(error || helperText) && (
          <div className="pl-1 flex flex-col gap-0.5">
            {error && <span className="text-xs font-medium text-red-500">{error}</span>}
            {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
          </div>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
