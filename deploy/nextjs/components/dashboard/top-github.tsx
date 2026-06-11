import { Star, TrendingUp, ExternalLink } from "lucide-react";
import { formatStars } from "@/lib/utils";

interface GHProject { repo_name: string; stars: number; growth: number; url: string; description: string; }

export function TopGitHubProjects({ projects }: { projects: GHProject[] }) {
  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <a key={p.repo_name} href={p.url} target="_blank" rel="noopener" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors group">
          <span className={`text-sm font-bold w-6 flex-shrink-0 ${i < 3 ? "text-amber-400" : "text-text-muted"}`}>
            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">{p.repo_name}</span>
              <ExternalLink size={10} className="text-text-muted opacity-0 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-text-muted line-clamp-1">{p.description}</p>
          </div>
          <div className="flex items-center gap-3 text-xs flex-shrink-0">
            <span className="flex items-center gap-1 text-text-secondary"><Star size={11} className="text-amber-400" /> {formatStars(p.stars)}</span>
            <span className="flex items-center gap-1 text-emerald-400"><TrendingUp size={11} /> +{p.growth}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
