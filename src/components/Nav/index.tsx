'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';
import { PagesRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@ui';
import { useWindowSize } from 'usehooks-ts';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/shadcn/ui/navigation-menu';
import HamburgerButton from './HamburgerMenu';
import MobileMenu from './MobileMenu';

interface Props {
  hideNavbar: boolean;
}

const Nav = (props: Props) => {
  const { user, isLoading: isUserLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { width } = useWindowSize();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (width >= 1024) {
      setOpen(false);
    }
  }, [width]);

  if (props.hideNavbar) {
    return null;
  }

  return (
    <div className={cn('sticky top-0 z-40 bg-background/90 backdrop-blur-sm')}>
      <nav className="relative z-40 border-b border-default">
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
            <div className="flex items-center">
              <div className="flex items-center flex-shrink-0">
                <Link href="/" className="block w-auto h-6 focus-visible:ring-2">
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
                className="hidden pl-8 sm:space-x-4 lg:flex h-16"
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
            <div className="hidden lg:flex items-center gap-2 animate-fade-in">
              {!isUserLoading && (
                <>
                  {isLoggedIn ? (
                    <Button className="text-white" asChild>
                      <Link href={PagesRoutes.Admin_Dashboard}>Tableau de bord</Link>
                    </Button>
                  ) : (
                    <Button className="text-white" asChild>
                      <Link href={PagesRoutes.Auth_SignIn}>Se connecter</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <HamburgerButton toggleFlyOut={() => setOpen(true)} />
        </div>
        <MobileMenu
          open={open}
          setOpen={setOpen}
          menu={{
            primaryNav: [
              {
                title: 'A propos',
                url: PagesRoutes.About,
              },
              {
                title: 'Contact',
                url: PagesRoutes.Contact,
              },
            ],
          }}
        />
      </nav>
    </div>
  );
};

export default Nav;
