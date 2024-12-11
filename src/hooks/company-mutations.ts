'use client';

import { ICompanyInfo } from '@/types';
import { getCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { useApiGet } from './useApi';
import { API_URL } from './useUser';

async function updateCompanyInfo(url: string, { arg }: { arg: ICompanyInfo }) {
  try {
    const authToken = getCookie('auth_token');

    if (!authToken) {
      throw new Error('You are not connected.');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await fetch(url, {
      method: 'PATCH',
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

export function useUpdateCompanyInfo() {
  const { trigger, isMutating: loading } = useSWRMutation(`${API_URL}/company`, updateCompanyInfo);

  const updateCompany = async (arg: ICompanyInfo) => {
    try {
      const res = await trigger(arg);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { updateCompany, loading };
}

export function useCompanyInfo() {
  const { data, error, isLoading, isValidating, mutate } = useApiGet<ICompanyInfo>('/company', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    companyInfo: data,
    loading: isLoading || isValidating,
    error,
    mutateCompanyInfo: mutate,
  };
}
