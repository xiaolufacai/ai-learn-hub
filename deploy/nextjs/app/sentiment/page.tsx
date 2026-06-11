import { getSentimentAnalyses, getLatestNews } from "@/lib/content";
import { SentimentCard } from "@/components/sentiment/sentiment-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 舆情",
  description: "AI 新闻舆情分析 — 了解社区对最新 AI 动态的观点与情感",
};

export const dynamic = "force-dynamic";

export default async function SentimentPage() {
  const analyses = await getSentimentAnalyses(30);
  const newsList = await getLatestNews(30);
  const newsMap = new Map(newsList.map((n) => [n.slug, n]));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📊 AI 舆情</h1>
        <p className="text-sm text-text-muted">
          最新 AI 新闻的社区观点与情感分析
        </p>
      </div>

      {analyses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {analyses.map((a: any) => (
            <SentimentCard
              key={a.id}
              analysis={a}
              news={newsMap.get(a.news_slug) || null}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <p className="text-lg mb-2">暂无舆情数据</p>
          <p className="text-sm">请先运行 sync-sentiment</p>
        </div>
      )}
    </div>
  );
}
