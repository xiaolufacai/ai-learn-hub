import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import type { AiNews, GithubProject, AiTool, McpServer, KnowledgeArticle, AiBook, ContentCategory, XPost, LinuxDoPost } from "./types";

// Local JSON data store — reads from nextjs/data/*.json
function loadData<T>(filename: string): T {
  const filePath = resolve(process.cwd(), "data", filename);
  if (!existsSync(filePath)) return [] as unknown as T;
  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return [] as unknown as T;
  }
}

// --- AI News ---
export async function getLatestNews(limit = 10): Promise<AiNews[]> {
  const data = loadData<AiNews[]>("ai-news.json");
  return data.slice(0, limit);
}

export async function getNewsByCategory(category: ContentCategory, limit = 20): Promise<AiNews[]> {
  const data = loadData<AiNews[]>("ai-news.json");
  const filtered = category === "all" ? data : data.filter((n) => n.category === category);
  return filtered.slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<AiNews | null> {
  const data = loadData<AiNews[]>("ai-news.json");
  return data.find((n) => n.slug === slug) || null;
}

export async function getBreakingNews(): Promise<AiNews | null> {
  const data = loadData<AiNews[]>("ai-news.json");
  return data[0] || null;
}

// --- GitHub Projects ---
export async function getTrendingProjects(limit = 20): Promise<GithubProject[]> {
  const data = loadData<GithubProject[]>("github-projects.json");
  return data.slice(0, limit);
}

export async function getTopProjects(limit = 5): Promise<GithubProject[]> {
  return getTrendingProjects(limit);
}

// --- AI Tools ---
export async function getAiTools(limit = 30): Promise<AiTool[]> {
  const data = loadData<AiTool[]>("ai-tools.json");
  return data.slice(0, limit);
}

// --- MCP Servers ---
export async function getMcpServers(limit = 20): Promise<McpServer[]> {
  const data = loadData<McpServer[]>("mcp-servers.json");
  return data.slice(0, limit);
}

// --- AI Books ---
export async function getAiBooks(limit = 20): Promise<AiBook[]> {
  const data = loadData<AiBook[]>("ai-books.json");
  return data.slice(0, limit);
}

// --- Knowledge Base ---
export async function getKnowledgeArticles(category?: string, limit = 20): Promise<KnowledgeArticle[]> {
  const data = loadData<KnowledgeArticle[]>("knowledge-base.json");
  const filtered = category ? data.filter((a) => a.category === category) : data;
  return filtered.slice(0, limit);
}

export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeArticle | null> {
  const data = loadData<KnowledgeArticle[]>("knowledge-base.json");
  return data.find((a) => a.slug === slug) || null;
}

// --- Search ---
export async function searchAll(query: string) {
  const q = query.toLowerCase();
  const news = loadData<AiNews[]>("ai-news.json").filter((n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)).slice(0, 5);
  const projects = loadData<GithubProject[]>("github-projects.json").filter((p) => p.repo_name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)).slice(0, 5);
  const tools = loadData<AiTool[]>("ai-tools.json").filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)).slice(0, 5);
  const mcp = loadData<McpServer[]>("mcp-servers.json").filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)).slice(0, 5);
  const knowledge = loadData<KnowledgeArticle[]>("knowledge-base.json").filter((k) => k.title.toLowerCase().includes(q) || k.summary?.toLowerCase().includes(q)).slice(0, 5);
  const x = loadData<XPost[]>("x-posts.json").filter((p) => p.content.toLowerCase().includes(q) || p.author_name.toLowerCase().includes(q)).slice(0, 5);
  const linuxdo = loadData<LinuxDoPost[]>("linuxdo-posts.json").filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)).slice(0, 5);
  return { news, projects, tools, mcp, knowledge, x, linuxdo };
}

// --- X (Twitter) Posts ---
export async function getXPosts(limit = 30): Promise<XPost[]> {
  const data = loadData<XPost[]>("x-posts.json");
  return data.slice(0, limit);
}

export async function getXPostBySlug(slug: string): Promise<XPost | null> {
  const data = loadData<XPost[]>("x-posts.json");
  return data.find((p) => p.slug === slug) || null;
}

// --- Linux.do Posts ---
export async function getLinuxDoPosts(limit = 30): Promise<LinuxDoPost[]> {
  const data = loadData<LinuxDoPost[]>("linuxdo-posts.json");
  return data.slice(0, limit);
}

export async function getLinuxDoPostBySlug(slug: string): Promise<LinuxDoPost | null> {
  const data = loadData<LinuxDoPost[]>("linuxdo-posts.json");
  return data.find((p) => p.slug === slug) || null;
}
