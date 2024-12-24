import Link from 'next/link';

import { PagesRoutes } from '@/lib/constants';
import { Button_Shadcn } from '@ui';
import { HelpCircle } from 'lucide-react';

import { MainNav } from './Nav';
import AvatarDropdown from './UserAccount';

export function HomeLayoutHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <div className="flex flex-1 items-center gap-2 justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <AvatarDropdown />
          </div>
          <nav className="flex items-center gap-0.5">
            <Button_Shadcn variant="ghost" size="icon" className="h-8 w-8 px-0">
              <Link href={PagesRoutes.Support} target="_blank" rel="noreferrer">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Support</span>
              </Link>
            </Button_Shadcn>
          </nav>
        </div>
      </div>
    </header>
  );
}
