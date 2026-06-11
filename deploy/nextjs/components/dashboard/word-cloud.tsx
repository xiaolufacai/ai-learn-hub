"use client";

import { MOCK_DASHBOARD } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];
const opacities = ["opacity-60", "opacity-65", "opacity-70", "opacity-75", "opacity-80", "opacity-85", "opacity-95"];
const colors = [
  "text-blue-400", "text-cyan-400", "text-violet-400", "text-emerald-400",
  "text-amber-400", "text-rose-400", "text-indigo-400", "text-teal-400",
  "text-purple-400", "text-sky-400", "text-pink-400", "text-green-400",
];

function getStyle(weight: number) {
  if (weight >= 90) return { size: sizes[6], opacity: opacities[6], padding: "px-3 py-1.5" };
  if (weight >= 80) return { size: sizes[5], opacity: opacities[5], padding: "px-2.5 py-1" };
  if (weight >= 70) return { size: sizes[4], opacity: opacities[4], padding: "px-2 py-1" };
  if (weight >= 60) return { size: sizes[3], opacity: opacities[3], padding: "px-2 py-0.5" };
  if (weight >= 50) return { size: sizes[2], opacity: opacities[2], padding: "px-1.5 py-0.5" };
  if (weight >= 40) return { size: sizes[1], opacity: opacities[1], padding: "px-1 py-0.5" };
  return { size: sizes[0], opacity: opacities[0], padding: "px-1 py-0.5" };
}

export function WordCloud() {
  const keywords = MOCK_DASHBOARD.hotKeywords;

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center py-3">
      {keywords.map((kw, i) => {
        const style = getStyle(kw.weight);
        return (
          <span
            key={kw.word}
            className={cn(
              "inline-block rounded-lg cursor-default transition-all hover:scale-110 hover:opacity-100",
              style.size, style.opacity, style.padding,
              colors[i % colors.length]
            )}
          >
            {kw.word}
          </span>
        );
      })}
    </div>
  );
}
