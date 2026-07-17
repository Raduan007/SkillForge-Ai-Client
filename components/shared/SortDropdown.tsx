"use client";

import * as React from "react";
import { Select } from "@/components/ui/Select";
import { cn } from "@/utils/cn";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value = "newest",
  onChange,
  className,
}) => {
  // Configured sort option dictionary mapping
  const sortOptions: SortOption[] = [
    { value: "newest", label: "Newest Paths" },
    { value: "oldest", label: "Oldest Paths" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "lowest-rated", label: "Lowest Rated" },
    { value: "shortest-duration", label: "Shortest Duration" },
    { value: "longest-duration", label: "Longest Duration" },
    { value: "alpha-asc", label: "A – Z" },
    { value: "alpha-desc", label: "Z – A" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={cn("w-full md:w-56 select-none", className)}>
      <Select
        value={value}
        onChange={handleChange}
        aria-label="Sort roadmap results order filter option"
        className="w-full text-xs font-semibold"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
