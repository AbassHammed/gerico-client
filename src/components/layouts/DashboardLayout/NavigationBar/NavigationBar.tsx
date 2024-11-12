'use client';

import { useState } from 'react';

import Image from 'next/legacy/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAppStateSnapshot } from '@/lib/app-state';
import { cn } from '@/lib/utils';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Home,
  Separator,
  User,
} from '@ui';

import {
  generateDateRoute,
  generateSettingsRoutes,
  generateToolRoutes,
  ICON_SIZE,
  ICON_STROKE_WIDTH,
} from './NavigationBar.utils';
import NavigationIconLink from './NavigationIconLink';

const profile = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
};

const NavigationBar = () => {
  const snap = useAppStateSnapshot();
  const pathname = usePathname();
  const router = useRouter();

  const [userDropdownOpen, setUserDropdownOpenState] = useState(false);

  const activeRoute = pathname;
  const dateRoute = generateDateRoute();
  const toolRoutes = generateToolRoutes();
  const settingsRoutes = generateSettingsRoutes();

  const onCloseNavigationIconLink = (event: any) => {
    snap.setNavigationPanelOpen(
      false,
      event.target.id === 'icon-link' || ['svg', 'path'].includes(event.target.localName),
    );
  };

  const UserAccountButton = (
    <Button
      type="text"
      size="tiny"
      className={cn(
        'mt-3 h-10 [&>span]:relative [&>span]:flex [&>span]:w-full [&>span]:h-full p-0',
      )}
      block>
      <div className="relative w-full h-full flex items-center justify-center">
        <figure className="absolute left-1.5 min-h-6 min-w-6 bg-foreground rounded-full flex items-center justify-center">
          <User size={ICON_SIZE - 2} strokeWidth={ICON_STROKE_WIDTH} className="text-background" />
        </figure>
        <span
          className={cn(
            'w-[8rem] flex flex-col items-start text-sm truncate',
            'absolute left-7 group-data-[state=expanded]:left-10',
            'group-data-[state=collapsed]:opacity-0 group-data-[state=expanded]:opacity-100',
            'transition-all',
          )}>
          {profile && (
            <>
              <span title={profile.last_name} className="w-full text-left text-foreground truncate">
                {`${profile.last_name} ${profile.first_name}`}
              </span>

              <span
                title={profile.email}
                className="w-full text-left text-foreground-light text-xs truncate">
                {profile.email}
              </span>
            </>
          )}
        </span>
      </div>
    </Button>
  );

  return (
    <div className="w-14 h-full flex flex-col">
      <nav
        data-state={snap.navigationPanelOpen ? 'expanded' : 'collapsed'}
        className={cn(
          'group py-2 z-10 h-full w-14 data-[state=expanded]:w-[13rem]',
          'border-r bg-dash-sidebar border-default data-[state=expanded]:shadow-xl',
          'transition-width duration-200',
          'hide-scrollbar flex flex-col justify-between overflow-y-auto',
        )}
        onMouseEnter={() => snap.setNavigationPanelOpen(true)}
        onMouseLeave={() => {
          if (!userDropdownOpen) {
            snap.setNavigationPanelOpen(false);
          }
        }}>
        <ul className="flex flex-col gap-y-1 justify-start px-2 relative">
          <Link
            href="#"
            className="mx-2 flex items-center h-[40px]"
            onClick={onCloseNavigationIconLink}>
            <Image
              alt="Gerico"
              priority
              quality={95}
              width={24}
              height={40}
              src={`/app/gerico-logo-icon.svg`}
              className="absolute h-[40px] w-6 cursor-pointer rounded"
            />
          </Link>
          {dateRoute.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute === route.key}
              onClick={onCloseNavigationIconLink}
            />
          ))}
          <NavigationIconLink
            isActive={activeRoute === '/dashboard'}
            route={{
              key: 'HOME',
              label: 'Home',
              icon: <Home size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
              link: `/dashboard`,
            }}
            onClick={onCloseNavigationIconLink}
          />
          <Separator className="my-1 bg-border-muted" />
          {toolRoutes.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute === route.link}
              onClick={onCloseNavigationIconLink}
            />
          ))}
          <Separator className="my-1 bg-border-muted" />
        </ul>

        <ul className="flex flex-col px-2 gap-y-1">
          {settingsRoutes.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute === route.key}
              onClick={onCloseNavigationIconLink}
            />
          ))}

          <DropdownMenu
            open={userDropdownOpen}
            onOpenChange={(open: boolean) => {
              setUserDropdownOpenState(open);
              if (open === false) {
                snap.setNavigationPanelOpen(false);
              }
            }}>
            <DropdownMenuTrigger asChild>{UserAccountButton}</DropdownMenuTrigger>

            <DropdownMenuContent side="top" align="start">
              <div className="px-2 py-1 flex flex-col gap-0 text-sm">
                {profile && (
                  <>
                    <span
                      title={profile.last_name}
                      className="w-full text-left text-foreground truncate">
                      {profile.last_name}
                    </span>
                    <span
                      title={profile.email}
                      className="w-full text-left text-foreground-light text-xs truncate">
                      {profile.email}
                    </span>
                  </>
                )}
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={async () => {
                    // await signOut();
                    await router.push('/sign-in');
                  }}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
