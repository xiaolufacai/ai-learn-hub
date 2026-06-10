import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 skeleton-pulse bg-surface-hover rounded-2xl h-48" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LoadingSkeleton count={4} variant="list" />
        </div>
        <div className="lg:col-span-1">
          <div className="glass-card skeleton-pulse h-64 mb-4" />
          <div className="glass-card skeleton-pulse h-48 mb-4" />
          <div className="glass-card skeleton-pulse h-48" />
        </div>
      </div>
    </div>
  );
}
