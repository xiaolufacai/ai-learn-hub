"use client";

import { Copy, Github, Terminal } from "lucide-react";
import type { McpServer } from "@/lib/types";

interface McpCardProps {
  server: McpServer;
}

export function McpCard({ server }: McpCardProps) {
  return (
    <div className="glass-card-interactive h-full flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-text-primary">{server.name}</h3>
        <span className="pill text-[10px]">{server.category}</span>
      </div>
      <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
        {server.description}
      </p>
      {server.install_cmd && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 border border-border mb-3 group/code">
          <Terminal size={13} className="text-text-muted flex-shrink-0" />
          <code className="text-xs text-text-secondary font-mono flex-1 truncate">{server.install_cmd}</code>
          <button
            onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(server.install_cmd); }}
            className="text-text-muted hover:text-text-secondary transition-colors"
          >
            <Copy size={13} />
          </button>
        </div>
      )}
      <a
        href={server.github_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-purple transition-colors mt-auto"
      >
        <Github size={13} />
        GitHub →
      </a>
    </div>
  );
}
