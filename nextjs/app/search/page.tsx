import { searchAll } from "@/lib/content";
import { NewsCard } from "@/components/news/news-card";
import { RepoCard } from "@/components/trending/repo-card";
import { ToolCard } from "@/components/tools/tool-card";
import { McpCard } from "@/components/mcp/mcp-card";
import { ArticleCard } from "@/components/knowledge/article-card";
import { XPostCard } from "@/components/x/x-post-card";
import { LinuxDoCard } from "@/components/linuxdo/linuxdo-card";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索 AI 新闻、GitHub 项目、AI 工具、MCP 服务器和知识库文章",
};

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const results = query ? await searchAll(query) : null;
  const hasResults = results && (
    results.news.length > 0 ||
    results.projects.length > 0 ||
    results.tools.length > 0 ||
    results.mcp.length > 0 ||
    results.knowledge.length > 0 ||
    results.x.length > 0 ||
    results.linuxdo.length > 0
  );

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🔍 搜索</h1>
        <p className="text-sm text-text-muted mb-4">跨板块搜索所有内容</p>
        <SearchInput placeholder="搜索 AI 新闻、工具、项目..." />
      </div>

      {query && !results && (
        <div className="glass-card flex items-center justify-center py-12">
          <div className="animate-pulse text-text-muted text-sm">搜索中...</div>
        </div>
      )}

      {results && !hasResults && (
        <EmptyState title="未找到结果" description={`没有找到与 "${query}" 相关的内容`} />
      )}

      {results && hasResults && (
        <div className="space-y-8">
          {results.news.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">📰 AI 新闻</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.news.map((item) => <NewsCard key={item.id} news={item} />)}
              </div>
            </section>
          )}

          {results.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">⭐ GitHub 项目</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.projects.map((item) => <RepoCard key={item.id} project={item} />)}
              </div>
            </section>
          )}

          {results.tools.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🛠️ AI 工具</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.tools.map((item) => <ToolCard key={item.id} tool={item} />)}
              </div>
            </section>
          )}

          {results.mcp.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🔌 MCP 服务器</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.mcp.map((item) => <McpCard key={item.id} server={item} />)}
              </div>
            </section>
          )}

          {results.knowledge.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">📚 知识库</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.knowledge.map((item) => <ArticleCard key={item.id} article={item} />)}
              </div>
            </section>
          )}

          {results.x.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🐦 X 动态</h2>
              <div className="max-w-2xl space-y-3">
                {results.x.map((item) => <XPostCard key={item.id} post={item} />)}
              </div>
            </section>
          )}

          {results.linuxdo.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🐧 Linux.do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.linuxdo.map((item) => <LinuxDoCard key={item.id} post={item} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
