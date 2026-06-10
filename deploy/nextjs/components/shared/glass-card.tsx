import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "a";
  href?: string;
}

export function GlassCard({ children, className, interactive = false, as: Component = "div", href }: GlassCardProps) {
  if (Component === "a" && href) {
    return (
      <a href={href} className={cn(interactive ? "glass-card-interactive" : "glass-card", className)}>
        {children}
      </a>
    );
  }
  return (
    <Component className={cn(interactive ? "glass-card-interactive" : "glass-card", className)}>
      {children}
    </Component>
  );
}
