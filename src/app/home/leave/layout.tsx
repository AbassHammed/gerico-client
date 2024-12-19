import React from 'react';

import { ScaffoldDivider } from '@/components/ui';

import LeaveLayout from './components/LeaveLayout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <React.Fragment>
      <LeaveLayout />
      <ScaffoldDivider />
      {children}
    </React.Fragment>
  );
}
