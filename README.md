# AI Learning Hub V2 Enterprise

一站式 AI 学习平台，聚合最新 AI 新闻、GitHub 热门项目、AI 工具目录、MCP 服务器、知识库。

![Design](https://img.shields.io/badge/design-glassmorphism%20dark-6366f1)
![Stack](https://img.shields.io/badge/stack-Next.js%2014%20%2B%20Supabase-000)
![Status](https://img.shields.io/badge/status-ready%20for%20deployment-22c55e)

## ✨ 特性

- 📰 **AI 新闻聚合** — 实时追踪 LLM、AI Agent、多模态、开源等领域最新动态
- ⭐ **GitHub Trending** — 最热门 AI 开源项目排行榜
- 🛠️ **AI 工具目录** — 代码助手、IDE、设计工具、研究平台全覆盖
- 🔌 **MCP 服务器** — Model Context Protocol 服务器完整目录
- 📚 **知识库** — Claude Code、Codex 教程及 AI 书籍推荐
- 🔍 **全局搜索** — 跨所有板块一键搜索
- 🎨 **玻璃态暗黑主题** — 现代 Glassmorphism 设计，开发者最爱

## 🏗️ 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript (strict) |
| 样式 | Tailwind CSS + 自定义玻璃态组件 |
| 图标 | Lucide Icons |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | Vercel |

## 🚀 快速开始

### 环境要求

- Node.js 18+
- Supabase 账号（免费套餐即可）

### 1. 克隆项目

```bash
git clone <repo-url>
cd ai-news
```

### 2. 安装依赖

```bash
cd nextjs
npm install
```

### 3. 配置环境变量

在 `nextjs/.env.local` 中填入你的 Supabase 凭据：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. 初始化数据库

在 Supabase SQL Editor 中依次执行：

1. `supabase/schema.sql` — 创建所有表（6张表 + 10个索引）
2. `supabase/seed.sql` — 填充种子数据（110条记录）

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 🎉

### 6. 构建部署

```bash
npm run build
npm start
```

推荐使用 Vercel 部署：导入项目，设置环境变量即可自动部署。

## 📁 项目结构

```
ai-news/
├── nextjs/                    # Next.js 应用
│   ├── app/                   # App Router 页面
│   │   ├── layout.tsx         # 根布局（玻璃侧边栏+顶部栏+光晕背景）
│   │   ├── page.tsx           # 首页仪表盘
│   │   ├── globals.css        # 玻璃态暗黑主题样式
│   │   ├── news/              # AI 新闻（列表+详情）
│   │   ├── trending/          # GitHub Trending
│   │   ├── tools/             # AI 工具目录
│   │   ├── mcp/               # MCP 服务器
│   │   ├── knowledge/         # 知识库（列表+详情）
│   │   ├── search/            # 全局搜索
│   │   ├── not-found.tsx      # 404 页面
│   │   ├── error.tsx          # 错误边界
│   │   └── loading.tsx        # 加载骨架屏
│   ├── components/            # React 组件
│   │   ├── layout/            # 布局组件
│   │   ├── shared/            # 共享组件
│   │   ├── news/              # 新闻组件
│   │   ├── trending/          # Trending 组件
│   │   ├── tools/             # 工具组件
│   │   ├── mcp/               # MCP 组件
│   │   └── knowledge/         # 知识库组件
│   ├── lib/                   # 工具库
│   │   ├── types.ts           # TypeScript 类型
│   │   ├── utils.ts           # 工具函数
│   │   ├── supabase.ts        # Supabase 客户端
│   │   ├── content.ts         # 数据查询函数
│   │   └── seo.ts             # SEO 辅助函数
│   ├── tailwind.config.ts     # Tailwind 配置
│   └── package.json
├── supabase/                  # 数据库
│   ├── schema.sql             # 建表 SQL
│   └── seed.sql               # 种子数据（110条）
├── docs/                      # 文档
│   └── superpowers/
│       ├── specs/             # 设计文档
│       └── plans/             # 实现计划
└── skills/                    # Agent 技能定义
    └── ai-web/                # 12个内容智能体
```

## 🎨 设计系统

- **主题**: 玻璃态暗黑科技风 (Modern Glassmorphism Dark)
- **配色**: 深蓝黑底 (#0c0c1d) + 靛紫渐变强调色 (#6366f1 → #a855f7)
- **卡片**: `backdrop-blur(12px)` + 半透明背景 + 柔和边框
- **字体**: Inter (正文) + JetBrains Mono (代码/等宽)
- **光晕**: 固定定位的径向渐变光球营造氛围

## 📊 数据库

6 张数据表，10 个优化索引：

| 表 | 内容 | 数据来源 |
|----|------|----------|
| `ai_news` | AI 新闻 | Agent 采集 / Web Search |
| `github_projects` | GitHub 热榜 | GitHub API |
| `ai_tools` | AI 工具 | AI 生成 / 人工整理 |
| `mcp_servers` | MCP 服务器 | MCP 官方目录 |
| `ai_books` | AI 书籍 | AI 生成 / 人工整理 |
| `knowledge_base` | 知识库文章 | AI 生成 / 人工整理 |

## 🤖 多智能体系统

项目设计为 12 个专业化 Agent 协同工作：

`ai-news-agent` `github-trending-agent` `ai-tools-agent` `mcp-discovery-agent` `ai-books-agent` `bilibili-agent` `claude-code-agent` `codex-agent` `x-agent` `seo-agent` `publishing-agent` `content-orchestrator-agent`

详见 `skills/ai-web/` 目录。

## 📄 License

MIT
