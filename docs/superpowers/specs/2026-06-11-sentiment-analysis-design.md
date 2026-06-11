# AI 舆情模块设计

**日期：** 2026-06-11
**状态：** 已确认

---

## 目标

新增 AI 舆情模块，对每一条 AI 新闻自动生成舆情分析（多方观点、情绪分布、争议点、趋势判断），通过 DeepSeek API 调用 LLM 生成分析数据，存入 MySQL，前端展示。

---

## 数据库

### 新表 `sentiment_analysis`

```prisma
model SentimentAnalysis {
  id                Int      @id @default(autoincrement())
  news_slug         String   @unique @db.VarChar(255)
  positive_pct      Int
  negative_pct      Int
  neutral_pct       Int
  supporting_views  Json?
  opposing_views    Json?
  neutral_views     Json?
  key_controversies Json?
  trend_judgment    String?  @db.Text
  overall_summary   String?  @db.Text
  analyzed_at       DateTime @default(now())

  @@map("sentiment_analysis")
}
```

- `news_slug` 唯一索引，通过 slug 关联 `ai_news` 表（不做外键约束，保持灵活性）
- JSON 字段存储结构化数据，应用层 cast 使用

### 各 JSON 字段结构

```typescript
// supporting_views / opposing_views / neutral_views
type ViewPoint = {
  point: string;           // 观点描述
  influence_score: number; // 影响力评分 1-10
  source_quote: string;    // 代表性引言
};

// key_controversies
type Controversy = {
  topic: string;   // 争议主题
  detail: string;  // 争议详情
};
```

---

## Sync 脚本

### `deploy/scripts/sync-sentiment.ts`

- 遍历 `ai_news` 中不存在于 `sentiment_analysis` 的新闻
- 对每条新闻调用 DeepSeek API (`https://api.deepseek.com/v1/chat/completions`)
- 结构化 prompt 输出 JSON 格式的分析结果
- `upsert` 写入 `sentiment_analysis`
- API Key 从环境变量 `DEEPSEEK_API_KEY` 读取

### 定时任务

- 追加到 `sync-cron.sh`，与其他 sync 脚本一起每小时运行

---

## 前端

### 类型

`lib/types.ts` 新增 `SentimentAnalysis` 接口（字段与 Prisma 模型对应，JSON 字段用 `any`，日期用 `Date`）。

### 数据层

`lib/content.ts` 新增 2 个函数：

```typescript
export async function getSentimentAnalyses(limit = 20) {
  return prisma.sentimentAnalysis.findMany({
    orderBy: { analyzed_at: "desc" },
    take: limit,
  });
}

export async function getSentimentBySlug(slug: string) {
  return prisma.sentimentAnalysis.findUnique({ where: { news_slug: slug } });
}
```

### 页面

| 路由 | 组件 | 说明 |
|------|------|------|
| `/sentiment` | `app/sentiment/page.tsx` | 舆情列表，卡片展示情绪分布条、概述、争议点 |
| `/sentiment/[slug]` | `app/sentiment/[slug]/page.tsx` | 舆情详情，三方观点 + 趋势分析 |

### 组件

- `components/sentiment/sentiment-card.tsx` — 列表卡片
- `components/sentiment/sentiment-bar.tsx` — 情绪分布柱状条（绿/红/灰三段）
- `components/sentiment/viewpoint-list.tsx` — 观点列表

### 导航

侧边栏新增「AI 舆情」入口，图标 `BarChart3` from lucide-react。

---

## 初始化步骤

1. 更新 `prisma/schema.prisma` 添加 `SentimentAnalysis` 模型
2. `npx prisma db push` 同步表结构
3. 服务器设置 `DEEPSEEK_API_KEY` 环境变量到 `.env` 和 systemd 配置
4. `npx tsx sync-sentiment.ts` 首次生成舆情数据
5. `npm run build` 构建 + 部署
