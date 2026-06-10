import type { GithubProject, AiTool, McpServer } from "@/lib/types";
import { RepoCard } from "./repo-card";
import { SectionHeader } from "../shared/section-header";

interface TrendPanelProps {
  projects: GithubProject[];
  tools: AiTool[];
  mcp: McpServer[];
}

export function TrendPanel({ projects, tools, mcp }: TrendPanelProps) {
  return (
    <div className="space-y-6">
      {/* GitHub Trending */}
      <div className="glass-card">
        <SectionHeader title="⭐ GitHub Trending" href="/trending" linkLabel="查看全部" />
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <RepoCard key={p.id} project={p} compact />
          ))}
        </div>
      </div>

      {/* Top Tools */}
      <div className="glass-card">
        <SectionHeader title="🛠️ 热门工具" href="/tools" linkLabel="查看全部" />
        <div className="space-y-2">
          {tools.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-1.5">
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-accent transition-colors truncate mr-2">
                {t.name}
              </a>
              <span className="text-[11px] text-text-muted whitespace-nowrap">{t.pricing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Servers */}
      <div className="glass-card">
        <SectionHeader title="🔌 MCP 服务器" href="/mcp" linkLabel="查看全部" />
        <div className="space-y-2">
          {mcp.map((s) => (
            <a
              key={s.id}
              href={s.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-primary hover:text-accent transition-colors py-1.5"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
