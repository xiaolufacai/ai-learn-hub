import type { Metadata } from "next";
import { DashboardStatCards } from "@/components/dashboard/stat-cards";
import { SentimentTrend, CategoryDistribution } from "@/components/dashboard/charts";
import { TopGitHubProjects } from "@/components/dashboard/top-github";
import { SentimentBriefs } from "@/components/dashboard/sentiment-briefs";
import { XFeed, LinuxDoFeed } from "@/components/dashboard/social-feeds";
import { WordCloud } from "@/components/dashboard/word-cloud";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 驾驶舱",
  description: "AI 行业全景仪表盘 — 实时追踪 AI 新闻、舆情、GitHub 热门项目",
};

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">🚀 AI 驾驶舱</h1>
          <p className="text-sm text-text-muted">全行业 AI 动态一览</p>
        </div>
        <span className="text-xs text-text-muted pill">
          🟢 数据更新于 {new Date().toLocaleDateString("zh-CN")}
        </span>
      </div>

      {/* Row 1: Stat Cards */}
      <DashboardStatCards />

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Trend - 2 cols */}
        <div className="lg:col-span-2">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">📈 本周情绪走势</h2>
              <Link href="/sentiment" className="text-xs text-accent hover:text-accent-purple transition-colors">全部舆情 →</Link>
            </div>
            <SentimentTrend />
          </div>
        </div>
        {/* Category Distribution */}
        <div className="lg:col-span-1">
          <div className="glass-card h-full">
            <h2 className="text-sm font-semibold text-text-primary mb-4">🏷️ 热门领域</h2>
            <CategoryDistribution />
          </div>
        </div>
      </div>

      {/* Row 3: GitHub + Sentiment Briefs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">⭐ Top GitHub 项目</h2>
            <Link href="/trending" className="text-xs text-accent hover:text-accent-purple transition-colors">全部项目 →</Link>
          </div>
          <TopGitHubProjects />
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">💬 最新舆情摘要</h2>
            <Link href="/sentiment" className="text-xs text-accent hover:text-accent-purple transition-colors">全部舆情 →</Link>
          </div>
          <SentimentBriefs />
        </div>
      </div>

      {/* Row 4: Word Cloud */}
      <div className="glass-card">
        <h2 className="text-sm font-semibold text-text-primary mb-2">🔥 本周热词</h2>
        <WordCloud />
      </div>

      {/* Row 5: Social Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">🐦 X 最新动态</h2>
            <Link href="/x" className="text-xs text-accent hover:text-accent-purple transition-colors">全部动态 →</Link>
          </div>
          <XFeed />
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">🐧 Linux.do 热议</h2>
            <Link href="/linuxdo" className="text-xs text-accent hover:text-accent-purple transition-colors">全部帖子 →</Link>
          </div>
          <LinuxDoFeed />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-xs text-text-muted">AI Learning Hub · 数据来源：OpenAI / Anthropic / Google / GitHub / X / Linux.do</p>
      </div>
    </div>
  );
}
