import Link from "next/link";
import { Eye, MessageSquare, Heart, Clock, User } from "lucide-react";

const MOCK_X = [
  { author_name: "Andrej Karpathy", author_handle: "@karpathy", content: "Just tried the new LLM capabilities and I'm genuinely impressed. The reasoning depth has improved significantly.", likes: 4821, created_at: new Date(Date.now() - 7200000) },
  { author_name: "Jim Fan", author_handle: "@DrJimFan", content: "We're entering a new phase of AI development where models don't just predict — they think.", likes: 3502, created_at: new Date(Date.now() - 14400000) },
  { author_name: "Simon Willison", author_handle: "@simonw", content: "Hot discussion in the AI community today: Are we over-investing in model size?", likes: 2890, created_at: new Date(Date.now() - 18000000) },
  { author_name: "Yann LeCun", author_handle: "@ylecun", content: "New paper alert! The latest research shows fascinating results. Efficiency gains are outpacing raw size increases.", likes: 2156, created_at: new Date(Date.now() - 25200000) },
  { author_name: "Sam Altman", author_handle: "@sama", content: "The best AI tool isn't the most powerful model — it's the one with the best UX.", likes: 1890, created_at: new Date(Date.now() - 36000000) },
];

const MOCK_LINUXDO = [
  { title: "GPT-5 实际使用体验：推理能力确实提升明显", author: "AI探索者", replies: 124, views: 8234, likes: 256 },
  { title: "用 AI 重构 10 万行老项目的心得体会", author: "全栈工程师Leo", replies: 131, views: 6298, likes: 336 },
  { title: "Claude Code 深度评测：相比 Cursor 的优势与不足", author: "深度学习爱好者", replies: 98, views: 5412, likes: 189 },
  { title: "2026 年 AI Agent 开发框架横评", author: "MCP布道师", replies: 76, views: 3890, likes: 145 },
  { title: "RAG 系统性能优化实战", author: "开源贡献者小陈", replies: 53, views: 2760, likes: 112 },
];

function timeAgo(d: Date) {
  const h = Math.floor((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return "刚刚";
  if (h < 24) return `${h}小时前`;
  return `${Math.floor(h / 24)}天前`;
}

export function XFeed() {
  return (
    <div className="space-y-3">
      {MOCK_X.map((x, i) => (
        <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{x.author_name[0]}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-semibold text-text-primary">{x.author_name}</span>
              <span className="text-[10px] text-text-muted">{x.author_handle}</span>
              <span className="text-[10px] text-text-muted">· {timeAgo(x.created_at)}</span>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">{x.content}</p>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-text-muted">
              <span>❤ {x.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LinuxDoFeed() {
  return (
    <div className="space-y-2">
      {MOCK_LINUXDO.map((p, i) => (
        <Link key={i} href={`/linuxdo/${p.title.slice(0, 20)}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{p.author[0]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate group-hover:text-accent transition-colors">{p.title}</p>
            <div className="flex items-center gap-3 text-[10px] text-text-muted mt-0.5">
              <span className="flex items-center gap-0.5"><Eye size={10} /> {p.views}</span>
              <span className="flex items-center gap-0.5"><MessageSquare size={10} /> {p.replies}</span>
              <span className="flex items-center gap-0.5"><Heart size={10} /> {p.likes}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
