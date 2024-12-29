'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';

interface NavItemPropsType {
  label: string;
  href: string;
}

function NavItem({ label, href }: NavItemPropsType) {
  return (
    <li>
      <Link href={href}>
        <Typography
          as="a"
          color="blue-gray"
          className="p-1 font-medium text-black text-left hover:text-blue-500 transition-colors">
          {label}
        </Typography>
      </Link>
    </li>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col items-start justify-start gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-start lg:gap-8 text-black">
      <NavItem label="À propos" href="/a-propos" />
      <NavItem label="Nos services" href="/services" />
      <NavItem label="Nous contacter" href="/contact" />
    </ul>
  );
}

export function HomeNavbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(cur => !cur);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpen(false));
  }, []);

  return (
    <Navbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-black">
        <Typography as="div" color="blue-gray" className="mr-4 cursor-pointer text-lg font-bold">
          <div style={{ maxWidth: '200px' }}>
            <Link href="/">
              <Image
                src="/Gerico2.svg"
                alt="Gerico Logo"
                layout="responsive"
                width={4}
                height={1}
              />
            </Link>
          </div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <Button color="gray" className="hidden lg:inline-block bg-brand-300 normal-case">
          <Link href="/auth/se-connecter/">Se connecter</Link>
        </Button>

        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden">
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={open}>
        <div
          className={`mt-2 py-2 px-4 ${
            open ? 'bg-transparent' : 'bg-transparent'
          } ${open ? 'rounded-none' : 'rounded-none'} flex flex-col justify-start items-start`}>
          <NavList />
          <Button className="mb-2 text-white bg-brand-300 flex justify-start normal-case">
            <Link href="/auth/se-connecter/">Se connecter</Link>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
