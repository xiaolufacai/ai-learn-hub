import { getSentimentBySlug, getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { SentimentBar } from "@/components/sentiment/sentiment-bar";
import { ViewpointList } from "@/components/sentiment/viewpoint-list";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";
import type { Controversy } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const analysis = await getSentimentBySlug(params.slug);
  if (!analysis) return { title: "舆情未找到" };
  let title = params.slug;
  try { const n = await getNewsBySlug(params.slug); title = n?.title || params.slug; } catch { /* ignore */ }
  return {
    title: `${title} — AI 舆情`,
    description: analysis.overall_summary || "AI 新闻舆情分析",
  };
}

export default async function SentimentDetailPage({ params }: { params: { slug: string } }) {
  const analysis = await getSentimentBySlug(params.slug);
  if (!analysis) notFound();

  let news = null;
  try { news = await getNewsBySlug(params.slug); } catch { /* DB unreachable, use mock data */ }
  const controversies = (analysis.key_controversies as unknown as Controversy[]) || [];
  const supporting = (analysis.supporting_views as unknown as any[]) || [];
  const opposing = (analysis.opposing_views as unknown as any[]) || [];
  const neutral = (analysis.neutral_views as unknown as any[]) || [];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/sentiment" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回舆情列表
      </Link>

      <article>
        <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-2 leading-tight">
          {news?.title || params.slug}
        </h1>

        {analysis.overall_summary && (
          <p className="text-[15px] text-text-secondary mb-6">
            {analysis.overall_summary}
          </p>
        )}

        <div className="glass-card mb-6">
          <h2 className="text-sm font-semibold text-text-primary mb-3">📈 情感分布</h2>
          <SentimentBar
            positive={analysis.positive_pct}
            negative={analysis.negative_pct}
            neutral={analysis.neutral_pct}
          />
          <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
            <Calendar size={12} />
            分析于 {formatDate(analysis.analyzed_at)}
          </div>
        </div>

        {controversies.length > 0 && (
          <div className="glass-card mb-6">
            <h2 className="text-sm font-semibold text-text-primary mb-3">⚡ 关键争议</h2>
            <div className="space-y-3">
              {controversies.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                  <span className="text-sm font-medium text-amber-400">{c.topic}</span>
                  <p className="text-xs text-text-muted mt-1">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <ViewpointList stance="supporting" views={supporting} />
          <ViewpointList stance="opposing" views={opposing} />
          <ViewpointList stance="neutral" views={neutral} />
        </div>

        {analysis.trend_judgment && (
          <div className="glass-card mt-6">
            <h2 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-accent" />
              趋势判断
            </h2>
            <p className="text-sm text-text-secondary">{analysis.trend_judgment}</p>
          </div>
        )}
      </article>
    </div>
  );
}
