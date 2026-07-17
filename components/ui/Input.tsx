"use client";

import * as React from "react";
import { Search, Eye, EyeOff, Image, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  isLoading?: boolean;
}

// 1. General Input Component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, success, helperText, isLoading = false, disabled, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={id}
            type={type}
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              "w-full h-10 px-3 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50",
              error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
              isLoading && "pr-9",
              className
            )}
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 pointer-events-none">
              <Loader2 className="h-4 w-4 animate-spin text-secondary-text" />
            </div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {success && !error && helperText && <span className="text-xs font-medium text-secondary">{helperText}</span>}
        {!success && !error && helperText && <span className="text-xs text-secondary-text">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

// 2. Search Input Component
const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <div className="absolute left-3 text-secondary-text pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <input
            id={id}
            type="text"
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              "w-full h-10 pl-9 pr-3 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50",
              error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
              isLoading && "pr-9",
              className
            )}
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 pointer-events-none">
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
SearchInput.displayName = "SearchInput";

// 3. Password Input Component (Supports Toggle Visibility)
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, ...props }, ref) => {
    const id = React.useId();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              "w-full h-10 pl-3 pr-10 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50",
              error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
              className
            )}
            {...props}
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-secondary-text" />}
            <button
              type="button"
              disabled={disabled || isLoading}
              onClick={() => setShowPassword(prev => !prev)}
              className="text-secondary-text hover:text-dark-text focus:outline-none disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// 4. Image URL Input Component (Includes Inline Preview)
const ImageUrlInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, helperText, isLoading = false, disabled, value, onChange, ...props }, ref) => {
    const id = React.useId();
    const [inputValue, setInputValue] = React.useState(String(value || ""));

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value));
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    // Very simple check to show image preview if it starts with http or has common extensions
    const isProbablyUrl = inputValue.startsWith("http://") || inputValue.startsWith("https://") || inputValue.includes("/");

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-dark-text select-none">
            {label}
          </label>
        )}
        <div className="flex gap-2">
          {/* Preview Panel */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-color bg-slate-50 overflow-hidden">
            {isProbablyUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={inputValue}
                alt="preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Image className="h-4 w-4 text-secondary-text" />
            )}
          </div>

          <div className="relative flex flex-1 items-center">
            <input
              id={id}
              type="text"
              ref={ref}
              value={inputValue}
              onChange={handleInputChange}
              disabled={disabled || isLoading}
              className={cn(
                "w-full h-10 px-3 py-2 rounded-lg border bg-white text-sm text-dark-text placeholder-secondary-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:bg-slate-50",
                error ? "border-red-500 focus:ring-red-500" : success ? "border-secondary focus:ring-secondary" : "border-border-color focus:ring-primary",
                isLoading && "pr-9",
                className
              )}
              {...props}
            />
            {isLoading && (
              <div className="absolute right-3 pointer-events-none">
                <Loader2 className="h-4 w-4 animate-spin text-secondary-text" />
              </div>
            )}
          </div>
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {!error && helperText && <span className={cn("text-xs", success ? "text-secondary font-medium" : "text-secondary-text")}>{helperText}</span>}
      </div>
    );
  }
);
ImageUrlInput.displayName = "ImageUrlInput";

export { Input, SearchInput, PasswordInput, ImageUrlInput };
