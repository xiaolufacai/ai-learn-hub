import Link from "next/link";
import { Search, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 lg:pl-[220px]">
      <div className="glass mx-3 mt-3 px-4 py-3 flex items-center justify-between">
        {/* Left: status indicator */}
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
