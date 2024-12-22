'use client';

import { ResetPasswordType } from '@/types';
import { deleteCookie } from 'cookies-next';

import { useApiMutation } from './useApi';

export function useResetPassword() {
  const {
    trigger,
    isMutating: loading,
    isSuccess,
  } = useApiMutation<{ result: true }, ResetPasswordType>(
    '/users/reset-password',
    undefined,
    'POST',
  );

  const resetPassword = async (inputs: ResetPasswordType) => {
    try {
      const res = await trigger(inputs);
      if (res?.data?.result) {
        deleteCookie('t_uid');
      }
      return res?.data?.result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { resetPassword, loading, isSuccess };
}
