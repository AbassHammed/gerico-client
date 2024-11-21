'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import type { IUser } from '@/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchUser(url: string) {
  const token = getCookie('auth_token');
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  return res.json();
}

export function useUser() {
  const { data, error } = useSWR<{ user: IUser }>(`${API_URL}/users/me`, fetchUser);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
      const signInUrl = `/auth/sign-in?redirect=${currentPath}`;
      router.push(signInUrl);
    }
  }, [error, router]);

  return {
    user: data?.user,
    isLoading: !error && !data,
    error,
  };
}

export function useProfile(slug: string) {
  const { data, error, isValidating, isLoading } = useSWR<{ user: IUser }>(
    `${API_URL}/users/${slug}`,
    fetchUser,
  );
  return {
    user: data?.user,
    isLoading: (!error && !data) || isValidating || isLoading,
    error,
  };
}
