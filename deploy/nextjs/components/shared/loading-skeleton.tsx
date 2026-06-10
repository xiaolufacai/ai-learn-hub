interface LoadingSkeletonProps {
  count?: number;
  variant?: "card" | "list" | "hero";
}

export function LoadingSkeleton({ count = 6, variant = "card" }: LoadingSkeletonProps) {
  return (
    <div className={variant === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card animate-pulse">
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-4 w-3/4 mb-3" />
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-3 w-full mb-2" />
          <div className="skeleton-pulse bg-surface-hover rounded-lg h-3 w-2/3 mb-4" />
          <div className="flex gap-2">
            <div className="skeleton-pulse bg-surface-hover rounded-full h-5 w-16" />
            <div className="skeleton-pulse bg-surface-hover rounded-full h-5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
