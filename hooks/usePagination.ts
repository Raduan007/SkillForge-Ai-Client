import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  totalItems?: number;
}

/**
 * Custom hook to control local page pointer movements and sizing limits.
 */
export function usePagination({
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0,
}: UsePaginationProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback(
    (targetPage: number) => {
      setPage(Math.max(1, Math.min(targetPage, totalPages)));
    },
    [totalPages]
  );

  return {
    page,
    limit,
    totalPages,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToPage,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
