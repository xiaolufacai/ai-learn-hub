import Link from "next/link";
import { TrendingUp, Zap, AlertTriangle } from "lucide-react";

const MOCK_BRIEFS = [
  {
    news_slug: "openai-gpt-5",
    title: "GPT-5 发布引发全球热议",
    overall_summary: "多数开发者对其推理能力表示惊叹，但对定价和闭源策略持保留态度。开源社区加速追赶，预计未来 3 个月将出现多款对标产品。",
    positive_pct: 62,
    negative_pct: 18,
  },
  {
    news_slug: "deepseek-r2-",
    title: "DeepSeek R2 数学推理登顶",
    overall_summary: "国产模型的里程碑，数学领域最强选手。技术路线和开源策略获得普遍认可，少数人期待看到更多通用场景的表现。",
    positive_pct: 80,
    negative_pct: 3,
  },
  {
    news_slug: "langchain-v10-ai-agent-",
    title: "LangChain v1.0 争议与期待并存",
    overall_summary: "新架构获专家认可但破坏性更新引发不满，社区两极分化明显。部分开发者转向轻量替代方案，长期格局不变。",
    positive_pct: 55,
    negative_pct: 25,
  },
];

export function SentimentBriefs() {
  return (
    <div className="space-y-3">
      {MOCK_BRIEFS.map((b) => (
        <Link key={b.news_slug} href={`/sentiment/${b.news_slug}`} className="block p-4 rounded-xl border border-border hover:border-accent/20 hover:bg-surface-hover transition-all group">
          <div className="flex items-center gap-2 mb-2">
            {b.positive_pct >= 70 ? <TrendingUp size={14} className="text-emerald-400" /> : b.negative_pct >= 20 ? <AlertTriangle size={14} className="text-amber-400" /> : <Zap size={14} className="text-accent" />}
            <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{b.title}</span>
          </div>
          <p className="text-xs text-text-muted line-clamp-2">{b.overall_summary}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px]">
            <span className="text-emerald-400">👍 {b.positive_pct}%</span>
            <span className="text-red-400">👎 {b.negative_pct}%</span>
          </div>
        </Link>
      ))}
      <Link href="/sentiment" className="block text-center text-xs text-accent hover:text-accent-purple transition-colors">
        查看全部舆情 →
      </Link>
    </div>
  );
}
