"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/utils/cn";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  delay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search career roadmaps...",
  className,
  delay = 400,
}) => {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, delay);

  // Trigger search whenever the debounced query updates
  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className={cn("relative w-full flex items-center select-none", className)}>
      
      {/* Search Icon (Left side) */}
      <div className="absolute left-3 text-secondary-text pointer-events-none flex items-center justify-center">
        <Search className="h-4.5 w-4.5" />
      </div>

      {/* Accessible Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search technical roadmap paths by title or keyword"
        className={cn(
          "w-full h-10 pl-10 pr-10 py-2 rounded-lg border bg-white dark:bg-slate-900",
          "text-sm text-dark-text placeholder-secondary-text transition-all duration-200",
          "border-border-color dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        )}
      />

      {/* Clear (X) Button (Right side, visible only when query exists) */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-3 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear active search input"
              className="p-1 rounded-md text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
