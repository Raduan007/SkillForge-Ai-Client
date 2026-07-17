import { useState, useMemo } from "react";

/**
 * Filters an array of items matching a search query keyword case-insensitively.
 */
export function useSearch<T>(
  items: T[],
  searchKeys: (keyof T)[],
  initialQuery = ""
) {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const cleanQuery = query.toLowerCase().trim();

    return items.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(cleanQuery);
      })
    );
  }, [items, searchKeys, query]);

  return {
    query,
    setQuery,
    filteredItems,
  };
}
