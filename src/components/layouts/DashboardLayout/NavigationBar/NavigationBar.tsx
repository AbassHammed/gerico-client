'use client';

import { useState } from 'react';

import Image from 'next/legacy/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
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
} from '@ui';
import { deleteCookie } from 'cookies-next';

import {
  generateDateRoute,
  generateSettingsRoutes,
  generateToolRoutes,
  ICON_SIZE,
  ICON_STROKE_WIDTH,
} from './NavigationBar.utils';
import NavigationIconLink from './NavigationIconLink';

const NavigationBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user: profile } = useUser();

  const [userDropdownOpen, setUserDropdownOpenState] = useState(false);

  const activeRoute = pathname;
  const dateRoute = generateDateRoute();
  const toolRoutes = generateToolRoutes();
  const settingsRoutes = generateSettingsRoutes();

  const onSignOut = async () => {
    deleteCookie('auth_token');
    router.push('/auth/sign-in');
  };

  const UserAccountButton = (
    <Button
      type="text"
      size="tiny"
      className={cn(
        'mt-3 h-10 [&>span]:relative [&>span]:flex [&>span]:w-full [&>span]:h-full p-0',
      )}
      block>
      <div className="relative w-full h-full flex flex-row items-center justify-center space-x-4">
        <div className="absolute left-0.5 h-8 w-8 rounded-full flex items-center justify-center">
          <Image
            alt={profile?.first_name}
            src={`https://avatar.vercel.sh/${profile?.uid}.png?size=80`}
            width="40"
            height="40"
            className="border rounded-full"
          />
        </div>
        <span
          className={cn(
            'w-[8rem] flex flex-col items-start text-sm truncate',
            'left-7 group-md:left-10',
            'opacity-0 md:opacity-100',
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
    <div className="w-14 md:w-[13rem]  h-full flex flex-col">
      <nav
        className={cn(
          'group py-2 z-10 h-full w-14 md:w-[13rem]',
          'border-r bg-dash-sidebar border-default',
          'transition-width duration-200',
          'hide-scrollbar flex flex-col justify-between overflow-y-auto',
        )}>
        <ul className="flex flex-col gap-y-1 justify-start px-2 relative">
          <Link href="#" className="md:hidden mx-2 flex items-center h-[40px]">
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
          <Link href="/dashboard" className="hidden md:flex mx-2 items-center h-[40px]">
            <Image
              src="/app/gerico-logo-wordmark.svg"
              alt="Gérico Logo"
              height={24}
              width={100}
              quality={95}
              priority
              className="absolute h-[40px] cursor-pointer rounded"
            />
          </Link>
          {dateRoute.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute.includes(route.link!)}
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
          />
          <Separator className="my-1 bg-border-muted" />
          {toolRoutes.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute.includes(route.link!)}
            />
          ))}
          <Separator className="my-1 bg-border-muted" />
        </ul>

        <ul className="flex flex-col px-2 gap-y-1">
          {settingsRoutes.map(route => (
            <NavigationIconLink
              key={route.key}
              route={route}
              isActive={activeRoute.includes(route.link!)}
            />
          ))}

          <Separator className="my-1 bg-border-muted" />

          <DropdownMenu
            open={userDropdownOpen}
            onOpenChange={(open: boolean) => {
              setUserDropdownOpenState(open);
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
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={onSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
