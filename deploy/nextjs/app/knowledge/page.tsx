import { getKnowledgeArticles } from "@/lib/content";
import { ArticleCard } from "@/components/knowledge/article-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "知识库",
  description: "AI 知识库 — Claude Code、Codex、B站教程、AI 书籍推荐",
};

export const dynamic = "force-dynamic";

const tabs = [
  { key: "all", label: "全部" },
  { key: "claude-code", label: "Claude Code" },
  { key: "codex", label: "Codex" },
  { key: "bilibili", label: "B站教程" },
  { key: "books", label: "AI 书籍" },
];

export default async function KnowledgePage({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || "all";
  const articles = await getKnowledgeArticles(tab === "all" ? undefined : tab);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📚 知识库</h1>
        <p className="text-sm text-text-muted">AI 开发知识与学习资源</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <a key={t.key} href={`/knowledge${t.key === "all" ? "" : `?tab=${t.key}`}`} className={`pill transition-all ${tab === t.key ? "pill-active" : ""}`}>
            {t.label}
          </a>
        ))}
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无文章" description="知识库文章正在准备中" />
      )}
    </div>
  );
}
