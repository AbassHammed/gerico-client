'use client';

import { ILoginInputs } from '@/types';
import useSWRMutation from 'swr/mutation';

async function sendRequest(url: string, { arg }: { arg: ILoginInputs }) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error);
    }

    const { token, code, user } = await response.json();
    sessionStorage.setItem('token', token);

    // there are only three case where a `code` is being returned from the back
    // 1&2. when the password is in incorrect or email not found in the db in which case the status code is 400 so `!response.ok` will pass and an error will be thrown
    // 3. when the user used a default password
    if (code === 'DEFAULTPASS') {
      return { code, user: null };
    }

    return { code: null, user };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useLogin() {
  const { trigger, isMutating: loading } = useSWRMutation(
    'http://localhost:5000/api/login',
    sendRequest,
  );

  const login = async (inputs: ILoginInputs) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { login, loading };
}
