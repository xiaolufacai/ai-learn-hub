import { getKnowledgeBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getKnowledgeBySlug(params.slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.seo_title || article.title,
    description: article.meta_description || article.summary,
    keywords: article.keywords || article.tags,
  };
}

export default async function KnowledgeDetailPage({ params }: { params: { slug: string } }) {
  const article = await getKnowledgeBySlug(params.slug);
  if (!article) notFound();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/knowledge" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回知识库
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-4">
          <span className="pill">{article.category}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Calendar size={12} />
            {formatDate(article.created_at)}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-1.5 mb-8 pb-6 border-b border-border">
          {article.tags?.map((tag) => (
            <span key={tag} className="text-[11px] text-text-muted px-2 py-0.5 rounded-full bg-surface-hover flex items-center gap-1">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed whitespace-pre-line text-[15px]">
          {article.content_mdx}
        </div>
      </article>
    </div>
  );
}
