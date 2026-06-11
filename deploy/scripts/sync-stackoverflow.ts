/**
 * StackOverflow Trending Questions Sync
 * Uses free StackExchange API (no key required)
 * Usage: npx tsx sync-stackoverflow.ts
 */

import https from "https";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const TAGS = ["artificial-intelligence", "machine-learning", "llm", "langchain", "gpt", "deep-learning", "openai-api", "huggingface"];
const PAGE_SIZE = 30;

function stackApi(path: string): Promise<any> {
  return new Promise((resolve) => {
    https.get({
      hostname: "api.stackexchange.com",
      path: `${path}&site=stackoverflow&filter=withbody`,
      headers: { "User-Agent": "ai-learning-hub/2.0" },
    }, (res) => {
      let data = "";
      res.on("data", (c: string) => data += c);
      res.on("end", () => resolve(res.statusCode === 200 ? JSON.parse(data) : null));
    }).on("error", () => resolve(null));
  });
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s]+/g, "-").slice(0, 80);
}

async function fetchQuestions(tag: string, page = 1): Promise<any[]> {
  console.log(`  🔍 [${tag}]...`);
  const result = await stackApi(`/2.3/questions?page=${page}&pagesize=${PAGE_SIZE}&order=desc&sort=votes&tagged=${tag}`);
  if (!result || !result.items) { console.log(`    ⚠️ no results`); return []; }
  if (result.backoff) { console.log(`    ⏳ backoff ${result.backoff}s`); await new Promise(r => setTimeout(r, result.backoff * 1000 + 500)); }
  return result.items;
}

async function fetchAnswers(questionId: number): Promise<any> {
  const result = await stackApi(`/2.3/questions/${questionId}/answers?order=desc&sort=votes&pagesize=3`);
  if (!result || !result.items) return null;
  const accepted = result.items.find((a: any) => a.is_accepted);
  if (accepted) return accepted.body?.slice(0, 500) || null;
  return result.items[0]?.body?.slice(0, 300) || null;
}

async function main() {
  console.log("🔄 Syncing StackOverflow AI Questions...\n");

  const seen = new Set<number>();
  const allQuestions: any[] = [];

  for (const tag of TAGS) {
    const items = await fetchQuestions(tag);
    for (const q of items) {
      if (!seen.has(q.question_id)) {
        seen.add(q.question_id);
        allQuestions.push(q);
      }
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  const questions = allQuestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);

  console.log(`\n📊 Processing ${questions.length} questions...\n`);

  let count = 0;
  for (const q of questions) {
    const slug = slugify(q.title);
    const tags = q.tags || [];

    // Fetch accepted answer summary
    const acceptedAnswer = await fetchAnswers(q.question_id);
    const askedAt = new Date(q.creation_date * 1000);

    await prisma.stackOverflowQuestion.upsert({
      where: { question_id: q.question_id },
      update: {
        votes: q.score,
        answers: q.answer_count,
        views: q.view_count,
        accepted_answer: acceptedAnswer,
      },
      create: {
        question_id: q.question_id,
        title: q.title,
        body: q.body?.slice(0, 1000) || null,
        tags: JSON.stringify(tags),
        votes: q.score,
        answers: q.answer_count,
        views: q.view_count,
        url: q.link,
        author_name: q.owner?.display_name || "Unknown",
        author_reputation: q.owner?.reputation || null,
        accepted_answer: acceptedAnswer,
        slug,
        seo_title: `${q.title} - StackOverflow`,
        meta_description: (q.body || "").replace(/<[^>]+>/g, "").slice(0, 160),
        keywords: JSON.stringify(tags.slice(0, 5)),
        asked_at: askedAt,
        created_at: new Date(),
      },
    });

    count++;
    console.log(`  ${count}. ⭐${q.score} 💬${q.answer_count} 👁${q.view_count} — ${q.title.slice(0, 50)}`);
    await new Promise(r => setTimeout(r, 2500));
  }

  console.log(`\n✅ Synced ${count} StackOverflow questions`);
  await prisma.$disconnect();
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
