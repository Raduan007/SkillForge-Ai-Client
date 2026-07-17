"use client";

import { PageLoader } from "@/components/ui/States";
import { PageWrapper } from "@/components/layout/Layouts";

/**
 * Root Next.js Loading template.
 * Leverages the PageLoader component to show visual transitions during page load activities.
 */
export default function Loading() {
  return (
    <PageWrapper className="justify-center items-center">
      <PageLoader message="Synchronizing path data..." />
    </PageWrapper>
  );
}
