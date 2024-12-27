'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import { PagesRoutes } from '@/lib/constants';

import DashboardHeader from './DashboardHeader/DashboardHeader';
import NavigationBar from './NavigationBar/NavigationBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      if (!user.is_admin) {
        router.push(PagesRoutes.Employee_Home);
      }
    }
  }, [user]);

  return (
    <div className="flex h-screen min-h-0 basis-0 flex-1 !overflow-hidden">
      <div className="flex h-full w-full">
        <NavigationBar />
        <div className="h-full w-full flex flex-col">
          <DashboardHeader />
          <main className="h-full flex flex-col flex-1 w-full overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
