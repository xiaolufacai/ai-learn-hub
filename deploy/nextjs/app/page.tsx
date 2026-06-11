import { getLatestNews, getBreakingNews, getTopProjects, getAiTools, getMcpServers } from "@/lib/content";
import { BreakingNewsHero } from "@/components/news/breaking-news-hero";
import { NewsFeed } from "@/components/news/news-feed";
import { TrendPanel } from "@/components/trending/trend-panel";
import { SectionHeader } from "@/components/shared/section-header";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [breakingNews, latestNews, topProjects, tools, mcpServers] = await Promise.all([
    getBreakingNews(),
    getLatestNews(8),
    getTopProjects(5),
    getAiTools(5),
    getMcpServers(5),
  ]);

  return (
    <div className="animate-fade-in">
      {/* Breaking News Hero */}
      {breakingNews && (
        <div className="mb-8">
          <BreakingNewsHero news={breakingNews} />
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-2">
          <SectionHeader title="📰 最新动态" href="/news" linkLabel="查看全部" />
          <NewsFeed news={latestNews} />
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1">
          <TrendPanel projects={topProjects} tools={tools} mcp={mcpServers} />
        </div>
      </div>
    </div>
  );
}
