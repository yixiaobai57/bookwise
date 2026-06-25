"use client";

import { motion } from "framer-motion";
import { getCoverageColor } from "@/lib/coverage";

interface CoverageCircleProps {
  coverage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function CoverageCircle({
  coverage,
  size = 80,
  strokeWidth = 6,
  showLabel = true,
}: CoverageCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - coverage);

  const colorClass = getCoverageColor(coverage);
  const percentage = Math.round(coverage * 100);

  const colorMap: Record<string, string> = {
    "coverage-high": "#22c55e",
    "coverage-mid": "#eab308",
    "coverage-low": "#ef4444",
  };

  const strokeColor = colorMap[colorClass] || "#22c55e";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
