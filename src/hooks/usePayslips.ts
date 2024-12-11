/* eslint-disable quotes */
'use client';

import { ICreatePayslip } from '@/types';
import { getCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useUser';

async function create(url: string, { arg }: { arg: ICreatePayslip }) {
  try {
    const auth_token = getCookie('auth_token');
    if (!auth_token) {
      throw new Error("Looks like you're not connected");
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
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

    const { message } = (await response.json()) as { message: string };
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useCreatePayslip() {
  const { trigger, isMutating: loading } = useSWRMutation(`${API_URL}/payslip`, create);

  const createPayslip = async (inputs: ICreatePayslip) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { createPayslip, loading };
}
