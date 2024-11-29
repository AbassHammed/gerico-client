/* eslint-disable no-console */
'use client';

import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui';
import { LogOut, User } from 'lucide-react';

interface UserInfo {
  civility: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
}

export default function AvatarDropdown() {
  const [user] = useState<UserInfo>({
    civility: 'Monsieur',
    first_name: 'John',
    last_name: 'Doe',
    job_title: 'Software Engineer',
    email: 'john.doe@example.com',
  });

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium leading-none">
              {user.civility} {user.last_name} {user.first_name}
            </p>
            <p className="text-xs text-foreground-light">{user.job_title}</p>
          </div>
          <div className="w-[32px] h-[32px] bg-surface-100 border border-overlay rounded-full text-foreground-lighter flex items-center justify-center">
            <User size={16} strokeWidth={1.5} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.civility} {user.last_name} {user.first_name}
            </p>
            <p className="text-xs leading-none text-foreground-light">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
