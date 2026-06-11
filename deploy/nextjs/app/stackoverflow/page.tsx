import { getStackOverflowQuestions } from "@/lib/content";
import { StackOverflowCard } from "@/components/stackoverflow/so-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StackOverflow",
  description: "StackOverflow 热门 AI 问答 — 人工智能、机器学习、LLM 等技术问题",
};

export const dynamic = "force-dynamic";

export default async function StackOverflowPage() {
  const questions = await getStackOverflowQuestions(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📦 StackOverflow</h1>
        <p className="text-sm text-text-muted">
          AI 领域热门技术问答 — 来自 StackOverflow 社区
        </p>
      </div>

      {questions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {questions.map((q: any) => (
            <StackOverflowCard key={q.id} question={q} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <p className="text-lg mb-2">暂无 StackOverflow 数据</p>
          <p className="text-sm">请先运行 sync-stackoverflow 或 seed-stackoverflow</p>
        </div>
      )}
    </div>
  );
}
