'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { IRoute } from '@/types';
import {
  Button,
  Command_Shadcn,
  CommandEmpty_Shadcn,
  CommandGroup_Shadcn,
  CommandInput_Shadcn,
  CommandItem_Shadcn,
  CommandList_Shadcn,
  Home,
  Popover_Shadcn,
  PopoverContent_Shadcn,
  PopoverTrigger_Shadcn,
} from '@ui';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  generateSettingsRoutes,
  generateToolRoutes,
  ICON_SIZE,
  ICON_STROKE_WIDTH,
} from '../NavigationBar/NavigationBar.utils';

const RouteDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const defaultRoute: IRoute = {
    key: 'home',
    label: 'Home',
    icon: <Home size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: '/dashboard',
  };

  const routes = [...generateToolRoutes(), ...generateSettingsRoutes(), defaultRoute];

  const selectedRoute = routes.find(route => route.link === pathname);

  return (
    <div className="flex items-center px-2">
      <Popover_Shadcn open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger_Shadcn asChild>
          <Button type="text" className="pr-2" iconRight={<ChevronsUpDown />}>
            <div className="flex items-center space-x-2">
              <p className="text-xs">{selectedRoute?.label}</p>
            </div>
          </Button>
        </PopoverTrigger_Shadcn>
        <PopoverContent_Shadcn className="p-0" side="bottom" align="start">
          <Command_Shadcn>
            <CommandInput_Shadcn placeholder="Find routes ..." />
            <CommandList_Shadcn>
              <CommandEmpty_Shadcn>No routes found</CommandEmpty_Shadcn>
              <CommandGroup_Shadcn>
                {routes.map(route => (
                  <CommandItem_Shadcn
                    key={route.key}
                    value={route.key}
                    className="cursor-pointer w-full"
                    onSelect={() => {
                      router.push(route.link ?? '#');
                      setOpen(false);
                    }}
                    onClick={() => setOpen(false)}>
                    <Link
                      href={route.link ?? '#'}
                      className="w-full flex items-center justify-between">
                      {route.label}
                      {pathname.includes(route.link!) && <Check size={16} />}
                    </Link>
                  </CommandItem_Shadcn>
                ))}
              </CommandGroup_Shadcn>
            </CommandList_Shadcn>
          </Command_Shadcn>
        </PopoverContent_Shadcn>
      </Popover_Shadcn>
    </div>
  );
};

export default RouteDropdown;
