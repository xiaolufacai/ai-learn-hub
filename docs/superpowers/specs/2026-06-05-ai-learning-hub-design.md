# AI Learning Hub V2 Enterprise — Design Spec

**Date:** 2026-06-05
**Status:** Approved
**Topic:** Full-stack AI content aggregation website with multi-agent pipeline

---

## 1. Overview

AI Learning Hub V2 Enterprise is a Next.js website that aggregates AI-related content from multiple sources via a multi-agent pipeline. It serves as a one-stop dashboard for AI developers to track news, discover tools, explore GitHub trending projects, browse MCP servers, and access knowledge bases.

### Core Goal

Build a fully functional, dark-tech-themed dashboard website with real (or realistic) content across 6 content verticals, powered by a Supabase backend.

---

## 2. Architecture

### Three-Layer Pipeline

```
┌─────────────────────────────────────────────┐
│  Layer 1: Content Acquisition (12 Agents)    │
│  ai-news | github-trending | ai-tools        │
│  mcp-discovery | ai-books | bilibili          │
│  claude-code | codex | x | seo | publishing  │
├─────────────────────────────────────────────┤
│  Layer 2: Orchestration                     │
│  Validate → Deduplicate → Generate MDX       │
│  → SEO Optimize → Link Related → Publish    │
├─────────────────────────────────────────────┤
│  Layer 3: Presentation (Next.js Website)     │
│  Dashboard Home | News | Trending | Tools    │
│  MCP | Knowledge Base | Search               │
└─────────────────────────────────────────────┘
```

### Data Flow

1. Content agents produce structured data (title, summary, source, category, metadata)
2. Orchestrator validates, deduplicates, generates SEO metadata
3. Data is stored in Supabase PostgreSQL tables
4. Next.js reads from Supabase via `@supabase/supabase-js` SDK
5. Pages render with Server Components (RSC) where possible

---

## 3. Visual Design

### Style: Modern Glassmorphism Dark (玻璃态暗黑科技风)

A modern, layered dark aesthetic combining glassmorphism cards, gradient glow orbs, and rounded pill elements — inspired by Vercel/Linear design language but darker and more tech-forward.

**Core Design Principles:**
- **Glassmorphism**: `backdrop-filter: blur()` on semi-transparent card surfaces
- **Gradient Glow**: Radial gradient orbs as ambient background decoration
- **Soft Borders**: `rgba(255,255,255,0.08-0.12)` translucent borders on cards
- **Rounded Everything**: `border-radius: 12-20px` on cards, `rounded-full` on pills/tags
- **Purple-Blue Palette**: Gradient accents shifting from indigo (#6366f1) to violet (#a855f7)

| Element | Value |
|---------|-------|
| Background base | `#0c0c1d` (deep navy-black) |
| Background gradient | `linear-gradient(135deg, #0c0c1d, #1a1040, #0c0c1d)` |
| Card surface | `rgba(255,255,255,0.04)` with `backdrop-blur(12px)` |
| Card border | `rgba(255,255,255,0.08)` |
| Card hover border | `rgba(255,255,255,0.15)` |
| Primary accent | `#6366f1` (indigo) → `#a855f7` (violet) gradient |
| Secondary accent | `#22c55e` (green, for live/active states) |
| Text primary | `#f1f5f9` / `#e1e7ef` |
| Text secondary | `#94a3b8` / `#5c6174` |
| Glow orbs | `radial-gradient(circle, #6366f1, transparent 70%)` at 20-30% opacity |
| Tag pill bg | `rgba(99,102,241,0.12)` with `rgba(99,102,241,0.2)` border |
| Border radius | Cards: 16px, Buttons: 12px, Pills: 9999px |
| Code font | JetBrains Mono |
| Body font | Inter |

### Homepage Layout: Dashboard

```
┌──────────────────────────────────────────────────┐
│  Header: Logo | ⌘K Search... (glass bar)         │
├────────┬─────────────────────────────────────────┤
│        │  ╭──────────────────────────────────╮  │
│        │  │ 🔥 BREAKING: GPT-5 Released      │  │
│ Glass  │  │ (gradient glow behind hero card) │  │
│ Sidebar│  ╰──────────────────────────────────╯  │
│        │                                         │
│ 🏠 首页 │  ╭─News Feed──╮  ╭──Trend Panel────╮  │
│ 📰 新闻 │  │ glass card  │  │ ⭐ GitHub repos │  │
│ ⭐ Trend│  │ glass card  │  │ 🛠️ Top Tools    │  │
│ 🛠️ 工具 │  │ glass card  │  │ 🔌 MCP servers   │  │
│ 🔌 MCP  │  ╰────────────╯  ╰─────────────────╯  │
│ 📚 知识库│                                         │
│         │  (ambient glow orbs floating behind)    │
└─────────┴─────────────────────────────────────────┘
```

- **Left sidebar**: Fixed, glass-effect, icons + labels with active glow indicator
- **Main area**: 2-column (feed + side panel), single column on mobile
- **Right panel**: Compact glass cards for trending/tools/mcp
- **Background**: Subtle animated gradient orbs at page corners

---

## 4. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | RSC, file-based routing, Vercel-native |
| Language | TypeScript (strict) | Type safety across the stack |
| Styling | Tailwind CSS | Dark mode, utility-first, shadcn/ui compat |
| Components | shadcn/ui | Accessible, customizable, dark-mode-native |
| Icons | Lucide Icons | Pairs with shadcn/ui |
| Database | Supabase (PostgreSQL) | Managed Postgres, real-time, JS SDK |
| SDK | `@supabase/supabase-js` | Official client, no ORM needed |
| Deployment | Vercel | Next.js native, edge functions |

---

## 5. Database Schema

Existing schema in `supabase/schema.sql` — extend as needed:

```sql
-- Fast data (agent-collected)
ai_news (id, title, summary, source, url, category, published_at, created_at)

-- Fast data (agent-collected)
github_projects (id, repo_name, description, stars, growth, category, language, url, created_at)

-- Slow data (AI-generated)
ai_tools (id, name, description, category, pricing, url, features, created_at)

-- Slow data (AI-generated)
mcp_servers (id, name, description, github_url, category, install_cmd, created_at)

-- Slow data (AI-generated) — NEW
ai_books (id, title, author, description, category, url, rating, created_at)

-- Knowledge base — NEW
knowledge_base (id, title, content_mdx, category, tags, slug, created_at)
```

**Schema additions needed:**
- `ai_books` table (books directory)
- `knowledge_base` table (Claude Code / Codex articles)
- Add `seo_title`, `meta_description`, `keywords` columns to all tables for SEO

---

## 6. Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard Home | Breaking news hero + latest feed + trend panel |
| `/news` | AI News List | Filterable timeline of all news |
| `/news/[slug]` | News Detail | Full article with MDX rendering |
| `/trending` | GitHub Trending | Repo cards grid with stars/growth |
| `/tools` | AI Tools Directory | Searchable, filterable tool cards |
| `/mcp` | MCP Servers | Server cards with install commands |
| `/knowledge` | Knowledge Base | Claude Code + Codex + AI Books |
| `/knowledge/[slug]` | Knowledge Article | MDX-rendered article |
| `/search` | Global Search | Cross-vertical search results |

---

## 7. Component Tree

```
Layout
├── Sidebar (NavLinks, CollapseToggle)
├── Header (Logo, SearchInput, ThemeToggle)
└── Main Content
    ├── HomePage
    │   ├── BreakingNews (hero card)
    │   ├── NewsFeed (NewsCard[])
    │   └── TrendPanel (TrendingCard[], ToolCard[], McpCard[])
    ├── NewsListPage
    │   ├── CategoryFilter (tabs)
    │   └── NewsCard[] (paginated)
    ├── NewsDetailPage
    │   └── MdxRenderer
    ├── TrendingPage
    │   ├── CategoryFilter
    │   └── RepoCard[] (grid)
    ├── ToolsPage
    │   ├── SearchBar
    │   ├── CategoryFilter
    │   └── ToolCard[] (grid)
    ├── McpPage
    │   ├── SearchBar
    │   └── McpCard[] (grid)
    ├── KnowledgePage
    │   ├── CategoryTabs (Claude Code | Codex | Books)
    │   └── ArticleCard[]
    ├── KnowledgeDetailPage
    │   └── MdxRenderer
    └── SearchPage
        └── SearchResult[] (mixed types)
```

---

## 8. Data Strategy

### Fast Data (Real, agent-collected)
- **AI News**: Web search for latest AI news headlines, summarize
- **GitHub Trending**: Fetch GitHub trending API/repos, real star counts
- **X (Twitter)**: Public AI influencer content summaries

### Slow Data (AI-generated, high-quality)
- **AI Tools**: Generate realistic tool catalog (Cursor, Copilot, etc.)
- **MCP Servers**: Generate realistic MCP server listings
- **AI Books**: Generate book entries with descriptions
- **Knowledge Base**: Generate Claude Code & Codex articles
- **B站**: Generate video content summaries

---

## 9. Non-Functional Requirements

- **Dark mode only** — default dark, no light mode toggle needed
- **Responsive** — sidebar collapses to hamburger on mobile
- **Performance** — Server Components for data fetching, minimal client JS
- **SEO** — Every page has unique `<title>`, `<meta description>`, Open Graph tags
- **Loading states** — Skeleton cards while data loads
- **Error states** — Error boundaries with retry buttons

---

## 10. Deliverables

1. **Next.js full website** — all 9 pages + components + dark theme
2. **Supabase database** — schema migrations + seeded data
3. **Content pipeline scripts** — agent scripts for data collection
4. **Generated content** — 50+ news items, 30+ tools, 20+ repos, 15+ MCP servers, 20+ knowledge articles
5. **SEO metadata** — per-page title/description/keywords/OG
6. **README** — setup, env vars, deploy instructions
