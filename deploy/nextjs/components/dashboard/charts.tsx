"use client";

import { MOCK_DASHBOARD } from "@/lib/dashboard-data";

const barColors = ["from-blue-500 to-cyan-400", "from-violet-500 to-purple-400", "from-amber-500 to-orange-400", "from-emerald-500 to-teal-400", "from-rose-500 to-pink-400", "from-indigo-500 to-blue-400"];

export function CategoryDistribution() {
  const items = MOCK_DASHBOARD.categoryDistribution;
  const max = Math.max(...items.map((i) => i.count));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.category} className="flex items-center gap-3">
          <span className="text-xs text-text-muted w-14 flex-shrink-0">{item.label}</span>
          <div className="flex-1 h-5 bg-surface-hover rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-text-secondary w-5 text-right">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

export function SentimentTrend() {
  const data = MOCK_DASHBOARD.weeklySentiment;

  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <div className="w-full flex flex-col gap-0.5" style={{ height: `${d.positive + d.negative + d.neutral}%` }}>
            <div className="w-full bg-emerald-500/70 rounded-t-sm" style={{ height: `${d.positive}%` }} />
            <div className="w-full bg-red-400/60" style={{ height: `${d.negative}%` }} />
            <div className="w-full bg-gray-500/40 rounded-b-sm" style={{ height: `${d.neutral}%` }} />
          </div>
          <span className="text-[11px] text-text-muted">{d.day}</span>
        </div>
      ))}
      <div className="flex items-center gap-4 ml-4 text-[10px] text-text-muted flex-col">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500/70" /> 正面</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400/60" /> 负面</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-gray-500/40" /> 中性</span>
      </div>
    </div>
  );
}
