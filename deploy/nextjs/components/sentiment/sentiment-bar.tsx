"use client";

import { cn } from "@/lib/utils";

interface SentimentBarProps {
  positive: number;
  negative: number;
  neutral: number;
  compact?: boolean;
}

export function SentimentBar({ positive, negative, neutral, compact }: SentimentBarProps) {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className="flex h-2.5 rounded-full overflow-hidden bg-surface-hover">
        <div
          className="bg-emerald-500 transition-all"
          style={{ width: `${positive}%` }}
        />
        <div
          className="bg-red-400 transition-all"
          style={{ width: `${negative}%` }}
        />
        <div
          className="bg-gray-500 transition-all"
          style={{ width: `${neutral}%` }}
        />
      </div>
      <div className={cn("flex text-xs text-text-muted", compact ? "gap-2" : "gap-4")}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          看好 {positive}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          看空 {negative}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" />
          中性 {neutral}%
        </span>
      </div>
    </div>
  );
}
