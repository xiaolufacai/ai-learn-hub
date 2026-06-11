import Link from "next/link";
import { TrendingUp, Zap, AlertTriangle } from "lucide-react";

interface SentimentBrief { news_slug: string; title: string; overall_summary: string; positive_pct: number; negative_pct: number; }

export function SentimentBriefs({ briefs }: { briefs: SentimentBrief[] }) {
  return (
    <div className="space-y-3">
      {briefs.map((b) => (
        <Link key={b.news_slug} href={`/sentiment/${b.news_slug}`} className="block p-4 rounded-xl border border-border hover:border-accent/20 hover:bg-surface-hover transition-all group">
          <div className="flex items-center gap-2 mb-2">
            {b.positive_pct >= 70 ? <TrendingUp size={14} className="text-emerald-400" /> : b.negative_pct >= 20 ? <AlertTriangle size={14} className="text-amber-400" /> : <Zap size={14} className="text-accent" />}
            <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{b.title}</span>
          </div>
          <p className="text-xs text-text-muted line-clamp-2">{b.overall_summary}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px]">
            <span className="text-emerald-400">👍 {b.positive_pct}%</span>
            <span className="text-red-400">👎 {b.negative_pct}%</span>
          </div>
        </Link>
      ))}
      <Link href="/sentiment" className="block text-center text-xs text-accent hover:text-accent-purple transition-colors">
        查看全部舆情 →
      </Link>
    </div>
  );
}
