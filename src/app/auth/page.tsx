'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingV2 } from '@/components/ui';

// redirection sur la page de login

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/auth/sign-in');
  }, []);

  return <LoadingV2 />;
}
