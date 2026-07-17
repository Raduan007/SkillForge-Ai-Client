"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

// 1. PAGE WRAPPER
export interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-h-screen bg-neutral-bg text-dark-text",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. SECTION
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "section" | "div" | "header" | "footer";
}

export const Section: React.FC<SectionProps> = ({ children, as: Component = "section", className, ...props }) => {
  return (
    <Component
      className={cn(
        "py-12 md:py-16 lg:py-20",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// 3. CONTAINER
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, clean = false, className, ...props }) => {
  return (
    <div
      className={cn(
        !clean && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 4. MAX WIDTH WRAPPER
export interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

export const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  children,
  size = "5xl",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  };

  return (
    <div
      className={cn("mx-auto w-full", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};

// 5. GRID
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  colsSm?: 1 | 2 | 3 | 4;
  colsMd?: 1 | 2 | 3 | 4 | 5;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  gap = 4,
  className,
  ...props
}) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const colSmClasses = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };

  const colMdClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  };

  const colLgClasses = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  const gapClasses = {
    1: "gap-1",   // 4px
    2: "gap-2",   // 8px
    3: "gap-3",   // 12px
    4: "gap-4",   // 16px
    5: "gap-5",   // 20px
    6: "gap-6",   // 24px
    8: "gap-8",   // 32px
    10: "gap-10", // 40px
    12: "gap-12", // 48px
  };

  return (
    <div
      className={cn(
        "grid",
        colClasses[cols],
        colsSm && colSmClasses[colsSm],
        colsMd && colMdClasses[colsMd],
        colsLg && colLgClasses[colsLg],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 6. FLEX
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  inline?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  align = "stretch",
  justify = "start",
  wrap = "nowrap",
  gap = 0,
  inline = false,
  className,
  ...props
}) => {
  const directionClasses = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    "col-reverse": "flex-col-reverse",
  };

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const wrapClasses = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
  };

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",   // 4px
    2: "gap-2",   // 8px
    3: "gap-3",   // 12px
    4: "gap-4",   // 16px
    5: "gap-5",   // 20px
    6: "gap-6",   // 24px
    8: "gap-8",   // 32px
    10: "gap-10", // 40px
    12: "gap-12", // 48px
  };

  return (
    <div
      className={cn(
        inline ? "inline-flex" : "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses[wrap],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 7. RESPONSIVE WRAPPER
export interface ResponsiveWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showOn?: "mobile" | "tablet" | "desktop" | "tabletAndUp" | "mobileAndTablet";
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  showOn = "desktop",
  className,
  ...props
}) => {
  const responsiveClasses = {
    mobile: "block sm:hidden",                  // Only mobile
    tablet: "hidden sm:block md:hidden",        // Only tablet
    desktop: "hidden md:block",                 // Only desktop
    tabletAndUp: "hidden sm:block",             // Tablet and desktop
    mobileAndTablet: "block md:hidden",         // Mobile and tablet
  };

  return (
    <div className={cn(responsiveClasses[showOn], className)} {...props}>
      {children}
    </div>
  );
};
