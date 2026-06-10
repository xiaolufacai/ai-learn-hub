import { getMcpServers } from "@/lib/content";
import { McpCard } from "@/components/mcp/mcp-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP 服务器",
  description: "Model Context Protocol 服务器目录，为 AI 应用扩展能力",
};

export const dynamic = "force-dynamic";

export default async function McpPage() {
  const servers = await getMcpServers(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🔌 MCP 服务器</h1>
        <p className="text-sm text-text-muted">Model Context Protocol 服务器 — 扩展 AI 能力边界</p>
      </div>

      {servers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {servers.map((server) => (
            <McpCard key={server.id} server={server} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无数据" description="MCP 服务器数据正在收集中" />
      )}
    </div>
  );
}
