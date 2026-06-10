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
