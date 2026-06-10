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
