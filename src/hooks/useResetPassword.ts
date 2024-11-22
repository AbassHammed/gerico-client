'use client';

import { ResetPasswordType } from '@/types';
import { deleteCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useUser';

async function resetPass(url: string, { arg }: { arg: ResetPasswordType }) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { result } = (await response.json()) as { result: true };
    deleteCookie('t_uid');
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useResetPassword() {
  const { trigger, isMutating: loading } = useSWRMutation(
    `${API_URL}/users/reset-password`,
    resetPass,
  );

  const resetPassword = async (inputs: ResetPasswordType) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { resetPassword, loading };
}
