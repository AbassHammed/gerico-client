'use client';

import useSWRMutation from 'swr/mutation';

async function forgotPassword(url: string, { arg }: { arg: { email: string } }) {
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

    const { uid, sent } = (await response.json()) as { uid: string; sent: boolean };
    sessionStorage.setItem('t_uid', uid);
    return sent;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useForgotPassword() {
  const { trigger, isMutating: loading } = useSWRMutation(
    'http://localhost:5000/api/employee/forgot-password',
    forgotPassword,
  );

  const sendMail = async (inputs: { email: string }) => {
    try {
      const sent = await trigger(inputs);
      return sent;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { sendMail, loading };
}
