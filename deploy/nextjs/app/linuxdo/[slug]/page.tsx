import { getLinuxDoPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, MessageSquare, Heart, Clock, Tag, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getLinuxDoPostBySlug(params.slug);
  if (!post) return { title: "帖子未找到" };
  return {
    title: post.seo_title || post.title,
    description: post.meta_description || post.content.slice(0, 160),
    keywords: (post.keywords || post.tags) as string[],
  };
}

export default async function LinuxDoDetailPage({ params }: { params: { slug: string } }) {
  const post = await getLinuxDoPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/linuxdo" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回 Linux.do
      </Link>

      <article>
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {post.author[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary flex items-center gap-1">
                  <User size={13} /> {post.author}
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={11} /> {formatDate(post.published_at)}
              </span>
            </div>
            <span className="pill text-[10px] ml-auto">{post.category}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="text-text-secondary leading-relaxed whitespace-pre-line text-[15px] mb-6">
            {post.content}
          </div>

          <div className="flex items-center gap-4 text-sm text-text-muted pt-4 border-t border-border">
            <span className="flex items-center gap-1"><Eye size={14} /> {post.views} 浏览</span>
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {post.replies} 回复</span>
            <span className="flex items-center gap-1"><Heart size={14} /> {post.likes} 赞</span>
            {(post.tags as string[])?.map((t: string) => (
              <span key={t} className="text-[11px] text-text-muted flex items-center gap-0.5 ml-auto">
                <Tag size={10} /> {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
