"use client";

import { MessageSquare, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Stance = "supporting" | "opposing" | "neutral";

const config: Record<Stance, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  supporting: { label: "支持方观点", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: TrendingUp },
  opposing:   { label: "反对方观点", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: Zap },
  neutral:    { label: "中立观点", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: MessageSquare },
};

export function ViewpointList({ stance, views }: { stance: Stance; views: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const c = config[stance];
  const Icon = c.icon;

  if (!views || views.length === 0) return null;

  const displayed = expanded ? views : views.slice(0, 2);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-lg", c.bg)}>
          <Icon size={14} className={c.color} />
        </div>
        <span className={cn("text-sm font-semibold", c.color)}>{c.label}</span>
        <span className="text-xs text-text-muted">({views.length})</span>
      </div>

      <div className="space-y-2">
        {displayed.map((v: any, i: number) => (
          <div key={i} className={cn("p-4 rounded-xl border", c.bg, c.border)}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-text-primary font-medium">{v.point}</p>
              <span className="text-xs text-text-muted ml-2 flex-shrink-0">
                影响力 {v.influence_score}/10
              </span>
            </div>
            <p className="text-xs text-text-muted italic">
              &ldquo;{v.source_quote}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {views.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-accent hover:text-accent-purple transition-colors"
        >
          {expanded ? `收起其余 ${views.length - 2} 条` : `展开全部 ${views.length} 条`}
        </button>
      )}
    </div>
  );
}
