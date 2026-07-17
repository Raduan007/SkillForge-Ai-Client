"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Component-level Reusable React Error Boundary Class.
 * Traps component exceptions and renders granular warning panels instead of page-wide crashes.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[COMPONENT EXCEPTION TRAPPED BY BOUNDARY]:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center border border-red-100 rounded-xl bg-red-50/20 p-6 text-center select-none w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 mb-3">
            <AlertCircle className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-red-800">Widget failed to load</h3>
          <p className="text-xxs text-red-700 mt-1 max-w-[260px] leading-relaxed mb-4">
            An exception occurred while compiling this widget panel. Click retry to reload.
          </p>
          <Button
            onClick={this.handleReset}
            variant="danger"
            size="small"
            className="text-xxs font-bold px-4 flex gap-1.5 justify-center items-center"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reload Widget</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
