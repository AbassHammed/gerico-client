'use client';

import { IIssue, IIssueInput, PaginationParams } from '@/types';

import { useApiGet, useApiMutation } from './useApi';

export function useMarkIssueAsResolved(issueId: string) {
  const { trigger, isMutating: loading } = useApiMutation<{ result: true }, void>(
    `/issues/${issueId}/solved`,
  );

  const markAsSolved = async () => {
    try {
      const res = await trigger();
      return res?.data?.result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { markAsSolved, loading };
}

export function useGetIssues(query?: PaginationParams) {
  const { data, isLoading, error } = useApiGet<IIssue[]>(
    `/issues?page=${query?.page}&limit=${query?.limit}&offset=${query?.offset}`,
  );

  return {
    issues: data,
    loading: isLoading,
    error,
  };
}

export function useGetNotSolvedIssues(params?: PaginationParams) {
  const { data, isLoading, error } = useApiGet<IIssue[]>(
    `/issues/get-not-solved?page=${params?.page}?limit=${params?.limit}?offset=${params?.offset}`,
  );

  return {
    issues: data,
    loading: isLoading,
    error,
  };
}

export function useReportIssue() {
  const {
    trigger,
    isMutating: loading,
    isSuccess,
  } = useApiMutation<undefined, IIssueInput>('/issues');

  const reportIssue = async (inputs: IIssueInput) => {
    try {
      await trigger(inputs);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { reportIssue, loading, isSuccess };
}
