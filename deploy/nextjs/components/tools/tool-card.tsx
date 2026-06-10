import { ExternalLink } from "lucide-react";
import type { AiTool } from "@/lib/types";

interface ToolCardProps {
  tool: AiTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="glass-card-interactive h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">
            {tool.name}
          </h3>
          <ExternalLink size={14} className="text-text-muted flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
          {tool.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="pill text-[10px]">{tool.category}</span>
          <span className="text-xs font-medium text-accent">{tool.pricing}</span>
        </div>
        {tool.features && tool.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {(tool.features as string[]).slice(0, 3).map((f: string, i: number) => (
              <span key={i} className="text-[10px] text-text-muted px-2 py-0.5 rounded-full bg-surface-hover">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
