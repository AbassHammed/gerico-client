'use client';

import { ICreatePayslip, IPayslip, PaginatedResult, PaginationParams } from '@/types';

import { useApiGet, useApiMutationWithAuth } from './useApi';

export function useCreatePayslip() {
  const { trigger, isMutating: loading } = useApiMutationWithAuth<undefined, ICreatePayslip>(
    '/payslip',
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

export function useInvoicesQuery(params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IPayslip>>(
    `/payslip?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
  );

  return {
    payslips: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useInvoicesQueryForUser(uid: string, params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IPayslip>>(
    `/payslip/${uid}?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
  );

  return {
    payslips: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}
