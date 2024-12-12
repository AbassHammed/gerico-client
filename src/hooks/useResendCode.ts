'use client';

import { getCookie } from 'cookies-next';

import { useApiMutation } from './useApi';

export function useResendCode() {
  const { trigger, isMutating: loading } = useApiMutation<{ sent: boolean }, { uid: string }>(
    '/users/resend-password-code',
  );

  const sendResetCode = async () => {
    try {
      const uid = getCookie('t_uid');
      if (!uid) {
        throw new Error(
          'An error occurred while sending info to the server, kindly retry the reset',
        );
      }
      const res = await trigger({ uid });
      return res?.data?.sent;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { sendResetCode, loading };
}
