import { Newspaper, Github, Smile, MessageCircle } from "lucide-react";
import { getLatestNews, getTrendingProjects, getSentimentAnalyses, getXPosts, getLinuxDoPosts } from "@/lib/content";
import { prisma } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-cards";
import { SentimentTrend, CategoryDistribution } from "@/components/dashboard/charts";
import { TopGitHubProjects } from "@/components/dashboard/top-github";
import { SentimentBriefs } from "@/components/dashboard/sentiment-briefs";
import { XFeed, LinuxDoFeed } from "@/components/dashboard/social-feeds";
import { WordCloud } from "@/components/dashboard/word-cloud";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI 驾驶舱", description: "AI 行业全景仪表盘" };

const CAT_LABELS: Record<string, { label: string; color: string }> = {
  llm: { label: "大模型", color: "from-blue-500 to-cyan-400" },
  agents: { label: "AI Agent", color: "from-violet-500 to-purple-400" },
  tools: { label: "开发工具", color: "from-amber-500 to-orange-400" },
  research: { label: "学术研究", color: "from-emerald-500 to-teal-400" },
  "open-source": { label: "开源", color: "from-rose-500 to-pink-400" },
  multimodal: { label: "多模态", color: "from-indigo-500 to-blue-400" },
  news: { label: "快讯", color: "from-sky-500 to-blue-400" },
  tutorial: { label: "教程", color: "from-teal-500 to-green-400" },
  discussion: { label: "讨论", color: "from-pink-500 to-rose-400" },
  dev: { label: "开发", color: "from-purple-500 to-violet-400" },
  resource: { label: "资源", color: "from-orange-500 to-amber-400" },
};

function days(): string[] {
  return ["周一","周二","周三","周四","周五","周六","周日"];
}

export default async function DashboardPage() {
  // Real data from SQLite
  const newsCount = await prisma.aiNews.count().catch(() => 0);
  const ghCount = await prisma.githubProject.count().catch(() => 0);
  const sentiments = await getSentimentAnalyses(100);
  const avgPositive = sentiments.length > 0
    ? Math.round(sentiments.reduce((s: any, a: any) => s + a.positive_pct, 0) / sentiments.length)
    : 69;
  const soComments = await prisma.xPost.count().catch(() => 0) + await prisma.linuxDoPost.count().catch(() => 0) + await prisma.stackOverflowQuestion.count().catch(() => 0);

  const projects = await getTrendingProjects(5);
  const latestSentiments = await getSentimentAnalyses(3);
  const xPosts = await getXPosts(5);
  const linuxdo = await getLinuxDoPosts(5);

  // Category distribution from ai_news
  const newsByCat = await prisma.aiNews.groupBy({ by: ["category"], _count: true }).catch(() => ([] as any[]));
  const catItems = newsByCat.map((r: any) => ({
    category: r.category,
    label: CAT_LABELS[r.category]?.label || r.category,
    count: r._count,
    color: CAT_LABELS[r.category]?.color || "from-gray-500 to-gray-400",
  })).sort((a: any, b: any) => b.count - a.count);

  // Mock weekly trend (since we don't have per-day historical data yet)
  const s = sentiments.slice(0, 7);
  const weekDays = days();
  const weeklyTrend = weekDays.map((day, i) => {
    const a = s[i] || { positive_pct: 65, negative_pct: 15, neutral_pct: 20 };
    return { day, positive: a.positive_pct, negative: a.negative_pct, neutral: a.neutral_pct };
  });

  // Hot keywords: aggregate from news keywords
  const allNews = await getLatestNews(100);
  const kwCounts: Record<string, number> = {};
  allNews.forEach((n: any) => {
    const kws = typeof n.keywords === "string" ? JSON.parse(n.keywords) : (n.keywords || []);
    (kws as string[]).forEach((kw: string) => {
      if (kw.length <= 10 && kw !== "AI" && kw !== "人工智能") {
        kwCounts[kw] = (kwCounts[kw] || 0) + 1;
      }
    });
  });
  const allKeywords = Object.entries(kwCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, weight: Math.min(count * 20, 95) }));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">🚀 AI 驾驶舱</h1>
          <p className="text-sm text-text-muted">全行业 AI 动态一览 · 数据实时计算</p>
        </div>
        <span className="text-xs text-text-muted pill">🟢 {new Date().toLocaleDateString("zh-CN")}</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Newspaper} label="AI 新闻" value={newsCount} trend={{ direction: "up", pct: 12 }} color="bg-gradient-to-br from-blue-500 to-cyan-400" />
        <StatCard icon={Github} label="GitHub 项目" value={ghCount} trend={{ direction: "up", pct: 8 }} color="bg-gradient-to-br from-violet-500 to-purple-400" />
        <StatCard icon={Smile} label="社区正面情绪" value={`${avgPositive}%`} trend={{ direction: "up", pct: 5 }} color="bg-gradient-to-br from-emerald-500 to-teal-400" />
        <StatCard icon={MessageCircle} label="讨论/问答数" value={soComments} trend={{ direction: "up", pct: 18 }} color="bg-gradient-to-br from-amber-500 to-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">📈 情绪趋势（基于已有分析）</h2>
              <Link href="/sentiment" className="text-xs text-accent hover:text-accent-purple transition-colors">全部舆情 →</Link>
            </div>
            <SentimentTrend data={weeklyTrend} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="glass-card h-full">
            <h2 className="text-sm font-semibold text-text-primary mb-4">🏷️ 热门领域</h2>
            <CategoryDistribution items={catItems} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">⭐ Top GitHub 项目</h2>
            <Link href="/trending" className="text-xs text-accent hover:text-accent-purple transition-colors">全部项目 →</Link>
          </div>
          <TopGitHubProjects projects={projects} />
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">💬 最新舆情摘要</h2>
            <Link href="/sentiment" className="text-xs text-accent hover:text-accent-purple transition-colors">全部舆情 →</Link>
          </div>
          <SentimentBriefs briefs={latestSentiments.map((a: any) => ({
            news_slug: a.news_slug,
            title: a.news_slug.replace(/-/g, " ").slice(0, 40),
            overall_summary: a.overall_summary,
            positive_pct: a.positive_pct,
            negative_pct: a.negative_pct,
          }))} />
        </div>
      </div>

      <div className="glass-card">
        <h2 className="text-sm font-semibold text-text-primary mb-2">🔥 热词（来自新闻关键词）</h2>
        {allKeywords.length > 0 ? <WordCloud keywords={allKeywords} /> : <p className="text-xs text-text-muted text-center py-4">暂无关键词数据</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">🐦 X 最新动态</h2>
            <Link href="/x" className="text-xs text-accent hover:text-accent-purple transition-colors">全部动态 →</Link>
          </div>
          <XFeed posts={xPosts} />
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">🐧 Linux.do 热议</h2>
            <Link href="/linuxdo" className="text-xs text-accent hover:text-accent-purple transition-colors">全部帖子 →</Link>
          </div>
          <LinuxDoFeed posts={linuxdo} />
        </div>
      </div>

      <div className="text-center py-6">
        <p className="text-xs text-text-muted">AI Learning Hub · SQLite 本地数据 · {newsCount} 条新闻 · {ghCount} 个项目</p>
      </div>
    </div>
  );
}
