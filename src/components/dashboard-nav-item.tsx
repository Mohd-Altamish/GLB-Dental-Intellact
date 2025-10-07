'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardNavItemProps {
  href: string;
  children: React.ReactNode;
}

export function DashboardNavItem({ href, children }: DashboardNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'bg-accent text-primary'
      )}
    >
      {children}
    </Link>
  );
}
