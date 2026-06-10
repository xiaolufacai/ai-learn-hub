import { getNewsByCategory } from "@/lib/content";
import { NewsCard } from "@/components/news/news-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 新闻",
  description: "最新人工智能新闻动态，涵盖 LLM、AI Agent、多模态、开源等方向",
};

export const dynamic = "force-dynamic";

const categories = [
  { key: "all", label: "全部" },
  { key: "llm", label: "大模型" },
  { key: "agents", label: "AI Agent" },
  { key: "tools", label: "开发工具" },
  { key: "multimodal", label: "多模态" },
  { key: "open-source", label: "开源" },
  { key: "research", label: "学术研究" },
];

export default async function NewsPage({ searchParams }: { searchParams: { cat?: string } }) {
  const category = (searchParams.cat || "all") as any;
  const news = await getNewsByCategory(category, 20);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📰 AI 新闻</h1>
        <p className="text-sm text-text-muted">最新人工智能新闻与动态</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <a
            key={cat.key}
            href={`/news${cat.key === "all" ? "" : `?cat=${cat.key}`}`}
            className={`pill transition-all ${category === cat.key ? "pill-active" : ""}`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无新闻" description="该分类下还没有新闻文章" />
      )}
    </div>
  );
}
