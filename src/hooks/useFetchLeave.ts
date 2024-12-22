'use client';

import { ILeaveRequest, ILeaveRequestInput, PaginatedResult, PaginationParams } from '@/types';

import { useApiGet, useApiMutation } from './useApi';

export function useCreateLeaveRequest() {
  const { trigger, isMutating: loading } = useApiMutation<undefined, ILeaveRequestInput>(
    '/leave-requests',
    undefined,
    'POST',
    true,
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
    undefined,
    true,
  );

  return {
    leaves: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useLeaveRequestForUser(params?: PaginationParams, status: string = '') {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<ILeaveRequest>>(
    `/leave-requests/me?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}&status=${status ?? ''}`,
    undefined,
    true,
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
  const { trigger, isMutating: loading } = useApiMutation<undefined, ILeaveRequest>(
    `/leave-requests/${leaveRequestId}`,
    undefined,
    'PATCH',
    true,
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
