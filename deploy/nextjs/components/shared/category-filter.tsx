"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={cn(
            "pill transition-all duration-200",
            active === cat.key && "pill-active"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
