/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Link from 'next/link';

import { PagesRoutes } from '@/lib/constants';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from '@ui';
import { HelpCircle } from 'lucide-react';

import { MainNav } from './Nav';
import AvatarDropdown from './UserAccount';

export function HomeLayoutHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <div className="flex flex-1 items-center gap-2 justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <AvatarDropdown />
          </div>
          <nav className="flex items-center gap-0.5">
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <div className="relative flex items-center">
                  <Button id="help-popover-button" type="text" className="px-1">
                    <Link href={PagesRoutes.Support} target="_blank" rel="noreferrer">
                      <HelpCircle size={16} strokeWidth={1.5} className="text-foreground-light" />
                      <span className="sr-only">Assistance</span>
                    </Link>
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" className="z-50">
                  <Tooltip.Arrow className="radix-tooltip-arrow" />
                  <div
                    className={[
                      'rounded bg-alternative py-1 px-2 leading-none shadow',
                      'space-y-2 border border-background',
                    ].join(' ')}>
                    <p className="text-xs text-foreground">Assistance</p>
                  </div>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </nav>
        </div>
      </div>
    </header>
  );
}
