'use client';

import type { IUser } from '@/types';

import { useApiGet } from './useApi';

export function useUser() {
  const { data, error, isLoading } = useApiGet<IUser>('/users/me', undefined, true);

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
