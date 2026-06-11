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
  Twitter,
  Terminal,
  BarChart3,
  LayoutDashboard,
  Layers,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "AI 仪表盘", icon: LayoutDashboard },
  { href: "/", label: "首页", icon: Home },
  { href: "/news", label: "AI 新闻", icon: Newspaper },
  { href: "/sentiment", label: "AI 舆情", icon: BarChart3 },
  { href: "/x", label: "X 动态", icon: Twitter },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/linuxdo", label: "Linux.do", icon: Terminal },
  { href: "/tools", label: "AI 工具", icon: Wrench },
  { href: "/stackoverflow", label: "StackOverflow", icon: Layers },
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
