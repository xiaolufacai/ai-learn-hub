export interface AiNews {
  id: number;
  title: string;
  summary: string;
  content_mdx: string | null;
  source: string;
  url: string | null;
  category: string;
  image_url: string | null;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  published_at: Date;
  created_at: Date;
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
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  created_at: Date;
}

export interface AiTool {
  id: number;
  name: string;
  description: string;
  category: string;
  pricing: string;
  url: string;
  features: any;
  logo_url: string | null;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  created_at: Date;
}

export interface McpServer {
  id: number;
  name: string;
  description: string;
  github_url: string;
  category: string;
  install_cmd: string;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  created_at: Date;
}

export interface AiBook {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  url: string;
  rating: number;
  cover_url: string | null;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  created_at: Date;
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  content_mdx: string;
  category: string;
  tags: any;
  summary: string;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  created_at: Date;
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
  media_urls: any;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  published_at: Date;
  created_at: Date;
}

export interface LinuxDoPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: any;
  replies: number;
  views: number;
  likes: number;
  url: string;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  published_at: Date;
  created_at: Date;
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

export interface StackOverflowQuestion {
  id: number;
  question_id: number;
  title: string;
  body: string | null;
  tags: any;
  votes: number;
  answers: number;
  views: number;
  url: string;
  author_name: string;
  author_reputation: number | null;
  accepted_answer: string | null;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: any;
  asked_at: Date;
  created_at: Date;
}
