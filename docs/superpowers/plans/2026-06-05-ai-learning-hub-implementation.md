# AI Learning Hub V2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, modern glassmorphism dark-themed Next.js 14 dashboard website with 9 pages, Supabase backend, and AI-generated content across 6 verticals.

**Architecture:** Next.js 14 App Router with Server Components for data fetching. Glassmorphism UI via Tailwind CSS + custom CSS. Supabase PostgreSQL accessed via `@supabase/supabase-js` SDK. Content stored in 6 database tables, rendered via server components with MDX support for knowledge articles.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons, Supabase, Vercel deployment

---

## File Structure Map

```
nextjs/
├── app/
│   ├── layout.tsx          — Root layout with sidebar + header + glow bg
│   ├── globals.css         — Global styles, glassmorphism utilities, glow animations
│   ├── page.tsx            — Homepage dashboard (modify existing)
│   ├── not-found.tsx       — 404 page
│   ├── error.tsx           — Global error boundary
│   ├── loading.tsx         — Global loading state
│   ├── news/
│   │   ├── page.tsx        — News list with category filter
│   │   └── [slug]/page.tsx — News detail with MDX rendering
│   ├── trending/page.tsx   — GitHub trending grid
│   ├── tools/page.tsx      — AI tools directory
│   ├── mcp/page.tsx        — MCP servers catalog
│   ├── knowledge/
│   │   ├── page.tsx        — Knowledge base hub
│   │   └── [slug]/page.tsx — Knowledge article detail
│   └── search/page.tsx     — Cross-vertical search
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx     — Glass sidebar with nav links
│   │   ├── header.tsx      — Top header with search trigger
│   │   ├── glow-background.tsx — Animated gradient orbs
│   │   └── mobile-nav.tsx  — Mobile hamburger menu
│   ├── news/
│   │   ├── news-card.tsx       — Individual news article card
│   │   ├── breaking-news-hero.tsx — Hero breaking news banner
│   │   └── news-feed.tsx       — News card list component
│   ├── trending/
│   │   ├── repo-card.tsx       — GitHub repo card
│   │   └── trend-panel.tsx     — Side panel for trending/tools/mcp
│   ├── tools/
│   │   └── tool-card.tsx       — AI tool card
│   ├── mcp/
│   │   └── mcp-card.tsx        — MCP server card
│   ├── knowledge/
│   │   └── article-card.tsx    — Knowledge article card
│   ├── shared/
│   │   ├── glass-card.tsx      — Reusable glassmorphism card wrapper
│   │   ├── section-header.tsx  — Section title with accent line
│   │   ├── category-filter.tsx — Category tab/pill filter bar
│   │   ├── search-input.tsx    — Search input with icon
│   │   ├── empty-state.tsx     — Empty results placeholder
│   │   ├── error-state.tsx     — Error with retry button
│   │   └── loading-skeleton.tsx — Skeleton loading cards
│   └── ui/                    — shadcn/ui components
│       ├── card.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── input.tsx
│       ├── skeleton.tsx
│       ├── tabs.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       └── avatar.tsx
├── lib/
│   ├── supabase.ts         — Supabase client singleton
│   ├── types.ts            — TypeScript type definitions
│   ├── content.ts          — Data fetching functions (modify existing)
│   ├── seo.ts              — SEO metadata helpers
│   └── utils.ts            — cn() helper, date formatting, slugify
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── components.json         — shadcn/ui config
└── .env.local              — Supabase env vars template

supabase/
├── schema.sql              — Full database schema (modify existing)
└── seed.sql                — Seed data SQL

scripts/
└── generate-content.ts     — Content generation script
```

---

## Phase 1: Project Scaffolding

### Task 1: Initialize Next.js project with TypeScript and Tailwind

**Files:**
- Create: `nextjs/package.json`
- Create: `nextjs/tsconfig.json`
- Create: `nextjs/tailwind.config.ts`
- Create: `nextjs/postcss.config.js`
- Create: `nextjs/next.config.js`
- Create: `nextjs/.env.local`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "ai-learning-hub",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@supabase/supabase-js": "^2.43.0",
    "lucide-react": "^0.378.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "next-mdx-remote": "^4.4.1",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd D:\www\ai-news\nextjs && npm install`
Expected: All packages install without errors

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0c1d",
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.08)",
        "border-hover": "rgba(255,255,255,0.15)",
        accent: {
          DEFAULT: "#6366f1",
          purple: "#a855f7",
          green: "#22c55e",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#5c6174",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        "glow-pulse": "glow-pulse 8s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { opacity: "0.2", transform: "scale(1)" },
          "100%": { opacity: "0.35", transform: "scale(1.15)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

- [ ] **Step 5: Create postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};
module.exports = nextConfig;
```

- [ ] **Step 7: Create .env.local**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- [ ] **Step 8: Verify dev server starts**

Run: `cd D:\www\ai-news\nextjs && npm run dev`
Expected: Next.js dev server starts on localhost:3000

---

## Phase 2: Foundation — Types, Utils, Supabase Client, Global CSS

### Task 2: Create shared type definitions

**Files:**
- Create: `nextjs/lib/types.ts`

- [ ] **Step 1: Write types.ts**

```typescript
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

export type SearchResult =
  | { type: "news"; item: AiNews }
  | { type: "project"; item: GithubProject }
  | { type: "tool"; item: AiTool }
  | { type: "mcp"; item: McpServer }
  | { type: "knowledge"; item: KnowledgeArticle };

export type ContentCategory = "all" | "llm" | "agents" | "tools" | "multimodal" | "open-source" | "research";
```

- [ ] **Step 2: Verify types compile**

Run: `cd D:\www\ai-news\nextjs && npx tsc --noEmit`
Expected: No type errors

---

### Task 3: Create utility functions

**Files:**
- Create: `nextjs/lib/utils.ts`

- [ ] **Step 1: Write utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

export function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return stars.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}
```

---

### Task 4: Create Supabase client

**Files:**
- Create: `nextjs/lib/supabase.ts`

- [ ] **Step 1: Write supabase.ts**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
```

---

### Task 5: Create global CSS with glassmorphism theme

**Files:**
- Create: `nextjs/app/globals.css`

- [ ] **Step 1: Write globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

@layer base {
  * {
    box-sizing: border-box;
  }

  body {
    background: #0c0c1d;
    color: #f1f5f9;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: rgba(99, 102, 241, 0.3);
    color: #f1f5f9;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  }

  .glass-hover {
    transition: all 0.2s ease;
  }

  .glass-hover:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.2s ease;
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
  }

  .glass-card-interactive {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .glass-card-interactive:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.1);
  }

  .pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
    background: rgba(99, 102, 241, 0.12);
    border: 1px solid rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }

  .pill-active {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    color: #c7d2fe;
  }

  .pill-green {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #86efac;
  }

  .glow-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .text-gradient {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .border-gradient {
    position: relative;
  }

  .border-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .skeleton-pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## Phase 3: Layout Components

### Task 6: Create GlowBackground component

**Files:**
- Create: `nextjs/components/layout/glow-background.tsx`

- [ ] **Step 1: Write glow-background.tsx**

```tsx
export function GlowBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Top-right orb */}
      <div
        className="glow-orb animate-glow-pulse"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -150,
          background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
        }}
      />
      {/* Bottom-left orb */}
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          left: -100,
          background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)",
          animation: "glow-pulse 10s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Center-right subtle orb */}
      <div
        className="glow-orb"
        style={{
          width: 300,
          height: 300,
          top: "50%",
          right: "20%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          animation: "glow-pulse 12s ease-in-out 2s infinite alternate",
        }}
      />
    </div>
  );
}
```

---

### Task 7: Create Sidebar component

**Files:**
- Create: `nextjs/components/layout/sidebar.tsx`

- [ ] **Step 1: Write sidebar.tsx**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Newspaper,
  TrendingUp,
  Wrench,
  Plug,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/news", label: "AI 新闻", icon: Newspaper },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/tools", label: "AI 工具", icon: Wrench },
  { href: "/mcp", label: "MCP 服务器", icon: Plug },
  { href: "/knowledge", label: "知识库", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[220px]"
        )}
      >
        <div className="glass m-3 flex-1 flex flex-col gap-1 p-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 px-3 py-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">◆</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm text-text-primary whitespace-nowrap">
                AI Hub
              </span>
            )}
          </Link>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group",
                    isActive
                      ? "bg-accent/15 text-accent border border-accent/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "flex-shrink-0",
                      isActive ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Search link and collapse toggle */}
          <div className="mt-auto flex flex-col gap-1 pt-2 border-t border-border">
            <Link
              href="/search"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-200 border border-transparent"
            >
              <Search size={20} className="text-text-muted" />
              {!collapsed && <span>搜索</span>}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-all duration-200"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              {!collapsed && <span>收起菜单</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass mx-3 mb-3 rounded-2xl">
        <div className="flex justify-around py-2 px-1">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-[10px] transition-colors",
                  isActive ? "text-accent" : "text-text-muted"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
```

---

### Task 8: Create Header component

**Files:**
- Create: `nextjs/components/layout/header.tsx`

- [ ] **Step 1: Write header.tsx**

```tsx
import Link from "next/link";
import { Search, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 lg:pl-[220px]">
      <div className="glass mx-3 mt-3 px-4 py-3 flex items-center justify-between">
        {/* Left: breadcrumb or page title */}
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-accent-green" />
          <span className="text-xs text-text-muted font-mono">ONLINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        </div>

        {/* Right: search trigger */}
        <Link
          href="/search"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-text-muted text-sm hover:border-border-hover hover:text-text-secondary transition-all"
        >
          <Search size={15} />
          <span className="hidden sm:inline">搜索文章、工具、仓库...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-hover text-[10px] text-text-muted font-mono border border-border ml-2">
            ⌘K
          </kbd>
        </Link>
      </div>
    </header>
  );
}
```

---

### Task 9: Create root layout

**Files:**
- Modify: `nextjs/app/layout.tsx` (create if not exists)

- [ ] **Step 1: Write layout.tsx**

```tsx
import type { Metadata } from "next";
import { GlowBackground } from "@/components/layout/glow-background";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Learning Hub — 人工智能学习中心",
    template: "%s | AI Learning Hub",
  },
  description: "一站式 AI 学习平台，聚合最新 AI 新闻、GitHub 热门项目、AI 工具目录、MCP 服务器、AI 书籍和知识库。",
  keywords: ["AI", "人工智能", "机器学习", "深度学习", "LLM", "MCP", "GitHub", "AI工具"],
  openGraph: {
    title: "AI Learning Hub — 人工智能学习中心",
    description: "一站式 AI 学习平台",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <GlowBackground />
        <Sidebar />
        <Header />
        <main className="lg:pl-[220px] relative z-10 min-h-screen">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
```

---

## Phase 4: Shared Components

### Task 10: Create GlassCard, SectionHeader, CategoryFilter, SearchInput

**Files:**
- Create: `nextjs/components/shared/glass-card.tsx`
- Create: `nextjs/components/shared/section-header.tsx`
- Create: `nextjs/components/shared/category-filter.tsx`
- Create: `nextjs/components/shared/search-input.tsx`

- [ ] **Step 1: Write glass-card.tsx**

```tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "a";
  href?: string;
}

export function GlassCard({ children, className, interactive = false, as: Component = "div", href }: GlassCardProps) {
  if (Component === "a" && href) {
    return (
      <a href={href} className={cn(interactive ? "glass-card-interactive" : "glass-card", className)}>
        {children}
      </a>
    );
  }
  return (
    <Component className={cn(interactive ? "glass-card-interactive" : "glass-card", className)}>
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Write section-header.tsx**

```tsx
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <a href={href} className="text-sm text-accent hover:text-accent-purple transition-colors">
          {linkLabel} →
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write category-filter.tsx**

```tsx
"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={cn(
            "pill transition-all duration-200",
            active === cat.key && "pill-active"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Write search-input.tsx**

```tsx
"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({ placeholder = "搜索...", className = "" }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 focus:bg-surface-hover transition-all"
      />
    </form>
  );
}
```

---

### Task 11: Create EmptyState, ErrorState, LoadingSkeleton

**Files:**
- Create: `nextjs/components/shared/empty-state.tsx`
- Create: `nextjs/components/shared/error-state.tsx`
- Create: `nextjs/components/shared/loading-skeleton.tsx`

- [ ] **Step 1: Write empty-state.tsx**

```tsx
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ title = "暂无内容", description = "还没有数据，请稍后再来" }: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
      <FileQuestion size={48} className="text-text-muted mb-4" />
      <h3 className="text-lg font-semibold text-text-secondary mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Write error-state.tsx**

```tsx
"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "加载失败", onRetry }: ErrorStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle size={48} className="text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-text-secondary mb-2">出错了</h3>
      <p className="text-sm text-text-muted mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent/15 text-accent border border-accent/20 rounded-xl text-sm hover:bg-accent/25 transition-all"
        >
          <RefreshCw size={15} />
          重试
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write loading-skeleton.tsx**

```tsx
interface LoadingSkeletonProps {
  count?: number;
  variant?: "card" | "list" | "hero";
}

export function LoadingSkeleton({ count = 6, variant = "card" }: LoadingSkeletonProps) {
  return (
    <div className={variant === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card animate-pulse">
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-4 w-3/4 mb-3" />
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-3 w-full mb-2" />
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-3 w-2/3 mb-4" />
          <div className="flex gap-2">
            <div className="skeleton-pulse bg-surface-hover rounded-full h-5 w-16" />
            <div className="skeleton-pulse bg-surface-hover rounded-full h-5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Phase 5: Data Fetching Layer

### Task 12: Create data fetching functions

**Files:**
- Modify: `nextjs/lib/content.ts` (replace existing stub)

- [ ] **Step 1: Rewrite content.ts with all fetch functions**

```typescript
import { supabase } from "./supabase";
import type { AiNews, GithubProject, AiTool, McpServer, KnowledgeArticle, AiBook, ContentCategory } from "./types";

// --- AI News ---
export async function getLatestNews(limit = 10): Promise<AiNews[]> {
  const { data, error } = await supabase
    .from("ai_news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) { console.error("getLatestNews:", error); return []; }
  return data;
}

export async function getNewsByCategory(category: ContentCategory, limit = 20): Promise<AiNews[]> {
  let query = supabase.from("ai_news").select("*").order("published_at", { ascending: false }).limit(limit);
  if (category !== "all") query = query.eq("category", category);
  const { data, error } = await query;
  if (error) { console.error("getNewsByCategory:", error); return []; }
  return data;
}

export async function getNewsBySlug(slug: string): Promise<AiNews | null> {
  const { data, error } = await supabase.from("ai_news").select("*").eq("slug", slug).single();
  if (error) { console.error("getNewsBySlug:", error); return null; }
  return data;
}

export async function getBreakingNews(): Promise<AiNews | null> {
  const { data, error } = await supabase
    .from("ai_news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(1)
    .single();
  if (error) { console.error("getBreakingNews:", error); return null; }
  return data;
}

// --- GitHub Projects ---
export async function getTrendingProjects(limit = 20): Promise<GithubProject[]> {
  const { data, error } = await supabase
    .from("github_projects")
    .select("*")
    .order("stars", { ascending: false })
    .limit(limit);
  if (error) { console.error("getTrendingProjects:", error); return []; }
  return data;
}

export async function getTopProjects(limit = 5): Promise<GithubProject[]> {
  return getTrendingProjects(limit);
}

// --- AI Tools ---
export async function getAiTools(limit = 30): Promise<AiTool[]> {
  const { data, error } = await supabase
    .from("ai_tools")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.error("getAiTools:", error); return []; }
  return data;
}

// --- MCP Servers ---
export async function getMcpServers(limit = 20): Promise<McpServer[]> {
  const { data, error } = await supabase
    .from("mcp_servers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.error("getMcpServers:", error); return []; }
  return data;
}

// --- AI Books ---
export async function getAiBooks(limit = 20): Promise<AiBook[]> {
  const { data, error } = await supabase
    .from("ai_books")
    .select("*")
    .order("rating", { ascending: false })
    .limit(limit);
  if (error) { console.error("getAiBooks:", error); return []; }
  return data;
}

// --- Knowledge Base ---
export async function getKnowledgeArticles(category?: string, limit = 20): Promise<KnowledgeArticle[]> {
  let query = supabase.from("knowledge_base").select("*").order("created_at", { ascending: false }).limit(limit);
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) { console.error("getKnowledgeArticles:", error); return []; }
  return data;
}

export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeArticle | null> {
  const { data, error } = await supabase.from("knowledge_base").select("*").eq("slug", slug).single();
  if (error) { console.error("getKnowledgeBySlug:", error); return null; }
  return data;
}

// --- Search ---
export async function searchAll(query: string) {
  const [news, projects, tools, mcp, knowledge] = await Promise.all([
    supabase.from("ai_news").select("*").ilike("title", `%${query}%`).limit(5).then(r => r.data || []),
    supabase.from("github_projects").select("*").ilike("repo_name", `%${query}%`).limit(5).then(r => r.data || []),
    supabase.from("ai_tools").select("*").ilike("name", `%${query}%`).limit(5).then(r => r.data || []),
    supabase.from("mcp_servers").select("*").ilike("name", `%${query}%`).limit(5).then(r => r.data || []),
    supabase.from("knowledge_base").select("*").ilike("title", `%${query}%`).limit(5).then(r => r.data || []),
  ]);
  return { news, projects, tools, mcp, knowledge };
}
```

---

## Phase 6: Homepage Components

### Task 13: Create BreakingNews hero and NewsCard

**Files:**
- Create: `nextjs/components/news/breaking-news-hero.tsx`
- Create: `nextjs/components/news/news-card.tsx`

- [ ] **Step 1: Write breaking-news-hero.tsx**

```tsx
import Link from "next/link";
import { Zap, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AiNews } from "@/lib/types";

interface BreakingNewsProps {
  news: AiNews;
}

export function BreakingNewsHero({ news }: BreakingNewsProps) {
  return (
    <Link href={`/news/${news.slug}`} className="block group">
      <div className="border-gradient rounded-card relative overflow-hidden">
        <div className="glass-card-interactive rounded-card relative z-10">
          {/* Glow behind hero */}
          <div
            className="absolute inset-0 rounded-card opacity-20"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.4), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 pill-green">
                <Zap size={12} />
                突发新闻
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={12} />
                {formatDate(news.published_at)}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
              {news.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3 max-w-2xl">
              {news.summary}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted">来源: {news.source}</span>
              <span className="pill text-[10px]">{news.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write news-card.tsx**

```tsx
import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AiNews } from "@/lib/types";

interface NewsCardProps {
  news: AiNews;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`} className="block group">
      <article className="glass-card-interactive">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="pill text-[10px]">{news.category}</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted">
                <Clock size={11} />
                {formatDate(news.published_at)}
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
              {news.title}
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">
              {news.summary}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[11px] text-text-muted">{news.source}</span>
              <ExternalLink size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
```

---

### Task 14: Create NewsFeed and TrendPanel

**Files:**
- Create: `nextjs/components/news/news-feed.tsx`
- Create: `nextjs/components/trending/trend-panel.tsx`
- Create: `nextjs/components/trending/repo-card.tsx`

- [ ] **Step 1: Write news-feed.tsx**

```tsx
import type { AiNews } from "@/lib/types";
import { NewsCard } from "./news-card";

interface NewsFeedProps {
  news: AiNews[];
}

export function NewsFeed({ news }: NewsFeedProps) {
  return (
    <div className="space-y-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write repo-card.tsx**

```tsx
import Link from "next/link";
import { Star, TrendingUp, GitFork } from "lucide-react";
import { formatStars } from "@/lib/utils";
import type { GithubProject } from "@/lib/types";

interface RepoCardProps {
  project: GithubProject;
  compact?: boolean;
}

export function RepoCard({ project, compact = false }: RepoCardProps) {
  const content = (
    <div className={compact ? "py-2" : "glass-card-interactive"}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">{project.repo_name}</h4>
          {!compact && (
            <p className="text-xs text-text-secondary mt-1 line-clamp-2">{project.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Star size={12} className="text-amber-400" />
              {formatStars(project.stars)}
            </span>
            {project.growth > 0 && (
              <span className="flex items-center gap-1 text-xs text-accent-green">
                <TrendingUp size={12} />
                +{project.growth}
              </span>
            )}
            {project.language && (
              <span className="text-[10px] text-text-muted">{project.language}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (compact) return content;
  return (
    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </Link>
  );
}
```

- [ ] **Step 3: Write trend-panel.tsx**

```tsx
import type { GithubProject, AiTool, McpServer } from "@/lib/types";
import { RepoCard } from "./repo-card";
import { SectionHeader } from "../shared/section-header";

interface TrendPanelProps {
  projects: GithubProject[];
  tools: AiTool[];
  mcp: McpServer[];
}

export function TrendPanel({ projects, tools, mcp }: TrendPanelProps) {
  return (
    <div className="space-y-6">
      {/* GitHub Trending */}
      <div className="glass-card">
        <SectionHeader title="⭐ GitHub Trending" href="/trending" linkLabel="查看全部" />
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <RepoCard key={p.id} project={p} compact />
          ))}
        </div>
      </div>

      {/* Top Tools */}
      <div className="glass-card">
        <SectionHeader title="🛠️ 热门工具" href="/tools" linkLabel="查看全部" />
        <div className="space-y-2">
          {tools.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-1.5">
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-accent transition-colors truncate mr-2">
                {t.name}
              </a>
              <span className="text-[11px] text-text-muted whitespace-nowrap">{t.pricing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Servers */}
      <div className="glass-card">
        <SectionHeader title="🔌 MCP 服务器" href="/mcp" linkLabel="查看全部" />
        <div className="space-y-2">
          {mcp.map((s) => (
            <a
              key={s.id}
              href={s.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-primary hover:text-accent transition-colors py-1.5"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### Task 15: Create Homepage

**Files:**
- Modify: `nextjs/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```tsx
import { getLatestNews, getBreakingNews, getTopProjects, getAiTools, getMcpServers } from "@/lib/content";
import { BreakingNewsHero } from "@/components/news/breaking-news-hero";
import { NewsFeed } from "@/components/news/news-feed";
import { TrendPanel } from "@/components/trending/trend-panel";
import { SectionHeader } from "@/components/shared/section-header";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [breakingNews, latestNews, topProjects, tools, mcpServers] = await Promise.all([
    getBreakingNews(),
    getLatestNews(8),
    getTopProjects(5),
    getAiTools(5),
    getMcpServers(5),
  ]);

  return (
    <div className="animate-fade-in">
      {/* Breaking News Hero */}
      {breakingNews && (
        <div className="mb-8">
          <BreakingNewsHero news={breakingNews} />
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-2">
          <SectionHeader title="📰 最新动态" href="/news" linkLabel="查看全部" />
          <NewsFeed news={latestNews} />
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1">
          <TrendPanel projects={topProjects} tools={tools} mcp={mcpServers} />
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 7: Content Pages

### Task 16: Create News List Page

**Files:**
- Create: `nextjs/app/news/page.tsx`

- [ ] **Step 1: Write news/page.tsx**

```tsx
import { getNewsByCategory } from "@/lib/content";
import { NewsCard } from "@/components/news/news-card";
import { CategoryFilter } from "@/components/shared/category-filter";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 新闻",
  description: "最新人工智能新闻动态，涵盖 LLM、AI Agent、多模态、开源等方向",
};

export const dynamic = "force-dynamic";

const categories = [
  { key: "all", label: "全部" },
  { key: "llm", label: "大模型" },
  { key: "agents", label: "AI Agent" },
  { key: "tools", label: "开发工具" },
  { key: "multimodal", label: "多模态" },
  { key: "open-source", label: "开源" },
  { key: "research", label: "学术研究" },
];

export default async function NewsPage({ searchParams }: { searchParams: { cat?: string } }) {
  const category = (searchParams.cat || "all") as any;
  const news = await getNewsByCategory(category);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📰 AI 新闻</h1>
        <p className="text-sm text-text-muted">最新人工智能新闻与动态</p>
      </div>

      <div className="mb-6">
        <CategoryFilter categories={categories} active={category} onChange={() => {}} />
      </div>

      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无新闻" description="该分类下还没有新闻文章" />
      )}
    </div>
  );
}
```

---

### Task 17: Create News Detail Page

**Files:**
- Create: `nextjs/app/news/[slug]/page.tsx`

- [ ] **Step 1: Write news/[slug]/page.tsx**

```tsx
import { getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { Clock, Globe, Tag, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug);
  if (!news) return { title: "新闻未找到" };
  return {
    title: news.seo_title || news.title,
    description: news.meta_description || news.summary,
    keywords: news.keywords || [],
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news) notFound();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回新闻列表
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-4">
          <span className="pill">{news.category}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={12} />
            {formatDate(news.published_at)}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
          {news.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-text-muted mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1">
            <Globe size={14} /> 来源: {news.source}
          </span>
          {news.url && (
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-purple transition-colors">
              阅读原文 →
            </a>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary leading-relaxed text-[15px] whitespace-pre-line">
            {news.summary}
          </p>
          {news.content_mdx && (
            <div className="mt-8 text-text-secondary leading-relaxed whitespace-pre-line">
              {news.content_mdx}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
```

---

### Task 18: Create Trending Page

**Files:**
- Create: `nextjs/app/trending/page.tsx`

- [ ] **Step 1: Write trending/page.tsx**

```tsx
import { getTrendingProjects } from "@/lib/content";
import { RepoCard } from "@/components/trending/repo-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Trending",
  description: "GitHub 热门 AI 开源项目排行，实时追踪最受关注的 AI 仓库",
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const projects = await getTrendingProjects(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">⭐ GitHub Trending</h1>
        <p className="text-sm text-text-muted">最热门的 AI 开源项目</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <RepoCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无数据" description="GitHub 项目数据正在收集中" />
      )}
    </div>
  );
}
```

---

### Task 19: Create AI Tools Page

**Files:**
- Create: `nextjs/app/tools/page.tsx`
- Create: `nextjs/components/tools/tool-card.tsx`

- [ ] **Step 1: Write tool-card.tsx**

```tsx
import { ExternalLink, Tag } from "lucide-react";
import type { AiTool } from "@/lib/types";

interface ToolCardProps {
  tool: AiTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="glass-card-interactive h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">
            {tool.name}
          </h3>
          <ExternalLink size={14} className="text-text-muted flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
          {tool.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="pill text-[10px]">{tool.category}</span>
          <span className="text-xs font-medium text-accent">{tool.pricing}</span>
        </div>
        {tool.features && tool.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {tool.features.slice(0, 3).map((f, i) => (
              <span key={i} className="text-[10px] text-text-muted px-2 py-0.5 rounded-full bg-surface-hover">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Write tools/page.tsx**

```tsx
import { getAiTools } from "@/lib/content";
import { ToolCard } from "@/components/tools/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 工具目录",
  description: "AI 开发工具大全，涵盖代码助手、模型平台、Agent 框架等分类",
};

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const tools = await getAiTools(50);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🛠️ AI 工具目录</h1>
        <p className="text-sm text-text-muted">发现最优秀的 AI 开发工具和平台</p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无工具" description="AI 工具数据正在准备中" />
      )}
    </div>
  );
}
```

---

### Task 20: Create MCP Servers Page

**Files:**
- Create: `nextjs/app/mcp/page.tsx`
- Create: `nextjs/components/mcp/mcp-card.tsx`

- [ ] **Step 1: Write mcp-card.tsx**

```tsx
import { Copy, Github, Terminal } from "lucide-react";
import type { McpServer } from "@/lib/types";

interface McpCardProps {
  server: McpServer;
}

export function McpCard({ server }: McpCardProps) {
  return (
    <div className="glass-card-interactive h-full flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-text-primary">{server.name}</h3>
        <span className="pill text-[10px]">{server.category}</span>
      </div>
      <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
        {server.description}
      </p>
      {server.install_cmd && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 border border-border mb-3 group/code">
          <Terminal size={13} className="text-text-muted flex-shrink-0" />
          <code className="text-xs text-text-secondary font-mono flex-1 truncate">{server.install_cmd}</code>
          <button
            onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(server.install_cmd); }}
            className="text-text-muted hover:text-text-secondary transition-colors"
          >
            <Copy size={13} />
          </button>
        </div>
      )}
      <a
        href={server.github_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-purple transition-colors mt-auto"
      >
        <Github size={13} />
        GitHub →
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Write mcp/page.tsx**

```tsx
import { getMcpServers } from "@/lib/content";
import { McpCard } from "@/components/mcp/mcp-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP 服务器",
  description: "Model Context Protocol 服务器目录，为 AI 应用扩展能力",
};

export const dynamic = "force-dynamic";

export default async function McpPage() {
  const servers = await getMcpServers(30);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🔌 MCP 服务器</h1>
        <p className="text-sm text-text-muted">Model Context Protocol 服务器 — 扩展 AI 能力边界</p>
      </div>

      {servers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {servers.map((server) => (
            <McpCard key={server.id} server={server} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无数据" description="MCP 服务器数据正在收集中" />
      )}
    </div>
  );
}
```

---

### Task 21: Create Knowledge Base Pages

**Files:**
- Create: `nextjs/app/knowledge/page.tsx`
- Create: `nextjs/app/knowledge/[slug]/page.tsx`
- Create: `nextjs/components/knowledge/article-card.tsx`

- [ ] **Step 1: Write article-card.tsx**

```tsx
import Link from "next/link";
import { BookOpen, Code, Video, BookMarked } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { KnowledgeArticle } from "@/lib/types";

const categoryIcons: Record<string, React.ElementType> = {
  "claude-code": Code,
  codex: Code,
  bilibili: Video,
  books: BookMarked,
};

const categoryLabels: Record<string, string> = {
  "claude-code": "Claude Code",
  codex: "Codex",
  bilibili: "B站",
  books: "AI 书籍",
};

export function ArticleCard({ article }: { article: KnowledgeArticle }) {
  const Icon = categoryIcons[article.category] || BookOpen;
  const label = categoryLabels[article.category] || article.category;

  return (
    <Link href={`/knowledge/${article.slug}`} className="block group">
      <div className="glass-card-interactive h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill text-[10px] flex items-center gap-1">
            <Icon size={12} />
            {label}
          </span>
          {article.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] text-text-muted">{tag}</span>
          ))}
        </div>
        <h3 className="text-[15px] font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">
          {article.summary}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write knowledge/page.tsx**

```tsx
import { getKnowledgeArticles } from "@/lib/content";
import { ArticleCard } from "@/components/knowledge/article-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "知识库",
  description: "AI 知识库 — Claude Code、Codex、B站教程、AI 书籍推荐",
};

export const dynamic = "force-dynamic";

const tabs = [
  { key: "all", label: "全部" },
  { key: "claude-code", label: "Claude Code" },
  { key: "codex", label: "Codex" },
  { key: "bilibili", label: "B站教程" },
  { key: "books", label: "AI 书籍" },
];

export default async function KnowledgePage({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || "all";
  const articles = await getKnowledgeArticles(tab === "all" ? undefined : tab);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">📚 知识库</h1>
        <p className="text-sm text-text-muted">AI 开发知识与学习资源</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <a key={t.key} href={`/knowledge${t.key === "all" ? "" : `?tab=${t.key}`}`} className={`pill transition-all ${tab === t.key ? "pill-active" : ""}`}>
            {t.label}
          </a>
        ))}
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无文章" description="知识库文章正在准备中" />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write knowledge/[slug]/page.tsx**

```tsx
import { getKnowledgeBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getKnowledgeBySlug(params.slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.seo_title || article.title,
    description: article.meta_description || article.summary,
    keywords: article.keywords || article.tags,
  };
}

export default async function KnowledgeDetailPage({ params }: { params: { slug: string } }) {
  const article = await getKnowledgeBySlug(params.slug);
  if (!article) notFound();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <Link href="/knowledge" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        <ArrowLeft size={16} />
        返回知识库
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-4">
          <span className="pill">{article.category}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Calendar size={12} />
            {formatDate(article.created_at)}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-1.5 mb-8 pb-6 border-b border-border">
          {article.tags?.map((tag) => (
            <span key={tag} className="text-[11px] text-text-muted px-2 py-0.5 rounded-full bg-surface-hover flex items-center gap-1">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed whitespace-pre-line text-[15px]">
          {article.content_mdx}
        </div>
      </article>
    </div>
  );
}
```

---

### Task 22: Create Search Page

**Files:**
- Create: `nextjs/app/search/page.tsx`

- [ ] **Step 1: Write search/page.tsx**

```tsx
import { searchAll } from "@/lib/content";
import { NewsCard } from "@/components/news/news-card";
import { RepoCard } from "@/components/trending/repo-card";
import { ToolCard } from "@/components/tools/tool-card";
import { McpCard } from "@/components/mcp/mcp-card";
import { ArticleCard } from "@/components/knowledge/article-card";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索 AI 新闻、GitHub 项目、AI 工具、MCP 服务器和知识库文章",
};

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const results = query ? await searchAll(query) : null;
  const hasResults = results && (
    results.news.length > 0 ||
    results.projects.length > 0 ||
    results.tools.length > 0 ||
    results.mcp.length > 0 ||
    results.knowledge.length > 0
  );

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">🔍 搜索</h1>
        <p className="text-sm text-text-muted mb-4">跨板块搜索所有内容</p>
        <SearchInput placeholder="搜索 AI 新闻、工具、项目..." />
      </div>

      {query && !results && (
        <div className="glass-card flex items-center justify-center py-12">
          <div className="animate-pulse text-text-muted text-sm">搜索中...</div>
        </div>
      )}

      {results && !hasResults && (
        <EmptyState title="未找到结果" description={`没有找到与 "${query}" 相关的内容`} />
      )}

      {results && hasResults && (
        <div className="space-y-8">
          {results.news.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">📰 AI 新闻</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.news.map((item) => <NewsCard key={item.id} news={item} />)}
              </div>
            </section>
          )}

          {results.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">⭐ GitHub 项目</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.projects.map((item) => <RepoCard key={item.id} project={item} />)}
              </div>
            </section>
          )}

          {results.tools.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🛠️ AI 工具</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.tools.map((item) => <ToolCard key={item.id} tool={item} />)}
              </div>
            </section>
          )}

          {results.mcp.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">🔌 MCP 服务器</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.mcp.map((item) => <McpCard key={item.id} server={item} />)}
              </div>
            </section>
          )}

          {results.knowledge.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-4">📚 知识库</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.knowledge.map((item) => <ArticleCard key={item.id} article={item} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Phase 8: Error & Loading States

### Task 23: Create not-found, error, and loading pages

**Files:**
- Create: `nextjs/app/not-found.tsx`
- Create: `nextjs/app/error.tsx`
- Create: `nextjs/app/loading.tsx`

- [ ] **Step 1: Write not-found.tsx**

```tsx
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <FileQuestion size={64} className="text-text-muted mb-6" />
      <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
      <p className="text-text-secondary mb-8">页面不存在</p>
      <Link href="/" className="pill pill-active px-6 py-2.5 text-sm">
        返回首页
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Write error.tsx**

```tsx
"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle size={64} className="text-red-400 mb-6" />
      <h1 className="text-2xl font-bold text-text-primary mb-2">出错了</h1>
      <p className="text-text-muted mb-2">页面加载时发生了错误</p>
      <p className="text-xs text-text-muted mb-8 max-w-md">{error.message}</p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-2.5 bg-accent/15 text-accent border border-accent/20 rounded-xl text-sm hover:bg-accent/25 transition-all"
      >
        <RefreshCw size={15} />
        重试
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Write loading.tsx**

```tsx
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 skeleton-pulse bg-surface-hover rounded-2xl h-48" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LoadingSkeleton count={4} variant="list" />
        </div>
        <div className="lg:col-span-1">
          <div className="glass-card skeleton-pulse h-64 mb-4" />
          <div className="glass-card skeleton-pulse h-48 mb-4" />
          <div className="glass-card skeleton-pulse h-48" />
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 9: Database Setup & Content Generation

### Task 24: Create complete database schema

**Files:**
- Modify: `supabase/schema.sql`

- [ ] **Step 1: Rewrite schema.sql**

```sql
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
```

---

### Task 25: Generate content and seed data

**Files:**
- Create: `scripts/generate-content.sql`

- [ ] **Step 1: Write seed.sql with comprehensive data**

This task generates 50+ news items, 20+ GitHub repos, 30+ tools, 15+ MCP servers, 15+ books, and 20+ knowledge articles. Due to the size of this file, I'll generate it inline during implementation. The file will contain:

- AI News: Latest AI headlines in Chinese covering GPT-5, Claude, Gemini, Llama, open source releases, research papers, industry news
- GitHub Projects: Real trending repos like langchain-ai/langgraph, crewAIInc/crewAI, microsoft/graphrag, etc. with real star counts
- AI Tools: Cursor, Copilot, Windsurf, Claude Code, Codex, Replit Agent, v0, Bolt, etc. with categories and pricing
- MCP Servers: Official Anthropic servers, community servers for various integrations
- AI Books: Popular AI/ML books with authors and ratings
- Knowledge Base: Articles about Claude Code features, Codex usage, B站 tutorials

The actual generation happens during implementation using web search for fast data and direct generation for slow data.

```sql
-- Example structure (full data generated during implementation):
INSERT INTO ai_news (title, summary, source, category, slug, published_at) VALUES
('OpenAI 发布 GPT-5：多模态推理能力全面升级', '...', 'OpenAI Blog', 'llm', 'openai-gpt5-release', NOW() - INTERVAL '2 hours'),
-- ... (50+ more rows)
;
```

---

## Phase 10: SEO & Final Polish

### Task 26: Create SEO metadata helpers

**Files:**
- Create: `nextjs/lib/seo.ts`

- [ ] **Step 1: Write seo.ts**

```typescript
import type { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  path: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihub.example.com";

export function buildMetadata({ title, description, keywords, ogImage, path }: SeoProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: "AI Learning Hub",
      type: "article",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
```

---

### Task 27: Update README

**Files:**
- Modify: `nextjs/../README.md`

- [ ] **Step 1: Write comprehensive README**

```markdown
# AI Learning Hub V2 Enterprise

一站式 AI 学习平台，聚合最新 AI 新闻、GitHub 热门项目、AI 工具目录、MCP 服务器、知识库。

## 技术栈

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI**: Custom glassmorphism design system
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 快速开始

### 环境要求

- Node.js 18+
- Supabase 账号

### 安装

```bash
cd nextjs
npm install
```

### 配置

复制 `.env.local` 并填入你的 Supabase 凭据：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 数据库设置

在 Supabase SQL Editor 中依次执行：

1. `supabase/schema.sql` — 创建所有表
2. Supabase 控制台中运行种子数据（详见下方）

### 开发

```bash
npm run dev
```

打开 http://localhost:3000

### 构建

```bash
npm run build
npm start
```

### 部署

推荐使用 Vercel：

1. 导入项目到 Vercel
2. 设置环境变量 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 部署

## 项目结构

```
nextjs/
├── app/              # Next.js App Router 页面
├── components/       # React 组件
│   ├── layout/       # 布局组件 (Sidebar, Header)
│   ├── news/         # 新闻相关组件
│   ├── trending/     # GitHub Trending 组件
│   ├── tools/        # AI 工具组件
│   ├── mcp/          # MCP 服务器组件
│   ├── knowledge/    # 知识库组件
│   └── shared/       # 共享组件
├── lib/              # 工具函数和类型定义
supabase/
└── schema.sql        # 数据库 Schema
```

## License

MIT
```

---

## Implementation Order

1. Task 1 → Project setup (package.json, configs, install)
2. Tasks 2-5 → Foundation (types, utils, supabase, global CSS)
3. Tasks 6-9 → Layout (GlowBackground, Sidebar, Header, root layout)
4. Tasks 10-11 → Shared components (GlassCard, SectionHeader, etc.)
5. Task 12 → Data fetching layer
6. Tasks 13-15 → Homepage
7. Tasks 16-17 → News pages
8. Task 18 → Trending page
9. Task 19 → Tools page
10. Task 20 → MCP page
11. Task 21 → Knowledge pages
12. Task 22 → Search page
13. Task 23 → Error/loading/not-found pages
14. Task 24 → Database schema
15. Task 25 → Content generation
16. Tasks 26-27 → SEO helpers + README
