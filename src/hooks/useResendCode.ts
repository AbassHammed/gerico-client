'use client';

import { getCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

async function sendReset_Code(url: string) {
  try {
    const uid = getCookie('t_uid');

    if (!uid) {
      throw new Error('An error occured while sending info to the server, kindly retry the reset');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { sent } = (await response.json()) as { sent: boolean };
    return sent;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useResendCode() {
  const { trigger, isMutating: loading } = useSWRMutation(
    'http://localhost:5000/api/v1/users/resend-password-code',
    sendReset_Code,
  );

  const sendResetCode = async () => {
    try {
      const res = await trigger();
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { sendResetCode, loading };
}
