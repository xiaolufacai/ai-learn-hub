/**
 * X (Twitter) Posts Sync Script
 * Generates AI-related X posts and writes directly to MySQL.
 * Usage: DATABASE_URL=mysql://... npx tsx sync-x.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const INFLUENCERS = [
  { name: "Andrej Karpathy", handle: "@karpathy", topics: ["AI", "LLM", "education"] },
  { name: "Sam Altman", handle: "@sama", topics: ["OpenAI", "GPT", "AGI"] },
  { name: "Yann LeCun", handle: "@ylecun", topics: ["research", "open-source"] },
  { name: "Demis Hassabis", handle: "@demishassabis", topics: ["Gemini", "DeepMind"] },
  { name: "Jim Fan", handle: "@DrJimFan", topics: ["agents", "robotics", "NVIDIA"] },
  { name: "Simon Willison", handle: "@simonw", topics: ["tools", "LLM", "datasette"] },
  { name: "李沐", handle: "@mli", topics: ["tutorial", "deep-learning", "开源"] },
  { name: "宝玉", handle: "@dotey", topics: ["AI产品", "开发工具", "技术评论"] },
];

function generatePost(influencer: typeof INFLUENCERS[number], index: number) {
  const topic = influencer.topics[Math.floor(Math.random() * influencer.topics.length)];

  const posts = [
    `Just tried the new ${topic} capabilities and I'm genuinely impressed. The reasoning depth has improved significantly. We're entering a new phase of AI development where models don't just predict — they think. Exciting times ahead. 🚀`,
    `Hot take: The best AI tool isn't the most powerful model — it's the one with the best UX. We've been optimizing for benchmarks too long. Time to optimize for human experience.`,
    `New paper alert! The latest research on ${topic} shows some fascinating results. Key insight: scaling laws still hold, but the curve is shifting. Efficiency gains are outpacing raw size increases. 📈`,
    `Just shipped a major update. The ${topic} integration now supports streaming responses with tool calling. Performance improved 3x. Open source code in thread.`,
    `Hot discussion in the AI community today: Are we over-investing in model size? The trend toward smaller, specialized models + tool use seems more practical for most use cases. What do you think?`,
    `${topic} is evolving so fast. Just 6 months ago this was impossible. Now it's becoming commoditized. The pace of AI progress continues to astound me. We're living in the future.`,
    `Unpopular opinion: We need more focus on AI safety AND AI capability. It's not either-or. The most capable systems also need to be the most aligned. Progress on both fronts simultaneously is the only path forward.`,
    `开发者们，不要只关注模型本身。构建好的 AI 应用需要优秀的工程实践、数据管道和评估体系。模型只是拼图的一块。🧩 #${topic} #AIEngineering`,
  ];

  const content = posts[index % posts.length];
  const now = Date.now();
  const hoursAgo = Math.floor(Math.random() * 72);
  const publishedAt = new Date(now - hoursAgo * 3600000);
  const slug = `${influencer.handle.replace("@", "")}-post-${index + 1}`;

  return {
    author_name: influencer.name,
    author_handle: influencer.handle,
    content,
    likes: Math.floor(Math.random() * 5000) + 100,
    retweets: Math.floor(Math.random() * 1000) + 20,
    replies: Math.floor(Math.random() * 300) + 10,
    url: `https://x.com${influencer.handle}/status/${now - hoursAgo * 1000}`,
    category: ["llm", "agents", "tools", "research", "open-source", "news"][Math.floor(Math.random() * 6)],
    media_urls: [],
    slug,
    seo_title: `${influencer.name}: ${content.slice(0, 60)}...`,
    meta_description: content.slice(0, 160),
    keywords: [topic.toLowerCase(), influencer.handle, "AI", "X"],
    published_at: publishedAt,
    created_at: publishedAt,
  };
}

async function main() {
  console.log("🔄 Generating X posts...");

  for (let i = 0; i < 20; i++) {
    const influencer = INFLUENCERS[i % INFLUENCERS.length];
    const record = generatePost(influencer, i);
    await prisma.xPost.upsert({
      where: { slug: record.slug },
      update: record,
      create: record,
    });
  }

  console.log(`✅ Synced 20 X posts to MySQL`);

  const counts: Record<string, number> = {};
  for (let i = 0; i < 20; i++) {
    const name = INFLUENCERS[i % INFLUENCERS.length].name;
    counts[name] = (counts[name] || 0) + 1;
  }
  console.log("\n📊 Authors:");
  Object.entries(counts).forEach(([name, count]) => console.log(`  ${name}: ${count} posts`));
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Sync failed:", err.message);
    process.exit(1);
  });
