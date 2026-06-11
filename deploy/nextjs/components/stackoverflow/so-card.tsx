import { ArrowUp, MessageCircle, Eye, User } from "lucide-react";
import type { StackOverflowQuestion } from "@/lib/types";

export function StackOverflowCard({ question }: { question: StackOverflowQuestion }) {
  const tags: string[] = typeof question.tags === "string" ? JSON.parse(question.tags) : (question.tags || []);

  return (
    <a href={question.url} target="_blank" rel="noopener" className="block group">
      <div className="glass-card-interactive h-full">
        <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2 mb-3">
          {question.title}
        </h3>

        {question.accepted_answer && (
          <p className="text-xs text-text-muted line-clamp-2 mb-3 p-2 rounded-lg bg-surface-hover border border-border">
            💡 {question.accepted_answer.replace(/<[^>]+>/g, "").slice(0, 200)}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="text-[10px] text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/15">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1"><ArrowUp size={12} className="text-emerald-400" /> {question.votes}</span>
          <span className="flex items-center gap-1"><MessageCircle size={12} className="text-amber-400" /> {question.answers}</span>
          <span className="flex items-center gap-1"><Eye size={12} /> {question.views.toLocaleString()}</span>
          <span className="flex items-center gap-1 ml-auto"><User size={10} /> {question.author_name}</span>
        </div>
      </div>
    </a>
  );
}
