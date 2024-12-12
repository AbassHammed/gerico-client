import { getCookie } from 'cookies-next';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher<T>(url: string): Promise<ApiResponse<T>> {
  const authToken = getCookie('auth_token');
  if (!authToken) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || 'An unexpected error occurred');
  }

  return apiResponse;
}

async function poster<T, A>(url: string, { arg }: { arg: A }): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || 'An unexpected error occurred');
  }

  return apiResponse;
}

async function posterWithAuth<T, A>(url: string, { arg }: { arg: A }): Promise<ApiResponse<T>> {
  const authToken = getCookie('auth_token');
  if (!authToken) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(arg),
  });

  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || 'An unexpected error occurred');
  }

  return apiResponse;
}

async function patcher<T, A>(url: string, { arg }: { arg: A }): Promise<ApiResponse<T>> {
  const authToken = getCookie('auth_token');
  if (!authToken) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(arg),
  });

  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || 'An unexpected error occurred');
  }

  return apiResponse;
}

export function useApiGet<T>(url: string, config?: SWRConfiguration) {
  const swr = useSWR<ApiResponse<T>>(url, fetcher, config);

  return {
    ...swr,
    data: swr.data?.data,
    isLoading: swr.isLoading || swr.isValidating,
    success: swr.data?.success,
  };
}

export function useApiMutation<T, A>(
  url: string,
  config?: SWRMutationConfiguration<ApiResponse<T>, Error, string, A>,
) {
  const mutation = useSWRMutation<ApiResponse<T>, Error, string, A>(url, poster, config);

  return {
    ...mutation,
    trigger: mutation.trigger as (arg: A) => Promise<ApiResponse<T> | undefined>,
    data: mutation.data?.data,
    isSuccess: mutation.data?.success,
  };
}

export function useApiMutationWithAuth<T, A>(
  url: string,
  config?: SWRMutationConfiguration<ApiResponse<T>, Error, string, A>,
) {
  const mutation = useSWRMutation<ApiResponse<T>, Error, string, A>(url, posterWithAuth, config);

  return {
    ...mutation,
    trigger: mutation.trigger as (arg: A) => Promise<ApiResponse<T> | undefined>,
    data: mutation.data?.data,
    isSuccess: mutation.data?.success,
  };
}

export function useApiMutationWithAuthAndPatch<T, A>(
  url: string,
  config?: SWRMutationConfiguration<ApiResponse<T>, Error, string, A>,
) {
  const mutation = useSWRMutation<ApiResponse<T>, Error, string, A>(url, patcher, config);

  return {
    ...mutation,
    trigger: mutation.trigger as (arg: A) => Promise<ApiResponse<T> | undefined>,
    data: mutation.data?.data,
    isSuccess: mutation.data?.success,
  };
}
