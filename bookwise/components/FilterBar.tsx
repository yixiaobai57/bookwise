"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  difficulties: string[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

export function FilterBar({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted mb-2">分类</h3>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="全部"
            active={selectedCategory === ""}
            onClick={() => onCategoryChange("")}
          />
          {categories.map((category) => (
            <FilterPill
              key={category}
              label={category}
              active={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted mb-2">难度</h3>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="全部"
            active={selectedDifficulty === ""}
            onClick={() => onDifficultyChange("")}
          />
          {difficulties.map((difficulty) => (
            <FilterPill
              key={difficulty}
              label={difficulty}
              active={selectedDifficulty === difficulty}
              onClick={() => onDifficultyChange(difficulty)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-primary-start to-primary-end text-white dark:text-slate-900 shadow-sm"
          : "bg-card text-muted border border-border hover:border-primary-start/30"
      }`}
    >
      {label}
    </motion.button>
  );
}
