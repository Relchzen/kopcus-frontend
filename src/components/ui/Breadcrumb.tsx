import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
  className?: string;
  theme?: 'light' | 'dark';
}

export function Breadcrumb({ items, className, theme = 'light' }: BreadcrumbProps) {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white/60' : 'text-neutral-400';
  const activeColor = isDark ? 'text-white' : 'text-neutral-900';
  const hoverColor = isDark ? 'hover:text-white' : 'hover:text-neutral-900';

  return (
    <nav className={cn('flex items-center gap-2 text-sm font-medium', textColor, className)}>
      <Link href="/" className={cn('transition-colors', hoverColor)}>
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className={cn('transition-colors', hoverColor)}>
              {item.label}
            </Link>
          ) : (
            <span className={activeColor}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
