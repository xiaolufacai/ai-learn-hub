import { getLinuxDoPosts } from "@/lib/content";
import { LinuxDoCard } from "@/components/linuxdo/linuxdo-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linux.do — 技术社区",
  description: "Linux.do 中文技术社区 AI 相关热门讨论帖",
};

export const dynamic = "force-dynamic";

export default async function LinuxDoPage() {
  const posts = await getLinuxDoPosts(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🐧 Linux.do — 技术社区</h1>
        <p className="text-sm text-text-muted">Linux.do 中文技术社区 AI 相关热门讨论</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <LinuxDoCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无内容" description="Linux.do 数据正在采集中" />
      )}
    </div>
  );
}
