import { prisma } from "./db";
import type { ContentCategory } from "./types";

// --- AI News ---
export async function getLatestNews(limit = 10) {
  return prisma.aiNews.findMany({
    orderBy: { published_at: "desc" },
    take: limit,
  });
}

export async function getNewsByCategory(category: ContentCategory, limit = 20) {
  return category === "all"
    ? prisma.aiNews.findMany({
        orderBy: { published_at: "desc" },
        take: limit,
      })
    : prisma.aiNews.findMany({
        where: { category },
        orderBy: { published_at: "desc" },
        take: limit,
      });
}

export async function getNewsBySlug(slug: string) {
  return prisma.aiNews.findUnique({ where: { slug } });
}

export async function getBreakingNews() {
  return prisma.aiNews.findFirst({
    orderBy: { published_at: "desc" },
  });
}

// --- GitHub Projects ---
export async function getTrendingProjects(limit = 20) {
  return prisma.githubProject.findMany({
    orderBy: { stars: "desc" },
    take: limit,
  });
}

export async function getTopProjects(limit = 5) {
  return getTrendingProjects(limit);
}

// --- AI Tools ---
export async function getAiTools(limit = 30) {
  return prisma.aiTool.findMany({ take: limit });
}

// --- MCP Servers ---
export async function getMcpServers(limit = 20) {
  return prisma.mcpServer.findMany({ take: limit });
}

// --- AI Books ---
export async function getAiBooks(limit = 20) {
  return prisma.aiBook.findMany({ take: limit });
}

// --- Knowledge Base ---
export async function getKnowledgeArticles(category?: string, limit = 20) {
  return category
    ? prisma.knowledgeArticle.findMany({
        where: { category },
        take: limit,
      })
    : prisma.knowledgeArticle.findMany({ take: limit });
}

export async function getKnowledgeBySlug(slug: string) {
  return prisma.knowledgeArticle.findUnique({ where: { slug } });
}

// --- Search ---
export async function searchAll(query: string) {
  const [news, projects, tools, mcp, knowledge, x, linuxdo] = await Promise.all([
    prisma.aiNews.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { summary: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.githubProject.findMany({
      where: {
        OR: [
          { repo_name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.aiTool.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.mcpServer.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.knowledgeArticle.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { summary: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.xPost.findMany({
      where: {
        OR: [
          { content: { contains: query } },
          { author_name: { contains: query } },
        ],
      },
      take: 5,
    }),
    prisma.linuxDoPost.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
        ],
      },
      take: 5,
    }),
  ]);
  return { news, projects, tools, mcp, knowledge, x, linuxdo };
}

// --- X (Twitter) Posts ---
export async function getXPosts(limit = 30) {
  return prisma.xPost.findMany({
    orderBy: { published_at: "desc" },
    take: limit,
  });
}

export async function getXPostBySlug(slug: string) {
  return prisma.xPost.findUnique({ where: { slug } });
}

// --- Linux.do Posts ---
export async function getLinuxDoPosts(limit = 30) {
  return prisma.linuxDoPost.findMany({
    orderBy: { published_at: "desc" },
    take: limit,
  });
}

export async function getLinuxDoPostBySlug(slug: string) {
  return prisma.linuxDoPost.findUnique({ where: { slug } });
}

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
