import Link from "next/link";
import { BookOpen, Code, Video, BookMarked } from "lucide-react";
import type { KnowledgeArticle } from "@/lib/types";

const categoryIcons: Record<string, React.ElementType> = {
  "claude-code": Code,
  codex: Code,
  bilibili: Video,
  books: BookMarked,
};

const categoryLabels: Record<string, string> = {
  "claude-code": "Claude Code",
  codex: "Codex",
  bilibili: "B站",
  books: "AI 书籍",
};

export function ArticleCard({ article }: { article: KnowledgeArticle }) {
  const Icon = categoryIcons[article.category] || BookOpen;
  const label = categoryLabels[article.category] || article.category;

  return (
    <Link href={`/knowledge/${article.slug}`} className="block group">
      <div className="glass-card-interactive h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill text-[10px] flex items-center gap-1">
            <Icon size={12} />
            {label}
          </span>
          {article.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] text-text-muted">{tag}</span>
          ))}
        </div>
        <h3 className="text-[15px] font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">
          {article.summary}
        </p>
      </div>
    </Link>
  );
}
