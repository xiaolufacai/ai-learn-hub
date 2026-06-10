interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <a href={href} className="text-sm text-accent hover:text-accent-purple transition-colors">
          {linkLabel} →
        </a>
      )}
    </div>
  );
}
