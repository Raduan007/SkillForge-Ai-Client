"use client";

import { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";
import { PageWrapper, Container, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root Next.js Error Boundary page.
 * Catches client-side and rendering errors responsively and provides a Retry trigger.
 */
export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception to standard debug reporting tools
    console.error("[GLOBAL ERROR BOUNDARY ACTIVE]:", error);
  }, [error]);

  return (
    <PageWrapper className="justify-center items-center">
      <Container className="max-w-md">
        <Flex
          direction="col"
          align="center"
          justify="center"
          gap={6}
          className="text-center p-6 bg-red-50/20 border border-red-100 rounded-xl shadow-md"
        >
          {/* Warn Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 animate-pulse">
            <AlertOctagon className="h-8 w-8 text-red-600" />
          </div>

          {/* Error Text Details */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-extrabold text-red-800">Something went wrong</h1>
            <p className="text-xs text-red-700 leading-relaxed max-w-sm">
              We encountered a runtime application error. The system details have been logged. Please try reloading the workspace segment.
            </p>
            {error.message && (
              <div className="mt-2 bg-white/70 border border-red-100 rounded-lg p-2.5 text-xxs font-mono text-left text-red-600 max-h-[80px] overflow-y-auto w-full">
                <strong>Exception Log:</strong> {error.message}
              </div>
            )}
          </div>

          {/* Retry Triggers */}
          <Button
            onClick={() => reset()}
            variant="danger"
            className="w-full text-xs font-bold py-3 flex gap-2 justify-center items-center"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retry Operation</span>
          </Button>
        </Flex>
      </Container>
    </PageWrapper>
  );
}
