'use client';

import { IIssue, IIssueInput } from '@/types';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useUser';

async function markIssueAsResolved(url: string) {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { result } = (await response.json()) as { result: true };
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useMarkIssueAsResolved(issueId: string) {
  const { trigger, isMutating: loading } = useSWRMutation(
    `${API_URL}/issues/${issueId}/solved`,
    markIssueAsResolved,
  );

  const markAsSolved = async () => {
    try {
      const res = await trigger();
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { markAsSolved, loading };
}

async function fetcher(url: string) {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('You are not connected.');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { result } = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getIssues() {
  const { data, isLoading, error } = useSWR<IIssue[]>(
    'http://localhost:5000/api/issues/get-issues',
    fetcher,
    {
      refreshInterval: 0,
    },
  );

  return {
    issues: data,
    loading: isLoading,
    error,
  };
}

export function getNotSolvedIssues() {
  const { data, isLoading, error } = useSWR<IIssue[]>(
    'http://localhost:5000/api/issues/get-not-solved',
    fetcher,
    {
      refreshInterval: 0,
    },
  );

  return {
    issues: data,
    loading: isLoading,
    error,
  };
}

async function issueReporter(url: string, { arg }: { arg: IIssueInput }) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { result } = (await response.json()) as { result: true };
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useReportIssue() {
  const { trigger, isMutating: loading } = useSWRMutation(`${API_URL}/issues`, issueReporter);

  const reportIssue = async (inputs: IIssueInput) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { reportIssue, loading };
}
