/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { ICompanyInfo } from '@/types';

import { useApiGet, useApiMutation } from './useApi';

export function useUpdateCompanyInfo() {
  const { trigger, isMutating: loading } = useApiMutation<undefined, ICompanyInfo>(
    `/company`,
    undefined,
    'PATCH',
    true,
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
  const { data, error, isLoading, isValidating, mutate } = useApiGet<ICompanyInfo>(
    '/company',
    undefined,
    true,
  );

  return {
    companyInfo: data,
    loading: isLoading || isValidating,
    error,
    mutateCompanyInfo: mutate,
  };
}
