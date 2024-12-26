import { Metadata } from 'next';

import DLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Administrateur | Gerico ',
    default: 'Tableau de bord',
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DLayout>{children}</DLayout>;
}