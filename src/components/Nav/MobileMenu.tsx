'use client';

import React, { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';
import { PagesRoutes } from '@/lib/constants';
import { Button } from '@ui';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menu: any;
}

const MobileMenu = ({ open, setOpen, menu }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { user, isLoading: isUserLoading } = useUser();

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.15, staggerChildren: 0.05, ease: [0.24, 0.25, 0.05, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.24, 0.25, 0.05, 1] } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  };

  const Menu = () => (
    <div className="space-y-1">
      {menu.primaryNav.map((menuItem: any) => (
        <m.div variants={listItem} className="border-b [&>div]:!rounded-none" key={menuItem.title}>
          {
            <Link
              href={menuItem.url}
              className="block py-2 pl-3 pr-4 text-base font-medium text-foreground hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded">
              {menuItem.title}
            </Link>
          }
        </m.div>
      ))}
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-overlay fixed overflow-hidden inset-0 z-50 h-screen max-h-screen w-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] transform">
            <div className="absolute h-16 px-6 flex items-center justify-between w-screen left-0 top-0 z-50 bg-overlay before:content[''] before:absolute before:w-full before:h-3 before:inset-0 before:top-full before:bg-gradient-to-b before:from-background-overlay before:to-transparent">
              <Link
                href="/"
                as="/"
                className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm">
                <Image
                  src={'/app/gerico-logo-wordmark.svg'}
                  width={124}
                  height={24}
                  alt="Gérico Logo"
                  priority
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground-lighter focus:ring-brand hover:text-foreground-light transition-colors focus:outline-none focus:ring-2 focus:ring-inset">
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-auto pt-20 pb-32 px-4">
              <Menu />
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-auto w-full bg-alternative flex items-stretch p-4 gap-4">
              {!isUserLoading && (
                <>
                  {isLoggedIn ? (
                    <Link href={PagesRoutes.Admin_Dashboard} passHref legacyBehavior>
                      <Button block asChild>
                        <a type={undefined} className="h-10 py-4">
                          Tableau de bord
                        </a>
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href={PagesRoutes.Auth_SignIn} passHref legacyBehavior>
                        <Button block type="default" asChild>
                          <a type={undefined} className="h-10 py-4">
                            Se connecter
                          </a>
                        </Button>
                      </Link>
                      <Link href={PagesRoutes.Contact} passHref legacyBehavior>
                        <Button block asChild>
                          <a type={undefined} className="h-10 py-4">
                            Contacter Gérico
                          </a>
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-alternative fixed overflow-hidden inset-0 z-40 h-screen w-screen transform"
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default MobileMenu;
