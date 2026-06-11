import { Newspaper, Github, Smile, MessageCircle, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: { direction: "up" | "down"; pct: number };
  color: string;
}

export function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  return (
    <div className="glass-card-interactive group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend.direction === "up" ? "text-emerald-400" : "text-red-400"}`}>
            {trend.direction === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.pct}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary mb-1 font-mono">{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}
