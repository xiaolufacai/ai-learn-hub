import { getLatestNews, getXPosts, getLinuxDoPosts, getStackOverflowQuestions } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Clock, Globe, User, MessageCircle, Eye, Heart, ArrowUp } from "lucide-react";
import Link from "next/link";
import type { AiNews, XPost, LinuxDoPost, StackOverflowQuestion } from "@/lib/types";

export const dynamic = "force-dynamic";

type FeedItem = {
  type: "news" | "x" | "linuxdo" | "stackoverflow";
  time: Date;
  label: string;
  color: string;
  data: any;
};

export default async function HomePage() {
  const [news, xPosts, linuxdo, so] = await Promise.all([
    getLatestNews(10),
    getXPosts(10),
    getLinuxDoPosts(10),
    getStackOverflowQuestions(10),
  ]);

  const feed: FeedItem[] = [
    ...news.map((n: AiNews) => ({ type: "news" as const, time: new Date(n.published_at), label: "AI 新闻", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", data: n })),
    ...xPosts.map((x: XPost) => ({ type: "x" as const, time: new Date(x.published_at), label: "X 动态", color: "bg-sky-500/10 text-sky-400 border-sky-500/20", data: x })),
    ...linuxdo.map((l: LinuxDoPost) => ({ type: "linuxdo" as const, time: new Date(l.published_at), label: "Linux.do", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", data: l })),
    ...so.map((s: StackOverflowQuestion) => ({ type: "stackoverflow" as const, time: new Date(s.asked_at), label: "StackOverflow", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", data: s })),
  ];

  feed.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📡 最新动态</h1>
        <p className="text-sm text-text-muted">AI 行业实时信息流</p>
      </div>

      <div className="max-w-3xl space-y-3">
        {feed.slice(0, 40).map((item, i) => (
          <FeedCard key={`${item.type}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const d = item.data;

  switch (item.type) {
    case "news":
      return (
        <Link href={`/news/${d.slug}`} className="block group p-4 rounded-xl glass-card-interactive border-l-2 border-blue-500/30 hover:border-blue-500/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.color}`}>{item.label}</span>
            <span className="text-[11px] text-text-muted flex items-center gap-1"><Globe size={10} /> {d.source}</span>
            <span className="text-[11px] text-text-muted ml-auto flex items-center gap-1"><Clock size={10} /> {formatDate(d.published_at)}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">{d.title}</h3>
          <p className="text-[13px] text-text-muted line-clamp-2 mt-1">{d.summary}</p>
        </Link>
      );

    case "x":
      return (
        <Link href={`/x/${d.slug}`} className="block group p-4 rounded-xl glass-card-interactive border-l-2 border-sky-500/30 hover:border-sky-500/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.color}`}>{item.label}</span>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center text-[9px] font-bold text-white">{d.author_name?.[0]}</div>
            <span className="text-[11px] text-text-secondary">{d.author_name} <span className="text-text-muted">{d.author_handle}</span></span>
            <span className="text-[11px] text-text-muted ml-auto flex items-center gap-1"><Clock size={10} /> {formatDate(d.published_at)}</span>
          </div>
          <p className="text-[14px] text-text-primary leading-relaxed line-clamp-3 mt-1">{d.content}</p>
          <div className="flex items-center gap-4 text-[10px] text-text-muted mt-2">
            <span>❤ {d.likes}</span>
            <span>🔄 {d.retweets}</span>
            <span>💬 {d.replies}</span>
          </div>
        </Link>
      );

    case "linuxdo":
      return (
        <Link href={`/linuxdo/${d.slug}`} className="block group p-4 rounded-xl glass-card-interactive border-l-2 border-emerald-500/30 hover:border-emerald-500/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.color}`}>{item.label}</span>
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[9px] font-bold text-white">{d.author?.[0]}</div>
            <span className="text-[11px] text-text-secondary">{d.author}</span>
            <span className="text-[11px] text-text-muted ml-auto flex items-center gap-1"><Clock size={10} /> {formatDate(d.published_at)}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">{d.title}</h3>
          <div className="flex items-center gap-4 text-[10px] text-text-muted mt-2">
            <span className="flex items-center gap-1"><Eye size={10} /> {d.views}</span>
            <span className="flex items-center gap-1"><MessageCircle size={10} /> {d.replies}</span>
            <span className="flex items-center gap-1"><Heart size={10} /> {d.likes}</span>
          </div>
        </Link>
      );

    case "stackoverflow":
      const tags = typeof d.tags === "string" ? JSON.parse(d.tags) : (d.tags || []);
      return (
        <a href={d.url} target="_blank" rel="noopener" className="block group p-4 rounded-xl glass-card-interactive border-l-2 border-amber-500/30 hover:border-amber-500/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.color}`}>{item.label}</span>
            {tags.slice(0, 3).map((t: string) => (
              <span key={t} className="text-[9px] text-text-muted bg-surface-hover px-1.5 py-0.5 rounded">{t}</span>
            ))}
            <span className="text-[11px] text-text-muted ml-auto flex items-center gap-1"><Clock size={10} /> {formatDate(d.asked_at)}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">{d.title}</h3>
          <div className="flex items-center gap-4 text-[10px] text-text-muted mt-2">
            <span className="flex items-center gap-1 text-emerald-400"><ArrowUp size={10} /> {d.votes}</span>
            <span className="flex items-center gap-1 text-amber-400"><MessageCircle size={10} /> {d.answers}</span>
            <span className="flex items-center gap-1"><Eye size={10} /> {d.views.toLocaleString()}</span>
          </div>
        </a>
      );
  }
}
