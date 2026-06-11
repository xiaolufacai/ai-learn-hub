# AI 舆情模块 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 AI 舆情分析模块，通过 DeepSeek API 自动分析每条 AI 新闻的舆论观点和情感倾向，存入 MySQL，前端展示支持/反对/中立三方观点。

**Architecture:** 新建 `sentiment_analysis` 表通过 `news_slug` 关联 `ai_news`。sync 脚本调用 DeepSeek API 生成结构化分析 JSON，写入数据库。前端 2 个新页面 + 3 个新组件，复用现有 Prisma 数据层模式。

**Tech Stack:** Prisma, DeepSeek API, Next.js 14, TailwindCSS, lucide-react

---

### Task 1: 更新 Prisma Schema

**Files:**
- Modify: `deploy/nextjs/prisma/schema.prisma`

- [ ] **Step 1: 在 schema.prisma 末尾添加 SentimentAnalysis 模型**

在 `deploy/nextjs/prisma/schema.prisma` 末尾（最后一个 `}` 之后）追加：

```prisma
model SentimentAnalysis {
  id                Int      @id @default(autoincrement())
  news_slug         String   @unique @db.VarChar(255)
  positive_pct      Int
  negative_pct      Int
  neutral_pct       Int
  supporting_views  Json?
  opposing_views    Json?
  neutral_views     Json?
  key_controversies Json?
  trend_judgment    String?  @db.Text
  overall_summary   String?  @db.Text
  analyzed_at       DateTime @default(now())

  @@map("sentiment_analysis")
}
```

- [ ] **Step 2: 同步到 MySQL**

```bash
cd deploy/nextjs && npx prisma db push
```

Expected: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: 复制 schema 到 scripts 目录并重新生成**

```bash
Copy-Item deploy/nextjs/prisma/schema.prisma deploy/scripts/prisma/schema.prisma -Force
cd deploy/scripts && npx prisma generate
```

---

### Task 2: 更新 types.ts

**Files:**
- Modify: `deploy/nextjs/lib/types.ts`

- [ ] **Step 1: 在 types.ts 末尾添加 SentimentAnalysis 接口**

在 `deploy/nextjs/lib/types.ts` 末尾追加：

```typescript
export interface ViewPoint {
  point: string;
  influence_score: number;
  source_quote: string;
}

export interface Controversy {
  topic: string;
  detail: string;
}

export interface SentimentAnalysis {
  id: number;
  news_slug: string;
  positive_pct: number;
  negative_pct: number;
  neutral_pct: number;
  supporting_views: any;
  opposing_views: any;
  neutral_views: any;
  key_controversies: any;
  trend_judgment: string | null;
  overall_summary: string | null;
  analyzed_at: Date;
}
```

---

### Task 3: 更新 content.ts 数据层

**Files:**
- Modify: `deploy/nextjs/lib/content.ts`

- [ ] **Step 1: 在 content.ts 末尾添加 2 个查询函数**

在 `deploy/nextjs/lib/content.ts` 末尾追加：

```typescript
// --- Sentiment Analysis ---
export async function getSentimentAnalyses(limit = 20) {
  return prisma.sentimentAnalysis.findMany({
    orderBy: { analyzed_at: "desc" },
    take: limit,
  });
}

export async function getSentimentBySlug(slug: string) {
  return prisma.sentimentAnalysis.findUnique({ where: { news_slug: slug } });
}
```

---

### Task 4: 创建 sync-sentiment.ts

**Files:**
- Create: `deploy/scripts/sync-sentiment.ts`

- [ ] **Step 1: 创建 sync-sentiment.ts**

创建 `deploy/scripts/sync-sentiment.ts`：

```typescript
/**
 * Sentiment Analysis Sync Script
 * 调用 DeepSeek API 分析每条 AI 新闻的舆情，写入 sentiment_analysis 表
 * Usage: DEEPSEEK_API_KEY=sk-xxx npx tsx sync-sentiment.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

async function analyzeSentiment(news: { title: string; summary: string }) {
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "sk-your-key") {
    throw new Error("DEEPSEEK_API_KEY not set");
  }

  const prompt = `你是一个专业的AI舆情分析师。请分析以下AI新闻的公众舆论，以严格JSON格式返回（不要包含markdown代码块标记）：

新闻标题：${news.title}
新闻摘要：${news.summary}

请返回格式：
{
  "positive_pct": 数字(0-100),
  "negative_pct": 数字(0-100),
  "neutral_pct": 数字(0-100),
  "supporting_views": [
    {"point": "支持观点描述", "influence_score": 数字(1-10), "source_quote": "代表性引言（社区/专家的语气，15字以内）"}
  ],
  "opposing_views": [
    {"point": "反对观点描述", "influence_score": 数字(1-10), "source_quote": "代表性引言"}
  ],
  "neutral_views": [
    {"point": "中立观点描述", "influence_score": 数字(1-10), "source_quote": "代表性引言"}
  ],
  "key_controversies": [
    {"topic": "争议主题", "detail": "争议详情"}
  ],
  "trend_judgment": "整体趋势判断（50字以内）",
  "overall_summary": "舆情整体概述（100字以内）"
}

要求：
1. positive_pct + negative_pct + neutral_pct 必须等于100
2. 每种观点至少1条，最多4条
3. 观点要有深度，多角度分析
4. influence_score 分布合理（核心观点8-10，次要观点4-7）
5. 基于新闻内容推理真实社区反应，不要编造`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一个专业的AI舆情分析师。总是返回严格JSON格式，不包含代码块标记。" },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error ${response.status}: ${await response.text()}`);
  }

  const data: any = await response.json();
  const content = data.choices[0].message.content.trim();
  return JSON.parse(content.replace(/^```json\s*/, "").replace(/\s*```$/, ""));
}

async function main() {
  console.log("🔄 Syncing Sentiment Analysis...");
  console.log(`   API Key: ${DEEPSEEK_API_KEY ? DEEPSEEK_API_KEY.slice(0, 8) + "..." : "NOT SET"}\n`);

  // 找出还没有舆情分析的新闻
  const allNews = await prisma.aiNews.findMany({ orderBy: { published_at: "desc" } });
  const analyzed = await prisma.sentimentAnalysis.findMany({ select: { news_slug: true } });
  const analyzedSlugs = new Set(analyzed.map((a) => a.news_slug));

  const pending = allNews.filter((n) => !analyzedSlugs.has(n.slug));

  if (pending.length === 0) {
    console.log("✅ 所有新闻已有舆情分析");
    return;
  }

  console.log(`📊 待分析: ${pending.length} 条新闻\n`);

  let count = 0;
  for (const news of pending) {
    console.log(`  [${++count}/${pending.length}] 分析: ${news.title.slice(0, 40)}...`);

    try {
      const result = await analyzeSentiment({
        title: news.title,
        summary: news.summary,
      });

      await prisma.sentimentAnalysis.upsert({
        where: { news_slug: news.slug },
        update: {
          positive_pct: result.positive_pct,
          negative_pct: result.negative_pct,
          neutral_pct: result.neutral_pct,
          supporting_views: result.supporting_views,
          opposing_views: result.opposing_views,
          neutral_views: result.neutral_views,
          key_controversies: result.key_controversies,
          trend_judgment: result.trend_judgment,
          overall_summary: result.overall_summary,
          analyzed_at: new Date(),
        },
        create: {
          news_slug: news.slug,
          positive_pct: result.positive_pct,
          negative_pct: result.negative_pct,
          neutral_pct: result.neutral_pct,
          supporting_views: result.supporting_views,
          opposing_views: result.opposing_views,
          neutral_views: result.neutral_views,
          key_controversies: result.key_controversies,
          trend_judgment: result.trend_judgment,
          overall_summary: result.overall_summary,
          analyzed_at: new Date(),
        },
      });

      console.log(`    ✅ 正面${result.positive_pct}% 负面${result.negative_pct}% 中性${result.neutral_pct}%`);
      // 避免 API 限流
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err: any) {
      console.error(`    ❌ 失败: ${err.message}`);
    }
  }

  console.log(`\n✅ 舆情同步完成 — ${count} 条`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Sync failed:", err.message);
    process.exit(1);
  });
```

---

### Task 5: 创建 sentiment-bar 组件

**Files:**
- Create: `deploy/nextjs/components/sentiment/sentiment-bar.tsx`

- [ ] **Step 1: 创建 sentiment-bar.tsx**

```typescript
interface SentimentBarProps {
  positive: number;
  negative: number;
  neutral: number;
  compact?: boolean;
}

export function SentimentBar({ positive, negative, neutral, compact }: SentimentBarProps) {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className="flex h-2.5 rounded-full overflow-hidden bg-surface-hover">
        <div
          className="bg-emerald-500 transition-all"
          style={{ width: `${positive}%` }}
        />
        <div
          className="bg-red-400 transition-all"
          style={{ width: `${negative}%` }}
        />
        <div
          className="bg-gray-500 transition-all"
          style={{ width: `${neutral}%` }}
        />
      </div>
      <div className={cn("flex text-xs text-text-muted", compact ? "gap-2" : "gap-4")}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          看好 {positive}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          看空 {negative}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" />
          中性 {neutral}%
        </span>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
```

---

### Task 6: 创建 viewpoint-list 组件

**Files:**
- Create: `deploy/nextjs/components/sentiment/viewpoint-list.tsx`

- [ ] **Step 1: 创建 viewpoint-list.tsx**

```typescript
"use client";

import { MessageSquare, TrendingUp, Zap } from "lucide-react";
import type { ViewPoint } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Stance = "supporting" | "opposing" | "neutral";

const config: Record<Stance, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  supporting: { label: "支持方观点", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: TrendingUp },
  opposing:   { label: "反对方观点", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: Zap },
  neutral:    { label: "中立观点", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: MessageSquare },
};

export function ViewpointList({ stance, views }: { stance: Stance; views: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const c = config[stance];
  const Icon = c.icon;

  if (!views || views.length === 0) return null;

  const displayed = expanded ? views : views.slice(0, 2);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-lg", c.bg)}>
          <Icon size={14} className={c.color} />
        </div>
        <span className={cn("text-sm font-semibold", c.color)}>{c.label}</span>
        <span className="text-xs text-text-muted">({views.length})</span>
      </div>

      <div className="space-y-2">
        {displayed.map((v, i) => (
          <div key={i} className={cn("p-4 rounded-xl border", c.bg, c.border)}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-text-primary font-medium">{v.point}</p>
              <span className="text-xs text-text-muted ml-2 flex-shrink-0">
                影响力 {v.influence_score}/10
              </span>
            </div>
            <p className="text-xs text-text-muted italic">
              "{v.source_quote}"
            </p>
          </div>
        ))}
      </div>

      {views.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-accent hover:text-accent-purple transition-colors"
        >
          {expanded ? `收起其余 ${views.length - 2} 条` : `展开全部 ${views.length} 条`}
        </button>
      )}
    </div>
  );
}
```

---

### Task 7: 创建 sentiment-card 组件

**Files:**
- Create: `deploy/nextjs/components/sentiment/sentiment-card.tsx`

- [ ] **Step 1: 创建 sentiment-card.tsx**

```typescript
import Link from "next/link";
import { SentimentBar } from "./sentiment-bar";
import type { SentimentAnalysis, AiNews, Controversy } from "@/lib/types";

interface SentimentCardProps {
  analysis: SentimentAnalysis;
  news?: AiNews | null;
}

export function SentimentCard({ analysis, news }: SentimentCardProps) {
  const title = news?.title || analysis.news_slug;
  const slug = analysis.news_slug;
  const controversies = (analysis.key_controversies as Controversy[]) || [];

  return (
    <Link href={`/sentiment/${slug}`} className="block group">
      <div className="glass-card-interactive h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {analysis.overall_summary && (
          <p className="text-[13px] text-text-secondary line-clamp-2 mb-4">
            {analysis.overall_summary}
          </p>
        )}

        <SentimentBar
          positive={analysis.positive_pct}
          negative={analysis.negative_pct}
          neutral={analysis.neutral_pct}
          compact
        />

        {controversies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {controversies.slice(0, 2).map((c, i) => (
              <span key={i} className="text-[10px] text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                ⚡ {c.topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
```

---

### Task 8: 创建 /sentiment 列表页

**Files:**
- Create: `deploy/nextjs/app/sentiment/page.tsx`

- [ ] **Step 1: 创建 app/sentiment/page.tsx**

```typescript
import { getSentimentAnalyses, getLatestNews } from "@/lib/content";
import { SentimentCard } from "@/components/sentiment/sentiment-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 舆情",
  description: "AI 新闻舆情分析 — 了解社区对最新 AI 动态的观点与情感",
};

export const dynamic = "force-dynamic";

export default async function SentimentPage() {
  const analyses = await getSentimentAnalyses(30);
  const newsList = await getLatestNews(30);
  const newsMap = new Map(newsList.map((n) => [n.slug, n]));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📊 AI 舆情</h1>
        <p className="text-sm text-text-muted">
          最新 AI 新闻的社区观点与情感分析
        </p>
      </div>

      {analyses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {analyses.map((a) => (
            <SentimentCard
              key={a.id}
              analysis={a}
              news={newsMap.get(a.news_slug) || null}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <p className="text-lg mb-2">暂无舆情数据</p>
          <p className="text-sm">请先运行 sync-sentiment</p>
        </div>
      )}
    </div>
  );
}
```

---

### Task 9: 创建 /sentiment/[slug] 详情页

**Files:**
- Create: `deploy/nextjs/app/sentiment/[slug]/page.tsx`

- [ ] **Step 1: 创建 app/sentiment/[slug]/page.tsx**

```typescript
import { getSentimentBySlug, getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { SentimentBar } from "@/components/sentiment/sentiment-bar";
import { ViewpointList } from "@/components/sentiment/viewpoint-list";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";
import type { ViewPoint, Controversy } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const analysis = await getSentimentBySlug(params.slug);
  const news = await getNewsBySlug(params.slug);
  if (!analysis) return { title: "舆情未找到" };
  return {
    title: `${news?.title || params.slug} — AI 舆情`,
    description: analysis.overall_summary || "AI 新闻舆情分析",
  };
}

export default async function SentimentDetailPage({ params }: { params: { slug: string } }) {
  const analysis = await getSentimentBySlug(params.slug);
  if (!analysis) notFound();

  const news = await getNewsBySlug(params.slug);
  const controversies = (analysis.key_controversies as Controversy[]) || [];
  const supporting = (analysis.supporting_views as ViewPoint[]) || [];
  const opposing = (analysis.opposing_views as ViewPoint[]) || [];
  const neutral = (analysis.neutral_views as ViewPoint[]) || [];

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
```

---

### Task 10: 更新侧边栏导航

**Files:**
- Modify: `deploy/nextjs/components/layout/sidebar.tsx`

- [ ] **Step 1: 在 sidebar.tsx 中添加舆情导航项**

在 `deploy/nextjs/components/layout/sidebar.tsx` 的 `lucide-react` import 中添加 `BarChart3`：

```typescript
import {
  Home, Newspaper, TrendingUp, Wrench, Plug, BookOpen,
  Search, ChevronLeft, ChevronRight, Twitter, Terminal, BarChart3,
} from "lucide-react";
```

在 `navItems` 数组的 `/news` 之后插入：

```typescript
const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/news", label: "AI 新闻", icon: Newspaper },
  { href: "/sentiment", label: "AI 舆情", icon: BarChart3 },
  { href: "/x", label: "X 动态", icon: Twitter },
  // ... 其余不变
];
```

---

### Task 11: 更新定时任务 sync-cron.sh

**Files:**
- Modify: `deploy/scripts/sync-cron.sh`

- [ ] **Step 1: 在 for 循环中添加 sync-sentiment.ts**

在 `deploy/scripts/sync-cron.sh` 的 for 循环数组中添加：

```bash
for script in sync-github.ts sync-news.ts sync-x.ts sync-linuxdo.ts sync-sentiment.ts; do
```

---

### Task 12: 更新 .env 和 deploy.sh 添加 DeepSeek Key

**Files:**
- Modify: `deploy/nextjs/.env`

- [ ] **Step 1: .env 添加 DEEPSEEK_API_KEY**

在 `deploy/nextjs/.env` 末尾追加：

```
DEEPSEEK_API_KEY=sk-your-key
```

同时在 `deploy.sh` 的 .env 生成块和 systemd 服务中追加这行环境变量（用户部署时替换为实际 key）。

---

### Task 13: 本地构建验证

- [ ] **Step 1: TypeScript 检查**

```bash
cd deploy/nextjs && npx tsc --noEmit
```

Expected: 零错误

- [ ] **Step 2: 构建**

```bash
cd deploy/nextjs && npm run build
```

Expected: 构建成功

- [ ] **Step 3: 提交推送**

```bash
git add -A
git commit -m "feat: add AI sentiment analysis module with DeepSeek API"
git push
```

---

## Self-Review

**Spec coverage:**
- 数据库: Task 1 (schema.prisma)
- types.ts: Task 2
- content.ts: Task 3
- sync-sentiment.ts: Task 4 (DeepSeek API 调用)
- sentiment-bar 组件: Task 5
- viewpoint-list 组件: Task 6
- sentiment-card 组件: Task 7
- /sentiment 列表页: Task 8
- /sentiment/[slug] 详情页: Task 9
- 侧边栏导航: Task 10
- cron 更新: Task 11
- .env 配置: Task 12
- 构建验证: Task 13

**Placeholder 扫描:** 无 TBD/TODO，所有代码已完整写出。

**类型一致性:** SentimentAnalysis 接口 ↔ Prisma 模型 ↔ 组件 props 一致。
