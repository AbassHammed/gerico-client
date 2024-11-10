'use client';

import { ReactNode } from 'react';

import DashboardHeader from './DashboardHeader/DashboardHeader';
import NavigationBar from './NavigationBar/NavigationBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => (
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

export default DashboardLayout;
