import Link from "next/link";
import { SentimentBar } from "./sentiment-bar";
import type { SentimentAnalysis, AiNews, Controversy } from "@/lib/types";

interface SentimentCardProps {
  analysis: SentimentAnalysis;
  news?: AiNews | null;
}

export function SentimentCard({ analysis, news }: SentimentCardProps) {
  const title = news?.title || analysis.news_slug;
  const slug = analysis.news_slug;
  const controversies = (analysis.key_controversies as unknown as Controversy[]) || [];

  return (
    <Link href={`/sentiment/${slug}`} className="block group">
      <div className="glass-card-interactive h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {analysis.overall_summary && (
          <p className="text-[13px] text-text-secondary line-clamp-2 mb-4">
            {analysis.overall_summary}
          </p>
        )}

        <SentimentBar
          positive={analysis.positive_pct}
          negative={analysis.negative_pct}
          neutral={analysis.neutral_pct}
          compact
        />

        {controversies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {controversies.slice(0, 2).map((c, i) => (
              <span key={i} className="text-[10px] text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                ⚡ {c.topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
