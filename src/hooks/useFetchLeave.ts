'use client';

import {
  ILeaveRequest,
  ILeaveRequestInput,
  IPayslip,
  PaginatedResult,
  PaginationParams,
} from '@/types';

import { useApiGet, useApiMutationWithAuth, useApiMutationWithAuthAndPatch } from './useApi';

export function useCreateLeaveRequest() {
  const { trigger, isMutating: loading } = useApiMutationWithAuth<undefined, ILeaveRequestInput>(
    '/leave-requests',
  );

  const createLeave = async (inputs: ILeaveRequestInput) => {
    try {
      const res = await trigger(inputs);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { createLeave, loading };
}

export function useLeaveRequestQuery(params?: PaginationParams, status?: string) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<ILeaveRequest>>(
    `/leave-requests?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}&status=${status}`,
  );

  return {
    leaves: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useLeaveRequestForUser(uid: string, params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IPayslip>>(
    `/leave-request/${uid}?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
  );

  return {
    leaves: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useUpdateLeaveRequest(leaveRequestId: string) {
  const { trigger, isMutating: loading } = useApiMutationWithAuthAndPatch<undefined, ILeaveRequest>(
    `/leave-requests/${leaveRequestId}`,
  );

  const updateLeave = async (inputs: ILeaveRequest) => {
    try {
      const res = await trigger(inputs);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { updateLeave, loading };
}
