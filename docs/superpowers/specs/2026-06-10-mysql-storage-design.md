# MySQL 存储改造设计

**日期：** 2026-06-10
**状态：** 已确认

---

## 目标

将 Next.js 应用的 JSON 文件存储改为 MySQL 数据库存储，完全废弃 JSON 文件。Sync 脚本和 Next.js 应用统一使用 Prisma ORM 读写 MySQL。

## MySQL 连接信息

| 配置项 | 值 |
|--------|-----|
| Host | 154.217.245.247 |
| Port | 3306 |
| Database | ds |
| User | ds |
| Password | brFHxS2Sa7J2XapM |

---

## 文件变更总览

### 新增文件
- `deploy/nextjs/prisma/schema.prisma` — 8 张表定义
- `deploy/nextjs/lib/db.ts` — Prisma 单例
- `deploy/nextjs/.env` — DATABASE_URL 配置
- `deploy/scripts/tsconfig.json` — 脚本 TypeScript 配置

### 改造文件
- `deploy/nextjs/lib/content.ts` — `fs.readFileSync` → Prisma 查询
- `deploy/scripts/sync-all.js` → `sync-all.ts`
- `deploy/scripts/sync-news.js` → `sync-news.ts`
- `deploy/scripts/sync-github.js` → `sync-github.ts`
- `deploy/scripts/sync-x.js` → `sync-x.ts`
- `deploy/scripts/sync-linuxdo.js` → `sync-linuxdo.ts`
- `deploy/nextjs/package.json` — 依赖更新

### 删除文件
- `deploy/nextjs/lib/supabase.ts` — 未被使用
- `deploy/nextjs/data/` 整个目录 — JSON 文件全部废弃

### 不改动文件
- `deploy/nextjs/lib/types.ts` — 类型定义保留
- `deploy/nextjs/lib/seo.ts` — 不涉及数据层
- `deploy/nextjs/lib/utils.ts` — 不涉及数据层
- 所有 `app/` 和 `components/` 下的页面组件 — API 签名不变

---

## Schema 设计

### 8 张表

| 表名 | 对应原 JSON | 主键 | 说明 |
|------|------------|------|------|
| `ai_news` | ai-news.json | id (INT AUTO_INCREMENT) | AI 新闻 |
| `github_projects` | github-projects.json | id (INT AUTO_INCREMENT) | GitHub 热门项目 |
| `ai_tools` | ai-tools.json | id (INT AUTO_INCREMENT) | AI 工具目录 |
| `mcp_servers` | mcp-servers.json | id (INT AUTO_INCREMENT) | MCP 服务器 |
| `ai_books` | ai-books.json | id (INT AUTO_INCREMENT) | AI 书籍 |
| `knowledge_articles` | knowledge-base.json | id (INT AUTO_INCREMENT) | 知识库文章 |
| `x_posts` | x-posts.json | id (INT AUTO_INCREMENT) | X/Twitter 帖子 |
| `linuxdo_posts` | linuxdo-posts.json | id (INT AUTO_INCREMENT) | Linux.do 帖子 |

### 索引策略

- `slug` 字段：**唯一索引**（用于详情页 `findUnique` 查询）
- `category` 字段：**普通索引**（用于分类筛选）
- `published_at` / `created_at` 字段：按需普通索引（用于排序和最新数据查询）

### 数组字段处理

`features`、`tags`、`keywords`、`media_urls` 等数组字段使用 Prisma 的 `Json` 类型（对应 MySQL 的 `JSON` 列），写入时传递 JavaScript 数组，读取时自动解析。

---

## 代码改造要点

### lib/db.ts（新增）

```typescript
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

### lib/content.ts（改造）

所有函数从 `loadData("xxx.json")` + 内存过滤/排序 改为 Prisma 查询：

| 函数 | 改动 |
|------|------|
| `getLatestNews(n)` | `prisma.aiNews.findMany({ orderBy: {published_at: "desc"}, take: n })` |
| `getNewsByCategory(cat, n)` | 同上 + `where: { category }` |
| `getNewsBySlug(slug)` | `prisma.aiNews.findUnique({ where: { slug } })` |
| `getBreakingNews()` | `prisma.aiNews.findFirst({ orderBy: {published_at: "desc"} })` |
| `getTrendingProjects(n)` | `prisma.githubProject.findMany({ orderBy: {stars: "desc"}, take: n })` |
| `searchAll(q)` | 对每张表分别 `findMany({ where: { x: { contains: q } } })` |

函数签名不变，调用方无需修改。

### Sync 脚本（改造）

- 文件扩展名 `.js` → `.ts`
- 用 `tsx` 运行（`npx tsx sync-news.ts`）
- 引入 Prisma 客户端：`import { prisma } from "../nextjs/lib/db"`
- 写入方式：`prisma.xxx.upsert({ where: { slug }, update: data, create: data })`

### 数据迁移

旧 JSON 数据保留在 `data/` 目录作为备份。初始化新 MySQL 数据库后，运行一次 `sync-all.ts` 写入初始数据。

---

## 初始化步骤

1. `cd deploy/nextjs && npm install` — 安装新依赖
2. 配置 `.env` 中 `DATABASE_URL=mysql://ds:brFHxS2Sa7J2XapM@154.217.245.247:3306/ds`
3. `npx prisma db push` — 创建表结构
4. `npx tsx ../scripts/sync-all.ts` — 写入初始数据
5. `npm run dev` — 验证应用正常运行

---

## 依赖变更

| 操作 | 包名 | 版本 |
|------|------|------|
| 新增 devDep | `prisma` | ^5.x |
| 新增 dep | `@prisma/client` | ^5.x |
| 新增 devDep | `tsx` | ^4.x |
| 移除 dep | `@supabase/supabase-js` | — |
