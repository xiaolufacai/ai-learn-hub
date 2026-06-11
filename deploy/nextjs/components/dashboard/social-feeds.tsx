import Link from "next/link";
import { Eye, MessageSquare, Heart, Clock } from "lucide-react";

function timeAgo(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  const h = Math.floor((Date.now() - dt.getTime()) / 3600000);
  if (h < 1) return "刚刚";
  if (h < 24) return `${h}小时前`;
  return `${Math.floor(h / 24)}天前`;
}

export function XFeed({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-3">
      {posts.map((x, i) => (
        <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{x.author_name?.[0] || "?"}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-semibold text-text-primary">{x.author_name}</span>
              <span className="text-[10px] text-text-muted">{x.author_handle}</span>
              <span className="text-[10px] text-text-muted">· {timeAgo(x.published_at || x.created_at)}</span>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">{x.content}</p>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-text-muted">
              <span>❤ {x.likes}</span>
              <span>🔄 {x.retweets}</span>
              <span>💬 {x.replies}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LinuxDoFeed({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-2">
      {posts.map((p, i) => (
        <Link key={i} href={`/linuxdo/${p.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{p.author?.[0] || "?"}</div>
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
