'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';
import { PagesRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@ui';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/shadcn/ui/navigation-menu';

interface Props {
  hideNavbar: boolean;
}

const Nav = (props: Props) => {
  const { user, isLoading: isUserLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  if (props.hideNavbar) {
    return null;
  }

  return (
    <>
      <div
        className={cn('sticky top-0 z-40 transform')}
        style={{ transform: 'translate3d(0,0,999px)' }}>
        <div
          className={cn(
            'absolute inset-0 h-full w-full bg-background/90',
            '!opacity-100 transition-opacity',
          )}
        />
        <nav
          className={cn(
            `relative z-40 border-default border-b backdrop-blur-sm transition-opacity`,
          )}>
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <Link
                    href="/"
                    className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm">
                    <Image
                      src={'/app/gerico-logo-wordmark.svg'}
                      width={124}
                      height={24}
                      alt="Gérico Logo"
                      priority
                    />
                  </Link>
                </div>
                <NavigationMenu
                  delayDuration={0}
                  className="pl-8 sm:space-x-4 flex h-16"
                  viewportClassName="rounded-xl bg-background">
                  <NavigationMenuList>
                    {[
                      { title: 'A propos', url: PagesRoutes.About },
                      { title: 'Contact', url: PagesRoutes.Contact },
                    ].map((item, idx) => (
                      <NavigationMenuItem className="text-sm font-medium" key={idx}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            className={cn(
                              'group/menu-item flex items-center text-sm hover:text-foreground select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter focus-visible:text-foreground group-hover:bg-transparent text-foreground focus-visible:text-brand-link',
                            )}>
                            <div className="flex flex-col justify-center">
                              <div className="flex items-center gap-1">
                                <p className={cn('leading-snug text-foreground')}>{item.title}</p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="flex items-center gap-2 animate-fade-in !scale-100 delay-300">
                {!isUserLoading && (
                  <>
                    {isLoggedIn ? (
                      <Button className="text-white" asChild>
                        <Link href={PagesRoutes.Admin_Dashboard}>Tableau de bord</Link>
                      </Button>
                    ) : (
                      <>
                        <Button className="text-white" asChild>
                          <Link href={PagesRoutes.Auth_SignIn}>Se connecter</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
