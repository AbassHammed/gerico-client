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
  const { data, error, isLoading, success, mutate } = useApiGet<PaginatedResult<ILeaveRequest>>(
    `/leave-requests/status?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}&status=${status}`,
    undefined,
    true,
  );

  return {
    mutate,
    leaves: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useUpcomingLeaveRequestsUser(uid: string) {
  const { data, error, isLoading, success, mutate } = useApiGet<ILeaveRequest[]>(
    `/leave-requests/upcoming/${uid}`,
    undefined,
    true,
  );

  return {
    mutate,
    leaves: data,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useUpcomingLeaveRequests() {
  const { data, error, isLoading, success } = useApiGet<ILeaveRequest[]>(
    '/leave-requests/upcoming',
    undefined,
    true,
  );

  return {
    leaves: data,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useLeaveRequestForUser(params?: PaginationParams, status: string = '') {
  const { data, error, isLoading, success, mutate } = useApiGet<PaginatedResult<ILeaveRequest>>(
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
    mutate,
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

export function useDeleteLeaveRequest(leaveRequestId: string) {
  const { trigger, isMutating: loading } = useApiMutation<undefined, undefined>(
    `/leave-requests/${leaveRequestId}`,
    undefined,
    'DELETE',
    true,
  );

  const deleteLeave = async () => {
    try {
      const res = await trigger(undefined);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { deleteLeave, loading };
}

export function useRemindLeaveRequest() {
  const { trigger, isMutating: loading } = useApiMutation<undefined, undefined>(
    `/leave-requests/reminder`,
    undefined,
    'POST',
    true,
  );

  const remindLeave = async () => {
    try {
      const res = await trigger(undefined);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { remindLeave, loading };
}
