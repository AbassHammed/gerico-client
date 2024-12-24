import React from 'react';

import { Metadata } from 'next';

import { ScaffoldDivider } from '@/components/ui';

import LeaveLayout from './components/LeaveLayout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'Demandes de congé',
    template: '%s | Gerico',
  },
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <React.Fragment>
      <LeaveLayout />
      <ScaffoldDivider />
      {children}
    </React.Fragment>
  );
}
