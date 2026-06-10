-- AI News (fast data - agent collected)
CREATE TABLE IF NOT EXISTS ai_news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content_mdx TEXT,
  source TEXT NOT NULL,
  url TEXT,
  category TEXT NOT NULL DEFAULT 'llm',
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GitHub Trending Projects (fast data)
CREATE TABLE IF NOT EXISTS github_projects (
  id BIGSERIAL PRIMARY KEY,
  repo_name TEXT NOT NULL,
  description TEXT,
  stars INT NOT NULL DEFAULT 0,
  growth INT NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'ai',
  language TEXT,
  url TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Tools (slow data - AI generated)
CREATE TABLE IF NOT EXISTS ai_tools (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'code-assistant',
  pricing TEXT DEFAULT 'Free',
  url TEXT,
  features TEXT[],
  logo_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MCP Servers (slow data)
CREATE TABLE IF NOT EXISTS mcp_servers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  github_url TEXT NOT NULL,
  category TEXT DEFAULT 'tools',
  install_cmd TEXT,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Books (slow data)
CREATE TABLE IF NOT EXISTS ai_books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'machine-learning',
  url TEXT,
  rating NUMERIC(2,1) DEFAULT 4.0,
  cover_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Base (slow data)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content_mdx TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'claude-code',
  tags TEXT[],
  summary TEXT,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_news_published_at ON ai_news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_news_category ON ai_news(category);
CREATE INDEX IF NOT EXISTS idx_ai_news_slug ON ai_news(slug);
CREATE INDEX IF NOT EXISTS idx_github_projects_stars ON github_projects(stars DESC);
CREATE INDEX IF NOT EXISTS idx_github_projects_category ON github_projects(category);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_category ON mcp_servers(category);
CREATE INDEX IF NOT EXISTS idx_ai_books_rating ON ai_books(rating DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_slug ON knowledge_base(slug);
