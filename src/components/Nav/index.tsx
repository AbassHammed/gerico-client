'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';
import { PagesRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@ui';

import HamburgerButton from './HamburgerMenu';
import MobileMenu from './MobileMenu';

interface Props {
  hideNavbar: boolean;
}

const Nav = (props: Props) => {
  const { user, isLoading: isUserLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (open) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  // Close mobile menu when desktop
  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      setOpen(false);
    }
  }, [window.innerWidth]);

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
              </div>
              <div className="flex items-center gap-2 animate-fade-in !scale-100 delay-300">
                {!isUserLoading && (
                  <>
                    {isLoggedIn ? (
                      <Button asChild>
                        <Link href={PagesRoutes.Admin_Dashboard}>Tableau de bord</Link>
                      </Button>
                    ) : (
                      <>
                        <Button asChild>
                          <Link href={PagesRoutes.Auth_SignIn}>Se connecter</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <HamburgerButton toggleFlyOut={() => setOpen(true)} />
          </div>
          <MobileMenu open={open} setOpen={setOpen} />
        </nav>
      </div>
    </>
  );
};

export default Nav;
