'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import type { IUser } from '@/types';

import { useApiGet } from './useApi';

export function useUser() {
  const { data, error, isLoading } = useApiGet<IUser>('/users/me', undefined, true);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
      const signInUrl = `/auth/sign-in?redirect=${currentPath}`;
      router.push(signInUrl);
    }
  }, [error, router]);

  return {
    user: data,
    isLoading,
    error,
  };
}

export function useProfile(slug: string) {
  const { data, error, isLoading, mutate } = useApiGet<IUser>(`/users/${slug}`, undefined, true);
  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}
