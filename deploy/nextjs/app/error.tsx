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
