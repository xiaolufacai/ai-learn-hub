import { Star, TrendingUp, ExternalLink } from "lucide-react";
import { formatStars } from "@/lib/utils";

const MOCK_PROJECTS = [
  { repo_name: "huggingface/transformers", stars: 145000, growth: 320, url: "https://github.com/huggingface/transformers", description: "State-of-the-art ML for PyTorch, TensorFlow, and JAX." },
  { repo_name: "ollama/ollama", stars: 120000, growth: 450, url: "https://github.com/ollama/ollama", description: "Get up and running with LLMs locally." },
  { repo_name: "langchain-ai/langchain", stars: 102000, growth: 280, url: "https://github.com/langchain-ai/langchain", description: "Build context-aware reasoning applications." },
  { repo_name: "deepseek-ai/DeepSeek-V3", stars: 88000, growth: 520, url: "https://github.com/deepseek-ai/DeepSeek-V3", description: "Open-Source MoE Language Model." },
  { repo_name: "punkpeye/awesome-mcp-servers", stars: 88731, growth: 226, url: "https://github.com/punkpeye/awesome-mcp-servers", description: "A collection of MCP servers." },
];

export function TopGitHubProjects() {
  return (
    <div className="space-y-3">
      {MOCK_PROJECTS.map((p, i) => (
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
