import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";
import { formatStars } from "@/lib/utils";
import type { GithubProject } from "@/lib/types";

interface RepoCardProps {
  project: GithubProject;
  compact?: boolean;
}

export function RepoCard({ project, compact = false }: RepoCardProps) {
  const content = (
    <div className={compact ? "py-2" : "glass-card-interactive"}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">{project.repo_name}</h4>
          {!compact && (
            <p className="text-xs text-text-secondary mt-1 line-clamp-2">{project.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Star size={12} className="text-amber-400" />
              {formatStars(project.stars)}
            </span>
            {project.growth > 0 && (
              <span className="flex items-center gap-1 text-xs text-accent-green">
                <TrendingUp size={12} />
                +{project.growth}
              </span>
            )}
            {project.language && (
              <span className="text-[10px] text-text-muted">{project.language}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (compact) return content;
  return (
    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </Link>
  );
}
