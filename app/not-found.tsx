"use client";

import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { PageWrapper, Container, Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";

/**
 * Custom Next.js 404 Page styled with the project design system.
 */
export default function NotFound() {
  return (
    <PageWrapper className="justify-center items-center">
      <Container className="max-w-md">
        <Flex direction="col" align="center" justify="center" gap={6} className="text-center p-6 bg-white border border-border-color rounded-xl shadow-md">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary animate-pulse">
            <FileQuestion className="h-8 w-8" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-dark-text">404</h1>
            <h2 className="text-base font-bold text-dark-text">Page Not Found</h2>
            <p className="text-xs text-secondary-text leading-relaxed">
              The learning path or custom page you are trying to access does not exist, has been archived, or was moved.
            </p>
          </div>

          {/* Navigation Action */}
          <Link href="/dashboard" passHref className="w-full">
            <Button variant="primary" className="w-full text-xs font-bold py-3">
              Return to Dashboard
            </Button>
          </Link>
        </Flex>
      </Container>
    </PageWrapper>
  );
}
