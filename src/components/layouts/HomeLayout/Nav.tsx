'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/shared/Logo';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">{siteConfig.name}</span>
      </Link>
      {(currentPath === '/home/leave' || currentPath === '/home/payslip') && (
        <nav className="flex items-center gap-4 text-sm xl:gap-6">
          <Link
            href="/docs"
            className={cn('transition-colors hover:text-foreground/80', 'text-foreground/80')}>
            {currentPath === '/home/leave'
              ? 'Congés'
              : currentPath === '/home/payslip'
                ? 'Bulletin de paie'
                : null}
          </Link>
        </nav>
      )}
    </div>
  );
}
