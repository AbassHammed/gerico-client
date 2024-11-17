'use client';

import { ICompanyInfo } from '@/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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
  const { trigger, isMutating: loading } = useSWRMutation(
    `http://localhost:5000/api/company/update`,
    updateCompanyInfo,
  );

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

async function fetcher(url: string) {
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
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const data = (await response.json()) as ICompanyInfo;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useCompanyInfo() {
  const { data, error, isLoading } = useSWR<ICompanyInfo>(
    `http://localhost:5000/api/company`,
    fetcher,
  );

  return { companyInfo: data, loading: (!error && !data) || isLoading, error };
}
