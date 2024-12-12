'use client';

import { IChangePasswordInput, IUser } from '@/types';
import { setCookie } from 'cookies-next';

import { useApiMutationWithAuth } from './useApi';

export default function useChangeDefaultPassword() {
  const {
    trigger,
    isMutating: loading,
    isSuccess,
  } = useApiMutationWithAuth<{ token: string; user: IUser }, IChangePasswordInput>(
    '/users/change-default-password',
  );

  const change = async (inputs: IChangePasswordInput) => {
    try {
      const res = await trigger(inputs);
      if (res?.data?.token) {
        setCookie('auth_token', res?.data?.token);
      }
      return res?.data?.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { change, loading, isSuccess };
}
