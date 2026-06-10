import { getAiTools } from "@/lib/content";
import { ToolCard } from "@/components/tools/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 工具目录",
  description: "AI 开发工具大全，涵盖代码助手、模型平台、Agent 框架等分类",
};

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const tools = await getAiTools(50);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🛠️ AI 工具目录</h1>
        <p className="text-sm text-text-muted">发现最优秀的 AI 开发工具和平台</p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无工具" description="AI 工具数据正在准备中" />
      )}
    </div>
  );
}
