/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingV2 } from '@/components/ui';

// redirection sur la page de login

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    // push('/auth/sign-in');
  }, []);

  return (
    <LoadingV2
      size="20px"
      // desktopSize="120px"
      // mobileSize="60px"
      boxColors={['#0047b0', '#004de2', '#005bff']}
    />
  );
}
