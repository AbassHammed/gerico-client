'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { LoadingV2 } from '@/components/ui';
import { PagesRoutes } from '@/lib/constants';

export default function dashboardPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.push(PagesRoutes.Admin_Employees);
  }, []);
  return <LoadingV2 />;
}
