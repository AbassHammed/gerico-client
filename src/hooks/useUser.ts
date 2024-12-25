'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { PagesRoutes } from '@/lib/constants';
import type { IUser } from '@/types';

import { useApiGet } from './useApi';

export function useUser() {
  const { data, error, isLoading } = useApiGet<IUser>('/users/me', undefined, true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem('redirectTo', currentPath);

      router.push(PagesRoutes.Auth_SignIn);
    }
  }, [data, isLoading, router]);

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
