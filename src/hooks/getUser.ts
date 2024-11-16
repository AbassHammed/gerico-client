'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { IUser } from '@/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

async function getUser(url: string) {
  const s_token = getCookie('auth_token');

  if (!s_token) {
    throw new Error('User is not connected');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${s_token}`,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { user } = await response.json();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useGetUser() {
  const { data, error, isLoading } = useSWR<IUser>('http://localhost:5000/api/users/me', getUser);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push('/auth/sign-in');
    }
  }, [data, isLoading, router]);

  return { user: data, error, isLoading };
}
