'use client';

import { IUser, PaginatedResult, PaginationParams } from '@/types';

import { useApiGet } from './useApi';

export function useEmployees(params?: PaginationParams) {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IUser>>(
    `/users?page=${params?.page}&limit=${params?.limit}&offset=${params?.offset}`,
  );

  return {
    employees: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}
