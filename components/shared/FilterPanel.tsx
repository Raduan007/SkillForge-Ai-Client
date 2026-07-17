"use client";

import * as React from "react";
import { SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { Flex } from "@/components/layout/Layouts";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/utils/cn";

export interface FilterState {
  categories: string[];
  difficulties: string[];
  durations: string[];
}

export interface FilterPanelProps {
  onApply?: (filters: FilterState) => void;
  onReset?: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onApply,
  onReset,
  className,
}) => {
  // Category list selection
  const categoriesList = ["Frontend", "Backend", "Data Science", "Design", "DevOps", "Mobile", "Security"];
  // Difficulty levels
  const difficultiesList = ["Beginner", "Intermediate", "Advanced"];
  // Duration segments
  const durationsList = ["Under 3 Months", "3-6 Months", "6+ Months"];

  // State trackers
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(categoriesList);
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<string[]>(difficultiesList);
  const [selectedDurations, setSelectedDurations] = React.useState<string[]>(durationsList);

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  const handleDifficultyToggle = (level: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]
    );
  };

  const handleDurationToggle = (dur: string) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((item) => item !== dur) : [...prev, dur]
    );
  };

  const handleReset = () => {
    setSelectedCategories(categoriesList);
    setSelectedDifficulties(difficultiesList);
    setSelectedDurations(durationsList);
    if (onReset) onReset();
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        categories: selectedCategories,
        difficulties: selectedDifficulties,
        durations: selectedDurations,
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 select-none", className)}>
      
      {/* Title */}
      <Flex align="center" gap={2} className="border-b border-border-color dark:border-slate-850 pb-4">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <span className="text-xs font-black text-dark-text uppercase tracking-widest">Filter Options</span>
      </Flex>

      {/* 1. Category Domain filters */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-dark-text uppercase tracking-wider">Career Domain</span>
        <div className="flex flex-col gap-2">
          {categoriesList.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-xs text-secondary-text font-semibold cursor-pointer select-none"
            >
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              <span className={cn(selectedCategories.includes(cat) && "text-dark-text font-bold")}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border-color dark:bg-slate-800" />

      {/* 2. Difficulty filters */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-dark-text uppercase tracking-wider">Difficulty Level</span>
        <div className="flex flex-col gap-2">
          {difficultiesList.map((level) => (
            <label
              key={level}
              className="flex items-center gap-2.5 text-xs text-secondary-text font-semibold cursor-pointer select-none"
            >
              <Checkbox
                checked={selectedDifficulties.includes(level)}
                onChange={() => handleDifficultyToggle(level)}
              />
              <span className={cn(selectedDifficulties.includes(level) && "text-dark-text font-bold")}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border-color dark:bg-slate-800" />

      {/* 3. Duration filters */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-dark-text uppercase tracking-wider">Roadmap Duration</span>
        <div className="flex flex-col gap-2">
          {durationsList.map((dur) => (
            <label
              key={dur}
              className="flex items-center gap-2.5 text-xs text-secondary-text font-semibold cursor-pointer select-none"
            >
              <Checkbox
                checked={selectedDurations.includes(dur)}
                onChange={() => handleDurationToggle(dur)}
              />
              <span className={cn(selectedDurations.includes(dur) && "text-dark-text font-bold")}>{dur}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-border-color dark:bg-slate-800" />

      {/* Action panel triggers */}
      <Flex gap={2} className="mt-2">
        <Button
          variant="outline"
          size="medium"
          onClick={handleReset}
          className="flex-1 text-xxs font-bold flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={handleApply}
          className="flex-1 text-xxs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-primary/10"
        >
          <Check className="h-3 w-3" />
          <span>Apply</span>
        </Button>
      </Flex>

    </div>
  );
};
