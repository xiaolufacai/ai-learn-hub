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
