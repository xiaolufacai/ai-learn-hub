import { getXPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Repeat, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getXPostBySlug(params.slug);
  if (!post) return { title: "动态未找到" };
  return {
    title: post.seo_title || `${post.author_name}: ${post.content.slice(0, 60)}...`,
    description: post.meta_description || post.content.slice(0, 160),
    keywords: post.keywords || [],
  };
}

export default async function XDetailPage({ params }: { params: { slug: string } }) {
  const post = await getXPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <Link href="/x" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回 X 动态
      </Link>

      <article>
        <div className="glass-card">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
              {post.author_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-text-primary">{post.author_name}</span>
                <span className="text-sm text-text-muted">{post.author_handle}</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-text-muted mt-1">
                <Clock size={12} />
                {formatDate(post.published_at)}
              </span>
            </div>
          </div>

          <p className="text-[15px] text-text-primary leading-relaxed whitespace-pre-line mb-6">
            {post.content}
          </p>

          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Heart size={16} /> {post.likes}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Repeat size={16} /> {post.retweets}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <MessageCircle size={16} /> {post.replies}
            </span>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-purple transition-colors ml-auto"
            >
              <ExternalLink size={14} />
              在 X 上查看
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
