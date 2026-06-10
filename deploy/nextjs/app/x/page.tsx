import { getXPosts } from "@/lib/content";
import { XPostCard } from "@/components/x/x-post-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X — AI 科技动态",
  description: "X(Twitter) 上 AI 领域大 V 的最新动态和讨论，追踪前沿观点",
};

export const dynamic = "force-dynamic";

export default async function XPage() {
  const posts = await getXPosts(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🐦 X — AI 科技动态</h1>
        <p className="text-sm text-text-muted">X(Twitter) 上 AI 领域的最新讨论和观点</p>
      </div>

      {posts.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-3">
          {posts.map((post) => (
            <XPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无内容" description="X 动态数据正在采集中" />
      )}
    </div>
  );
}
