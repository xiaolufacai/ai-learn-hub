import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ title = "暂无内容", description = "还没有数据，请稍后再来" }: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
      <FileQuestion size={48} className="text-text-muted mb-4" />
      <h3 className="text-lg font-semibold text-text-secondary mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
