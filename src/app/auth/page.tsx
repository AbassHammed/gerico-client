'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

// redirection sur la page de login

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/auth/sign-in');
  }, []);
}
