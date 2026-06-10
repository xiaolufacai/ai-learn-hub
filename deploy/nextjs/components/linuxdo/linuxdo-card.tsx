import Link from "next/link";
import { MessageSquare, Eye, Heart, Clock, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { LinuxDoPost } from "@/lib/types";

interface LinuxDoCardProps {
  post: LinuxDoPost;
}

export function LinuxDoCard({ post }: LinuxDoCardProps) {
  return (
    <Link href={`/linuxdo/${post.slug}`} className="block group">
      <article className="glass-card-interactive">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
            {post.author[0]}
          </div>
          <span className="text-xs text-text-muted">{post.author}</span>
          <span className="text-xs text-text-muted">·</span>
          <span className="flex items-center gap-1 text-[11px] text-text-muted">
            <Clock size={11} />
            {formatDate(post.published_at)}
          </span>
          <span className="pill text-[10px] ml-auto">{post.category}</span>
        </div>

        <h3 className="text-[15px] font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2 mb-3">
          {post.content}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Eye size={13} />
            {post.views}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={13} />
            {post.replies}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={13} />
            {post.likes}
          </span>
          {(post.tags as string[])?.slice(0, 2).map((t: string) => (
            <span key={t} className="text-[10px] text-text-muted ml-auto flex items-center gap-0.5">
              <Tag size={9} /> {t}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
