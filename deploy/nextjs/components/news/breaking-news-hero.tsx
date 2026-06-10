import Link from "next/link";
import { Zap, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AiNews } from "@/lib/types";

interface BreakingNewsProps {
  news: AiNews;
}

export function BreakingNewsHero({ news }: BreakingNewsProps) {
  return (
    <Link href={`/news/${news.slug}`} className="block group">
      <div className="border-gradient rounded-card relative overflow-hidden">
        <div className="glass-card-interactive rounded-card relative z-10">
          <div
            className="absolute inset-0 rounded-card opacity-20"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.4), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 pill-green">
                <Zap size={12} />
                突发新闻
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={12} />
                {formatDate(news.published_at)}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
              {news.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3 max-w-2xl">
              {news.summary}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted">来源: {news.source}</span>
              <span className="pill text-[10px]">{news.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
