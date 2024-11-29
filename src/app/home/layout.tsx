import { Metadata } from 'next';

import HLayout from '@/components/layouts/HomeLayout/homeLayout';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HLayout>{children}</HLayout>;
}
