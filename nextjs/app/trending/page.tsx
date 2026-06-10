import { getTrendingProjects } from "@/lib/content";
import { RepoCard } from "@/components/trending/repo-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Trending",
  description: "GitHub 热门 AI 开源项目排行，实时追踪最受关注的 AI 仓库",
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const projects = await getTrendingProjects(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">⭐ GitHub Trending</h1>
        <p className="text-sm text-text-muted">最热门的 AI 开源项目</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <RepoCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无数据" description="GitHub 项目数据正在收集中" />
      )}
    </div>
  );
}
