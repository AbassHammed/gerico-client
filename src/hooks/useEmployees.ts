'use client';

import { IUser } from '@/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

import { API_URL } from './useUser';

async function fetcher(url: string) {
  try {
    const authToken = getCookie('auth_token');

    if (!authToken) {
      throw new Error('Admin is not connected');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { users } = (await response.json()) as { users: IUser[] };
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useEmployees() {
  const { data, error, isLoading } = useSWR<IUser[]>(`${API_URL}/users`, fetcher);

  return { employees: data, error, isLoading };
}
