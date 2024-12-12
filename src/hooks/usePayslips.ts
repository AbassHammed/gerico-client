'use client';

import { ICreatePayslip } from '@/types';

import { useApiMutationWithAuth } from './useApi';

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
