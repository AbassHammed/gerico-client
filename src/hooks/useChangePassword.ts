'use client';

import { IChangePasswordInput } from '@/types';
import { getCookie, setCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useApi';

async function changePassword(url: string, { arg }: { arg: IChangePasswordInput }) {
  try {
    const s_token = getCookie('auth_token');

    if (!s_token) {
      throw new Error('User is not connected');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${s_token}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { token, user } = await response.json();
    setCookie('auth_token', token);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useChangeDefaultPassword() {
  const { trigger, isMutating: loading } = useSWRMutation(
    `${API_URL}/users/change-default-password`,
    changePassword,
  );

  const change = async (inputs: IChangePasswordInput) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { change, loading };
}
