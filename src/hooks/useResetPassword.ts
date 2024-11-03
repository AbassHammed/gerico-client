'use client';

import { ResetPasswordType } from '@/types';
import useSWRMutation from 'swr/mutation';

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
    sessionStorage.removeItem('t_uid');
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useResetPassword() {
  const { trigger, isMutating: loading } = useSWRMutation(
    'http://localhost:5000/api/employee/reset-password',
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
