/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { IIssue, IIssueInput, PaginationParams } from '@/types';

import { useApiGet, useApiMutation } from './useApi';

export function useMarkIssueAsResolved(issueId: string) {
  const { trigger, isMutating: loading } = useApiMutation<{ result: true }, void>(
    `/issues/${issueId}/solved`,
    undefined,
    'PATCH',
    true,
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
    undefined,
    true,
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
  } = useApiMutation<undefined, IIssueInput>('/issues', undefined, 'POST');

  const reportIssue = async (inputs: IIssueInput) => {
    try {
      await trigger(inputs);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { reportIssue, loading, isSuccess };
}
