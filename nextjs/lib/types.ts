export interface AiNews {
  id: number;
  title: string;
  summary: string;
  content_mdx?: string;
  source: string;
  url?: string;
  category: string;
  image_url?: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  published_at: string;
  created_at: string;
}

export interface GithubProject {
  id: number;
  repo_name: string;
  description: string;
  stars: number;
  growth: number;
  category: string;
  language: string;
  url: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export interface AiTool {
  id: number;
  name: string;
  description: string;
  category: string;
  pricing: string;
  url: string;
  features: string[];
  logo_url?: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export interface McpServer {
  id: number;
  name: string;
  description: string;
  github_url: string;
  category: string;
  install_cmd: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export interface AiBook {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  url: string;
  rating: number;
  cover_url?: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  content_mdx: string;
  category: "claude-code" | "codex" | "bilibili" | "books";
  tags: string[];
  summary: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  created_at: string;
}

export interface XPost {
  id: number;
  author_name: string;
  author_handle: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  url: string;
  category: string;
  media_urls: string[];
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  published_at: string;
  created_at: string;
}

export interface LinuxDoPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  replies: number;
  views: number;
  likes: number;
  url: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  keywords?: string[];
  published_at: string;
  created_at: string;
}

export type SearchResult =
  | { type: "news"; item: AiNews }
  | { type: "project"; item: GithubProject }
  | { type: "tool"; item: AiTool }
  | { type: "mcp"; item: McpServer }
  | { type: "knowledge"; item: KnowledgeArticle }
  | { type: "x"; item: XPost }
  | { type: "linuxdo"; item: LinuxDoPost };

export type ContentCategory = "all" | "llm" | "agents" | "tools" | "multimodal" | "open-source" | "research";
