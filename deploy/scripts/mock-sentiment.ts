/**
 * Mock Sentiment Data Generator — 免 API 快速预览
 * Usage: npx tsx mock-sentiment.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const MOCK_VIEWS = {
  supporting: [
    { point: "该技术突破将大幅推动行业发展，是里程碑式的进步", influence_score: 9, source_quote: "这标志着新纪元的开始" },
    { point: "性能提升显著，实际应用场景广泛，值得投入", influence_score: 8, source_quote: "终于等到了，马上集成到产品中" },
    { point: "开源策略降低了使用门槛，有利于技术民主化", influence_score: 7, source_quote: "开源是最大的诚意" },
  ],
  opposing: [
    { point: "技术细节披露不足，真实效果有待验证", influence_score: 7, source_quote: "先看看独立评测再说" },
    { point: "成本过高，中小型团队很难承受", influence_score: 6, source_quote: "又是大厂才能玩得起的东西" },
    { point: "安全和伦理问题未充分讨论，仓促发布风险较大", influence_score: 8, source_quote: "安全红线不能碰" },
  ],
  neutral: [
    { point: "技术方向正确，但落地仍需时间验证", influence_score: 5, source_quote: "方向没错，耐心等几个月" },
    { point: "需要更多第三方评测数据才能做出判断", influence_score: 4, source_quote: "等更多 benchmark 结果" },
  ],
};

const MOCK_CONTROVERSIES = [
  { topic: "闭源 vs 开源", detail: "支持方认为商业闭源是合理选择，反对方呼吁更开放的生态。这一争论贯穿了整个 AI 行业的发展历程。" },
  { topic: "安全与伦理", detail: "新能力是否带来了新风险？社区对模型的安全边界和潜在滥用存在明显分歧。" },
];

async function main() {
  console.log("🔄 Generating mock sentiment data...\n");

  const news = await prisma.aiNews.findMany({
    where: { slug: { notIn: (await prisma.sentimentAnalysis.findMany({ select: { news_slug: true } })).map(a => a.news_slug) } },
    take: 25,
  });

  let count = 0;
  for (const n of news) {
    const positive = 40 + Math.floor(Math.random() * 31);
    const negative = 15 + Math.floor(Math.random() * 21);
    const neutral = 100 - positive - negative;

    await prisma.sentimentAnalysis.create({
      data: {
        news_slug: n.slug,
        positive_pct: positive,
        negative_pct: negative,
        neutral_pct: neutral,
        supporting_views: MOCK_VIEWS.supporting,
        opposing_views: MOCK_VIEWS.opposing,
        neutral_views: MOCK_VIEWS.neutral,
        key_controversies: MOCK_CONTROVERSIES,
        trend_judgment: "社区整体持谨慎乐观态度，多数人认可技术价值但关注落地成本和安全性，预计未来 3-6 个月会有更清晰的结论。",
        overall_summary: `${n.title}发布后，社区反响热烈。整体正面情绪占${positive}%，开发者群体尤其活跃。主要争议集中在商业化策略和安全边界上，多数人看好长期前景。`,
        analyzed_at: new Date(),
      },
    });
    count++;
  }

  console.log(`✅ Generated ${count} mock sentiment records`);
  await prisma.$disconnect();
}

main().catch((err) => { console.error("❌", err.message); process.exit(1); });
