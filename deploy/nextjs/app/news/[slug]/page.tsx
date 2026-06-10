import { getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { Clock, Globe, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug);
  if (!news) return { title: "新闻未找到" };
  return {
    title: news.seo_title || news.title,
    description: news.meta_description || news.summary,
    keywords: (news.keywords || []) as string[],
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news) notFound();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回新闻列表
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-4">
          <span className="pill">{news.category}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={12} />
            {formatDate(news.published_at)}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
          {news.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-text-muted mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1">
            <Globe size={14} /> 来源: {news.source}
          </span>
          {news.url && (
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-purple transition-colors">
              阅读原文 →
            </a>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary leading-relaxed text-[15px] whitespace-pre-line">
            {news.summary}
          </p>
          {news.content_mdx && (
            <div className="mt-8 text-text-secondary leading-relaxed whitespace-pre-line">
              {news.content_mdx}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
