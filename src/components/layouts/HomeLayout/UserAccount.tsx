'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui';
import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';

export default function AvatarDropdown() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('auth_token');
    router.push('/auth/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium leading-none">
              {user?.civility} {user?.last_name} {user?.first_name}
            </p>
            <p className="text-xs text-foreground-light">{user?.job_title}</p>
          </div>
          <Image
            alt={user?.first_name || 'User avatar'}
            src={`https://avatar.vercel.sh/${user?.uid}.png?size=64`}
            width="32"
            height="32"
            className="border rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.civility} {user?.last_name} {user?.first_name}
            </p>
            <p className="text-xs leading-none text-foreground-light">{user?.email}</p>
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
