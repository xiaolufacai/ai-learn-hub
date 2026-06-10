import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AiNews } from "@/lib/types";

interface NewsCardProps {
  news: AiNews;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`} className="block group">
      <article className="glass-card-interactive">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="pill text-[10px]">{news.category}</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted">
                <Clock size={11} />
                {formatDate(news.published_at)}
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
              {news.title}
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">
              {news.summary}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[11px] text-text-muted">{news.source}</span>
              <ExternalLink size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
