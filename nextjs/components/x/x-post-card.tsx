import Link from "next/link";
import { Heart, Repeat, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { XPost } from "@/lib/types";

interface XPostCardProps {
  post: XPost;
}

export function XPostCard({ post }: XPostCardProps) {
  return (
    <Link href={`/x/${post.slug}`} className="block group">
      <article className="glass-card-interactive">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {post.author_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">{post.author_name}</span>
              <span className="text-xs text-text-muted">{post.author_handle}</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted">
                <Clock size={11} />
                {formatDate(post.published_at)}
              </span>
            </div>
          </div>
          <ExternalLink size={13} className="text-text-muted flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-line mb-3">
          {post.content}
        </p>

        <div className="flex items-center gap-5 text-xs text-text-muted">
          <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
            <Heart size={13} />
            {post.likes > 0 ? post.likes : ""}
          </span>
          <span className="flex items-center gap-1 hover:text-green-400 transition-colors">
            <Repeat size={13} />
            {post.retweets > 0 ? post.retweets : ""}
          </span>
          <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <MessageCircle size={13} />
            {post.replies > 0 ? post.replies : ""}
          </span>
          <span className="pill text-[10px] ml-auto">{post.category}</span>
        </div>
      </article>
    </Link>
  );
}
