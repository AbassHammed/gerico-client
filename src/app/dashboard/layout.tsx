import { Metadata } from 'next';

import DLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DLayout>{children}</DLayout>;
}
