'use client';

import { IUser, PaginatedResult } from '@/types';

import { useApiGet } from './useApi';

export function useEmployees() {
  const { data, error, isLoading, success } = useApiGet<PaginatedResult<IUser>>('/users');

  return {
    employees: data?.data,
    pagination: data?.pagination,
    error,
    isLoading,
    isSuccess: success,
  };
}
