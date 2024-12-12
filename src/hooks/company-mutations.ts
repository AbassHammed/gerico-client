'use client';

import { ICompanyInfo } from '@/types';

import { useApiGet, useApiMutationWithAuthAndPatch } from './useApi';

export function useUpdateCompanyInfo() {
  const { trigger, isMutating: loading } = useApiMutationWithAuthAndPatch<undefined, ICompanyInfo>(
    `/company`,
  );

  const updateCompany = async (arg: ICompanyInfo) => {
    try {
      const res = await trigger(arg);
      return res?.message;
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
