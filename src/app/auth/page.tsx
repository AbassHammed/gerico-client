'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingV2 } from '@/components/ui';
import { PagesRoutes } from '@/lib/constants';

// redirection sur la page de login

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push(PagesRoutes.Auth_SignIn);
  }, []);

  return <LoadingV2 />;
}
