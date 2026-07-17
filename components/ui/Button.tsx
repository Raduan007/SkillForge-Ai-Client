import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

// Button styles configuration using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark shadow-sm",
        secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-sm",
        outline: "border border-border-color bg-transparent text-dark-text hover:bg-neutral-bg",
        ghost: "text-dark-text hover:bg-neutral-bg",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
      },
      size: {
        small: "h-8 px-3 text-xs rounded-md",
        medium: "h-10 px-4 py-2 text-sm rounded-lg",
        large: "h-12 px-6 py-3 text-base rounded-lg",
        icon: "h-10 w-10 p-0 flex items-center justify-center rounded-lg",
        floating: "h-14 w-14 rounded-full shadow-lg flex items-center justify-center p-0 hover:scale-105 active:scale-95",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-busy={isLoading}
        aria-live={isLoading ? "polite" : "off"}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
