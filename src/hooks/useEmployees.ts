'use client';

import { IUser, PaginatedResult, PaginationParams } from '@/types';

import { useApiGet } from './useApi';

export function useEmployees(params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IUser>>(
    `/users?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
    undefined,
    true,
  );

  return {
    employees: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}

export function useEmployeesAll() {
  const { data, error, isLoading, success } = useApiGet<IUser[]>(`/users/all`, undefined, true);

  return {
    employees: data,
    error,
    isLoading,
    isSuccess: success,
  };
}
