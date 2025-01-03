/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { ICreatePayslip, IPayslip, PaginatedResult, PaginationParams } from '@/types';

import { useApiGet, useApiMutation } from './useApi';

export function useCreatePayslip() {
  const { trigger, isMutating: loading } = useApiMutation<undefined, ICreatePayslip>(
    '/payslip',
    undefined,
    'POST',
    true,
  );

  const createPayslip = async (inputs: ICreatePayslip) => {
    try {
      const res = await trigger(inputs);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { createPayslip, loading };
}

export function usePayslipsQuery(params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IPayslip>>(
    `/payslip?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
    undefined,
    true,
  );

  return {
    payslips: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function usePayslipsQueryForUser(uid: string, params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IPayslip>>(
    `/payslip/${uid}?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
    undefined,
    true,
  );

  return {
    payslips: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}
