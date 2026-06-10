import type { AiNews } from "@/lib/types";
import { NewsCard } from "./news-card";

interface NewsFeedProps {
  news: AiNews[];
}

export function NewsFeed({ news }: NewsFeedProps) {
  return (
    <div className="space-y-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
