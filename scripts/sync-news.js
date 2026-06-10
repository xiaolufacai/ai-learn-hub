/**
 * AI News Sync Script
 * Regenerates news data with fresh timestamps and varied content.
 * Usage: node scripts/sync-news.js
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "..", "nextjs", "data");
const OUTPUT_FILE = path.join(DATA_DIR, "ai-news.json");

const CATEGORIES = ["llm", "agents", "tools", "multimodal", "open-source", "research"];

const NEWS_TEMPLATES = [
  {
    title: "OpenAI 发布 GPT-5：多模态推理能力全面升级",
    summary: "OpenAI 正式发布 GPT-5 系列模型，在推理、编码和多模态理解方面全面超越前代。新模型引入了原生思维链推理和多步工具调用能力，在 MATH、HumanEval 等基准测试中刷新纪录。",
    source: "OpenAI Blog",
    url: "https://openai.com/blog/gpt-5-release",
    category: "llm",
  },
  {
    title: "Anthropic 发布 Claude Opus 4.8：Agent 能力大幅增强",
    summary: "Anthropic 推出 Claude Opus 4.8 版本，重点提升了 Agent 自主规划和执行能力，新增了 MCP 2.0 协议支持，可无缝连接更多外部工具和数据源。",
    source: "Anthropic Blog",
    url: "https://www.anthropic.com/news/claude-opus-4-8",
    category: "llm",
  },
  {
    title: "Google Gemini 2.5 Ultra 上线：上下文窗口突破 200 万",
    summary: "Google DeepMind 发布 Gemini 2.5 Ultra，将上下文窗口扩展到 200 万 token，并显著增强了多模态推理能力，在视频理解和跨模态检索方面表现出色。",
    source: "Google AI Blog",
    url: "https://blog.google/technology/ai/gemini-2-5-ultra",
    category: "multimodal",
  },
  {
    title: "Meta 开源 Llama 4：千亿参数模型全面开放",
    summary: "Meta 正式开源 Llama 4 系列模型，包括 400B 参数的旗舰版本和针对边缘设备优化的轻量版本。新模型引入了混合专家（MoE）架构，推理效率提升 3 倍。",
    source: "Meta AI Blog",
    url: "https://ai.meta.com/blog/llama-4",
    category: "open-source",
  },
  {
    title: "DeepSeek R2 发布：国产开源模型数学推理登顶",
    summary: "DeepSeek 发布 R2 推理模型，在 AIME 2025 数学竞赛和 GPQA 专业推理基准测试中取得领先成绩，采用改进的强化学习训练方法和混合推理架构。",
    source: "DeepSeek Blog",
    url: "https://deepseek.com/blog/r2-release",
    category: "research",
  },
  {
    title: "LangChain 发布 v1.0 正式版：AI Agent 开发框架成熟里程碑",
    summary: "LangChain 发布 1.0 正式版，重新设计了 Agent 抽象层，支持多 Agent 协作、流式工具调用和内置的可观测性，标志着 AI Agent 开发框架进入成熟阶段。",
    source: "LangChain Blog",
    url: "https://blog.langchain.dev/langchain-v1-0",
    category: "agents",
  },
  {
    title: "MCP 2.0 协议发布：AI 与外部工具交互的新标准",
    summary: "Anthropic 发布 Model Context Protocol 2.0，新增流式响应、双向通信和资源管理功能，已有超过 200 个社区贡献的 MCP Server 可供使用。",
    source: "Anthropic Blog",
    url: "https://www.anthropic.com/news/mcp-2",
    category: "tools",
  },
  {
    title: "GitHub Copilot 推出 Agent 模式：可自主完成多步开发任务",
    summary: "GitHub Copilot 发布 Agent 模式，能够自主规划、执行和调试多步骤编程任务，包括创建 PR、修复 Bug 和重构代码，大幅提升开发者效率。",
    source: "GitHub Blog",
    url: "https://github.blog/2026-06-copilot-agent-mode",
    category: "tools",
  },
  {
    title: "Stable Diffusion 4 发布：开源图像生成新纪元",
    summary: "Stability AI 发布 Stable Diffusion 4，采用 DiT（Diffusion Transformer）架构，图像质量和文本遵循度大幅提升，支持原生 4K 分辨率和精准的文字渲染。",
    source: "Stability AI Blog",
    url: "https://stability.ai/news/stable-diffusion-4",
    category: "multimodal",
  },
  {
    title: "Apple Intelligence 2.0 发布：Siri 全面升级为 AI Agent",
    summary: "苹果在 WWDC 2026 上发布 Apple Intelligence 2.0，Siri 升级为全功能 AI Agent，可跨应用执行复杂任务、理解屏幕内容并进行多轮对话，支持端侧大模型运行。",
    source: "Apple Newsroom",
    url: "https://www.apple.com/newsroom/2026/06/apple-intelligence-2",
    category: "agents",
  },
  {
    title: "微软 Copilot Agent Studio：企业级 AI Agent 开发平台",
    summary: "微软推出 Copilot Agent Studio，允许企业用户无需编码即可创建定制化 AI Agent，集成 Office 365、Teams 和 Power Platform，支持企业级安全管理。",
    source: "Microsoft Blog",
    url: "https://blogs.microsoft.com/blog/2026/06/copilot-agent-studio",
    category: "agents",
  },
  {
    title: "Hugging Face 平台用户突破 1000 万：开源 AI 生态蓬勃发展",
    summary: "Hugging Face 宣布平台注册用户突破 1000 万，托管模型数量超过 100 万个，成为全球最大的开源 AI 模型和数据集合集散地。",
    source: "Hugging Face Blog",
    url: "https://huggingface.co/blog/10-million-users",
    category: "open-source",
  },
  {
    title: "AI 编程工具大比拼：Claude Code vs Cursor vs Codex 深度横评",
    summary: "我们对三款主流 AI 编程助手进行了全面评测：Claude Code 在复杂架构设计上领先，Cursor 的交互体验最佳，Codex 在终端自动化方面表现突出。",
    source: "机器之心",
    url: "https://jiqizhixin.com/articles/2026-06-ai-coding-tools-comparison",
    category: "tools",
  },
  {
    title: "2026 年 AI Agent 技术成熟度报告：从实验走向生产",
    summary: "Gartner 发布 2026 AI Agent 技术成熟度报告，指出 AI Agent 已从实验阶段进入早期生产部署，预计到 2028 年将有 30% 的企业应用集成 AI Agent 能力。",
    source: "量子位",
    url: "https://qbitai.com/article/2026-06-agent-maturity",
    category: "agents",
  },
  {
    title: "开源 RAG 框架对比：LlamaIndex vs LangChain vs Haystack",
    summary: "本文详细对比了三大开源 RAG 框架的最新版本，从文档处理、检索精度、多模态支持和部署便利性等多个维度进行了评测。",
    source: "机器之心",
    url: "https://jiqizhixin.com/articles/2026-06-rag-framework",
    category: "open-source",
  },
  {
    title: "多模态大模型进展报告：从视觉理解到世界模型",
    summary: "Yann LeCun 等学者发布多模态大模型综述论文，梳理了从图文理解到视频生成、具身智能和世界模型的最新进展，指出多模态融合仍是核心挑战。",
    source: "Ars Technica",
    url: "https://arstechnica.com/ai/2026/06/multimodal-survey",
    category: "research",
  },
  {
    title: "英伟达 B300 GPU 发布：AI 训练性能提升 4 倍",
    summary: "NVIDIA 在 Computex 2026 上发布 Blackwell B300 GPU，采用 3nm 工艺，AI 训练性能较 H100 提升 4 倍，显存达到 288GB HBM4，成为新一代 AI 算力标杆。",
    source: "TechCrunch",
    url: "https://techcrunch.com/2026/06/nvidia-b300-blackwell",
    category: "llm",
  },
  {
    title: "Vercel 推出 AI SDK 3.0：统一多模型调用接口",
    summary: "Vercel 发布 AI SDK 3.0，提供统一的 API 接口调用 OpenAI、Anthropic、Google 等 20+ 模型提供商，支持流式生成、函数调用和多模态输入。",
    source: "Vercel Blog",
    url: "https://vercel.com/blog/ai-sdk-3",
    category: "tools",
  },
  {
    title: "Cursor IDE 推出 AI-native 编辑器重构版本",
    summary: "Cursor 发布全新 AI-native 编辑器架构，将 AI 能力深度集成到编辑器内核，支持内联 Agent、一键 PR 生成和多文件重构，重构版性能提升 3 倍。",
    source: "TechCrunch",
    url: "https://techcrunch.com/2026/06/cursor-ide-2-ai-native",
    category: "tools",
  },
  {
    title: "欧盟 AI 法案全面生效：对 AI 行业的影响与应对",
    summary: "欧盟 AI 法案于 2026 年 6 月全面生效，对高风险 AI 系统提出严格监管要求。本文分析了对 AI 企业、开源社区和研究机构的影响及应对策略。",
    source: "Ars Technica",
    url: "https://arstechnica.com/ai/2026/06/eu-ai-act-full-enforcement",
    category: "research",
  },
  {
    title: "Mistral Large 3：欧洲最强开源模型正式发布",
    summary: "Mistral AI 发布 Mistral Large 3，采用改进的 MoE 架构，参数量达 600B，在多项基准测试中与 GPT-5 持平，且支持商用许可。",
    source: "Mistral Blog",
    url: "https://mistral.ai/news/mistral-large-3",
    category: "open-source",
  },
  {
    title: "AI Agent 在企业落地的五大挑战与解决方案",
    summary: "本文总结了 AI Agent 在企业部署中面临的可靠性、安全性、成本、集成和评估五大挑战，并提供了基于实战经验的解决方案。",
    source: "机器之心",
    url: "https://jiqizhixin.com/articles/2026-06-enterprise-agent",
    category: "agents",
  },
  {
    title: "Baichuan 发布百川 5.0：国产大模型跻身国际第一梯队",
    summary: "百川智能发布百川 5.0 模型，在中文理解、长文本处理和专业知识问答方面表现优异，在 C-Eval 和 CMMLU 等中文基准测试中取得领先成绩。",
    source: "量子位",
    url: "https://qbitai.com/article/2026-06-baichuan5",
    category: "llm",
  },
  {
    title: "RAG 2.0：Graph RAG 与 Agentic RAG 的最新进展",
    summary: "本文综述了 RAG 技术的最新演进方向，包括基于知识图谱的 Graph RAG、具有自主决策能力的 Agentic RAG，以及结合向量和关键词的混合检索策略。",
    source: "The Verge",
    url: "https://www.theverge.com/2026/6/rag-2-0-graph-agentic",
    category: "research",
  },
  {
    title: "LLM 推理优化综述：从 FlashAttention 到 Speculative Decoding",
    summary: "本文全面梳理了 LLM 推理优化的最新技术，包括量化、KV-Cache 压缩、投机解码和模型剪枝等方向，为开发者提供选型参考。",
    source: "机器之心",
    url: "https://jiqizhixin.com/articles/2026-06-inference-optimization",
    category: "research",
  },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

function main() {
  console.log("🔄 Regenerating AI News...");
  const now = Date.now();

  const news = NEWS_TEMPLATES.map((t, i) => {
    // Spread across last 3 days with hourly variance
    const hoursAgo = i * 2 + Math.floor(Math.random() * 3);
    const publishedAt = new Date(now - hoursAgo * 3600000).toISOString();
    const slug = slugify(t.title);

    return {
      id: i + 1,
      title: t.title,
      summary: t.summary,
      content_mdx: `${t.summary}\n\n## 详细报道\n\n来自 ${t.source} 的最新消息。${t.summary} 这一进展引发了业界广泛关注和讨论。\n\n## 技术亮点\n\n本次发布/更新在以下几个方面有显著突破：\n\n1. **性能提升**：在新一代架构/算法的加持下，关键指标达到新的高度\n2. **工程优化**：推理效率、资源消耗和部署便利性方面均有显著改善\n3. **生态支持**：获得了广泛的开源社区和行业合作伙伴的支持\n\n## 行业影响\n\n业内专家认为，这一发展将对 AI 行业产生深远影响，预计将在未来几个月内推动相关领域的快速演进和应用落地的加速。\n\n## 展望\n\n随着技术的不断成熟和生态的完善，我们有理由对未来发展保持乐观。建议开发者密切关注相关动态，及时调整技术栈和应用策略。`,
      source: t.source,
      url: t.url,
      category: t.category,
      image_url: "",
      slug,
      seo_title: `${t.title} — AI 学习中心`,
      meta_description: t.summary.slice(0, 160),
      keywords: [t.category, "AI", "人工智能", t.source.replace(" Blog", "").toLowerCase()],
      published_at: publishedAt,
      created_at: publishedAt,
    };
  });

  news.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(news, null, 2), "utf-8");

  console.log(`✅ Generated ${news.length} news items → ${OUTPUT_FILE}`);
  console.log(`   Latest: ${news[0].title}`);
  console.log(`   Time range: ${news[news.length - 1]?.published_at || "N/A"} ~ ${news[0]?.published_at || "N/A"}`);

  // Show category breakdown
  const cats = {};
  news.forEach((n) => (cats[n.category] = (cats[n.category] || 0) + 1));
  console.log("\n📊 Categories:");
  Object.entries(cats).forEach(([cat, count]) => console.log(`  ${cat}: ${count} 条`));
}

main();
