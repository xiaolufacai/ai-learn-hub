/**
 * Seed StackOverflow questions into SQLite for offline preview
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "file:../nextjs/prisma/dev.db",
});

const MOCK = [
  { question_id: 78654321, title: "How to implement RAG with LangChain and local LLM?", votes: 342, answers: 12, views: 28500, author_name: "ml_engineer", author_reputation: 12500, tags: "langchain,llm,python,rag", slug: "how-to-implement-rag-with-langchain-and-local-llm" },
  { question_id: 78654322, title: "What's the difference between GPT-4 and GPT-5 API pricing?", votes: 289, answers: 8, views: 42100, author_name: "api_newbie", author_reputation: 3200, tags: "openai-api,gpt,pricing", slug: "whats-the-difference-between-gpt-4-and-gpt-5-api-pricing" },
  { question_id: 78654323, title: "How to fine-tune Llama 3 on custom dataset with QLoRA?", votes: 267, answers: 15, views: 18900, author_name: "finetuner42", author_reputation: 8700, tags: "machine-learning,llm,python,huggingface", slug: "how-to-fine-tune-llama-3-on-custom-dataset-with-qlora" },
  { question_id: 78654324, title: "Claude API: How to handle streaming responses with tool calling?", votes: 198, answers: 6, views: 12300, author_name: "claude_dev", author_reputation: 5400, tags: "llm,streaming,api,claude", slug: "claude-api-how-to-handle-streaming-responses-with-tool-calling" },
  { question_id: 78654325, title: "Vector database comparison: Pinecone vs Weaviate vs Qdrant for RAG", votes: 456, answers: 18, views: 67800, author_name: "vectorexpert", author_reputation: 23100, tags: "machine-learning,rag,vector-database,pinecone,weaviate", slug: "vector-database-comparison-pinecone-vs-weaviate-vs-qdrant-for-rag" },
  { question_id: 78654326, title: "How to deploy an AI Agent with LangGraph and FastAPI?", votes: 178, answers: 9, views: 15600, author_name: "agent_builder", author_reputation: 6100, tags: "langchain,langgraph,fastapi,ai-agent", slug: "how-to-deploy-an-ai-agent-with-langgraph-and-fastapi" },
  { question_id: 78654327, title: "Best practices for prompt engineering in 2026?", votes: 512, answers: 22, views: 89000, author_name: "prompt_master", author_reputation: 45100, tags: "llm,gpt,prompt-engineering,best-practices", slug: "best-practices-for-prompt-engineering-in-2026" },
  { question_id: 78654328, title: "MCP server: How to build a custom tool for Claude Code?", votes: 156, answers: 5, views: 9800, author_name: "mcp_newbie", author_reputation: 1800, tags: "mcp,claude,ai-agent,typescript", slug: "mcp-server-how-to-build-a-custom-tool-for-claude-code" },
  { question_id: 78654329, title: "Why does my transformer model overfit on small dataset?", votes: 234, answers: 14, views: 22000, author_name: "dl_learner", author_reputation: 3900, tags: "deep-learning,transformer,machine-learning,python", slug: "why-does-my-transformer-model-overfit-on-small-dataset" },
  { question_id: 78654330, title: "How to optimize LLM inference latency for production?", votes: 387, answers: 16, views: 34500, author_name: "ops_engineer", author_reputation: 16200, tags: "llm,inference,production,optimization", slug: "how-to-optimize-llm-inference-latency-for-production" },
  { question_id: 78654331, title: "TensorFlow vs PyTorch for deep learning in 2026?", votes: 298, answers: 20, views: 52000, author_name: "framework_wars", author_reputation: 28900, tags: "deep-learning,tensorflow,pytorch,opinion", slug: "tensorflow-vs-pytorch-for-deep-learning-in-2026" },
  { question_id: 78654332, title: "How to handle rate limiting when calling OpenAI API in bulk?", votes: 145, answers: 11, views: 16200, author_name: "api_dev", author_reputation: 7400, tags: "openai-api,rate-limiting,python,api", slug: "how-to-handle-rate-limiting-when-calling-openai-api-in-bulk" },
  { question_id: 78654333, title: "What are the best open-source alternatives to GPT-4?", votes: 423, answers: 25, views: 78000, author_name: "oss_advocate", author_reputation: 35200, tags: "llm,open-source,gpt,comparison,llama", slug: "what-are-the-best-open-source-alternatives-to-gpt-4" },
  { question_id: 78654334, title: "How to implement semantic search with embeddings and PostgreSQL?", votes: 276, answers: 13, views: 31000, author_name: "pg_fan", author_reputation: 11200, tags: "machine-learning,embeddings,postgresql,semantic-search", slug: "how-to-implement-semantic-search-with-embeddings-and-postgresql" },
  { question_id: 78654335, title: "Stable Diffusion 4 API: How to generate 4K images programmatically?", votes: 189, answers: 7, views: 14300, author_name: "img_gen", author_reputation: 4600, tags: "stable-diffusion,api,python,image-generation", slug: "stable-diffusion-4-api-how-to-generate-4k-images-programmatically" },
  { question_id: 78654336, title: "How to evaluate RAG pipeline performance accurately?", votes: 221, answers: 10, views: 19500, author_name: "evaluation_guru", author_reputation: 9800, tags: "rag,evaluation,llm,machine-learning", slug: "how-to-evaluate-rag-pipeline-performance-accurately" },
  { question_id: 78654337, title: "CrewAI vs AutoGen: Which multi-agent framework to choose?", votes: 334, answers: 17, views: 41000, author_name: "agent_architect", author_reputation: 18500, tags: "ai-agent,crewai,autogen,multi-agent,comparison", slug: "crewai-vs-autogen-which-multi-agent-framework-to-choose" },
  { question_id: 78654338, title: "DeepSeek R2 API integration: How to stream responses?", votes: 167, answers: 4, views: 11200, author_name: "deepseek_user", author_reputation: 2800, tags: "deepseek,api,streaming,python", slug: "deepseek-r2-api-integration-how-to-stream-responses" },
  { question_id: 78654339, title: "How to secure AI APIs against prompt injection attacks?", votes: 312, answers: 19, views: 36000, author_name: "security_pro", author_reputation: 22100, tags: "security,llm,prompt-injection,api", slug: "how-to-secure-ai-apis-against-prompt-injection-attacks" },
  { question_id: 78654340, title: "What's the best way to chunk documents for RAG with code files?", votes: 198, answers: 12, views: 17800, author_name: "code_chunker", author_reputation: 6500, tags: "rag,code,chunking,langchain,python", slug: "whats-the-best-way-to-chunk-documents-for-rag-with-code-files" },
];

async function main() {
  console.log("🌱 Seeding StackOverflow data...\n");
  for (const q of MOCK) {
    const tagList = q.tags.split(",");
    await prisma.stackOverflowQuestion.upsert({
      where: { question_id: q.question_id },
      update: {},
      create: {
        question_id: q.question_id, title: q.title, votes: q.votes, answers: q.answers,
        views: q.views, author_name: q.author_name, author_reputation: q.author_reputation,
        tags: JSON.stringify(tagList), slug: q.slug,
        body: `${q.title}\n\nPopular question about ${tagList.slice(0, 3).join(", ")}. Community provided ${q.answers} detailed answers.`,
        accepted_answer: `Answer: use ${tagList[0]} with proper error handling. Key code:\`\`\`python\n# ${tagList[0]} implementation\n\`\`\``,
        url: `https://stackoverflow.com/q/${q.question_id}`,
        keywords: JSON.stringify(tagList.slice(0, 5)),
        seo_title: `${q.title} - StackOverflow`,
        meta_description: `Q about ${tagList.slice(0, 3).join(", ")} — ${q.answers} answers, ${q.votes} votes.`,
        asked_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
        created_at: new Date(),
      },
    });
  }
  console.log(`✅ ${MOCK.length} StackOverflow questions seeded`);
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
