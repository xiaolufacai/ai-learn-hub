import { prisma } from "./db";
import type { ContentCategory } from "./types";

// SQLite stores JSON as TEXT strings — parse them back to objects
type AnyRecord = Record<string, any>;

const JSON_FIELDS: Record<string, string[]> = {
  aiNews: ["keywords"],
  githubProject: ["keywords"],
  aiTool: ["features", "keywords"],
  mcpServer: ["keywords"],
  aiBook: ["keywords"],
  knowledgeArticle: ["tags", "keywords"],
  xPost: ["media_urls", "keywords"],
  linuxDoPost: ["tags", "keywords"],
  sentimentAnalysis: ["supporting_views", "opposing_views", "neutral_views", "key_controversies"],
  stackOverflowQuestion: ["tags", "keywords"],
};

function parseItem(item: AnyRecord | null, model: string): any {
  if (!item) return item;
  const fields = JSON_FIELDS[model] || [];
  const parsed = { ...item };
  for (const f of fields) {
    const val = parsed[f];
    if (typeof val === "string") {
      try { parsed[f] = JSON.parse(val); } catch { /* keep raw */ }
    }
  }
  return parsed;
}

function parseList(items: any[], model: string): any[] {
  return items.map((item) => parseItem(item, model));
}

// --- AI News ---
export async function getLatestNews(limit = 10) {
  return parseList(await prisma.aiNews.findMany({ orderBy: { published_at: "desc" }, take: limit }), "aiNews");
}

export async function getNewsByCategory(category: ContentCategory, limit = 20) {
  return parseList(
    category === "all"
      ? await prisma.aiNews.findMany({ orderBy: { published_at: "desc" }, take: limit })
      : await prisma.aiNews.findMany({ where: { category }, orderBy: { published_at: "desc" }, take: limit }),
    "aiNews"
  );
}

export async function getNewsBySlug(slug: string) {
  return parseItem(await prisma.aiNews.findUnique({ where: { slug } }), "aiNews");
}

export async function getBreakingNews() {
  return parseItem(await prisma.aiNews.findFirst({ orderBy: { published_at: "desc" } }), "aiNews");
}

// --- GitHub Projects ---
export async function getTrendingProjects(limit = 20) {
  return parseList(await prisma.githubProject.findMany({ orderBy: { stars: "desc" }, take: limit }), "githubProject");
}

export async function getTopProjects(limit = 5) {
  return getTrendingProjects(limit);
}

// --- AI Tools ---
export async function getAiTools(limit = 30) {
  return parseList(await prisma.aiTool.findMany({ take: limit }), "aiTool");
}

// --- MCP Servers ---
export async function getMcpServers(limit = 20) {
  return parseList(await prisma.mcpServer.findMany({ take: limit }), "mcpServer");
}

// --- AI Books ---
export async function getAiBooks(limit = 20) {
  return parseList(await prisma.aiBook.findMany({ take: limit }), "aiBook");
}

// --- Knowledge Base ---
export async function getKnowledgeArticles(category?: string, limit = 20) {
  return parseList(
    category
      ? await prisma.knowledgeArticle.findMany({ where: { category }, take: limit })
      : await prisma.knowledgeArticle.findMany({ take: limit }),
    "knowledgeArticle"
  );
}

export async function getKnowledgeBySlug(slug: string) {
  return parseItem(await prisma.knowledgeArticle.findUnique({ where: { slug } }), "knowledgeArticle");
}

// --- Search ---
export async function searchAll(query: string) {
  const [news, projects, tools, mcp, knowledge, x, linuxdo] = await Promise.all([
    prisma.aiNews.findMany({ where: { OR: [{ title: { contains: query } }, { summary: { contains: query } }] }, take: 5 }),
    prisma.githubProject.findMany({ where: { OR: [{ repo_name: { contains: query } }, { description: { contains: query } }] }, take: 5 }),
    prisma.aiTool.findMany({ where: { OR: [{ name: { contains: query } }, { description: { contains: query } }] }, take: 5 }),
    prisma.mcpServer.findMany({ where: { OR: [{ name: { contains: query } }, { description: { contains: query } }] }, take: 5 }),
    prisma.knowledgeArticle.findMany({ where: { OR: [{ title: { contains: query } }, { summary: { contains: query } }] }, take: 5 }),
    prisma.xPost.findMany({ where: { OR: [{ content: { contains: query } }, { author_name: { contains: query } }] }, take: 5 }),
    prisma.linuxDoPost.findMany({ where: { OR: [{ title: { contains: query } }, { content: { contains: query } }] }, take: 5 }),
  ]);
  return {
    news: parseList(news, "aiNews"),
    projects: parseList(projects, "githubProject"),
    tools: parseList(tools, "aiTool"),
    mcp: parseList(mcp, "mcpServer"),
    knowledge: parseList(knowledge, "knowledgeArticle"),
    x: parseList(x, "xPost"),
    linuxdo: parseList(linuxdo, "linuxDoPost"),
  };
}

// --- X (Twitter) Posts ---
export async function getXPosts(limit = 30) {
  return parseList(await prisma.xPost.findMany({ orderBy: { published_at: "desc" }, take: limit }), "xPost");
}

export async function getXPostBySlug(slug: string) {
  return parseItem(await prisma.xPost.findUnique({ where: { slug } }), "xPost");
}

// --- Linux.do Posts ---
export async function getLinuxDoPosts(limit = 30) {
  return parseList(await prisma.linuxDoPost.findMany({ orderBy: { published_at: "desc" }, take: limit }), "linuxDoPost");
}

export async function getLinuxDoPostBySlug(slug: string) {
  return parseItem(await prisma.linuxDoPost.findUnique({ where: { slug } }), "linuxDoPost");
}

// --- Sentiment Analysis ---
export async function getSentimentAnalyses(limit = 20) {
  return parseList(
    await prisma.sentimentAnalysis.findMany({ orderBy: { analyzed_at: "desc" }, take: limit }),
    "sentimentAnalysis"
  );
}

export async function getSentimentBySlug(slug: string) {
  return parseItem(
    await prisma.sentimentAnalysis.findUnique({ where: { news_slug: slug } }),
    "sentimentAnalysis"
  );
}

// --- StackOverflow ---
export async function getStackOverflowQuestions(limit = 30) {
  return parseList(
    await prisma.stackOverflowQuestion.findMany({
      orderBy: { votes: "desc" },
      take: limit,
    }),
    "stackOverflowQuestion"
  );
}
