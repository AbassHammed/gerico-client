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

// https://httpwg.org/specs/rfc9110.html

// Generic request handler
async function request<T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: any;
    requiresAuth?: boolean;
  } = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, requiresAuth = true } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const authToken = getCookie('auth_token');
    if (!authToken) {
      throw new Error('User is not authenticated');
    }
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || 'An unexpected error occurred');
  }

  return apiResponse;
}

// SWR fetcher using the generic request handler
async function fetcher<T>(url: string, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
  return request(url, { requiresAuth });
}

// SWR mutation functions using the generic request handler
async function mutationHandler<T, A>(
  url: string,
  {
    arg,
    method,
    requiresAuth,
  }: { arg: A; method: 'GET' | 'POST' | 'PATCH' | 'DELETE'; requiresAuth: boolean },
): Promise<ApiResponse<T>> {
  return request(url, { method, body: arg, requiresAuth });
}

// Custom hooks
export function useApiGet<T>(url: string, config?: SWRConfiguration, requiresAuth: boolean = true) {
  const swr = useSWR<ApiResponse<T>>(url, () => fetcher(url, requiresAuth), config);

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
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'POST',
  requiresAuth: boolean = false,
) {
  const mutation = useSWRMutation<ApiResponse<T>, Error, string, A>(
    url,
    (url, { arg }) => mutationHandler(url, { arg, method, requiresAuth }),
    config,
  );

  return {
    ...mutation,
    trigger: mutation.trigger as (arg: A) => Promise<ApiResponse<T> | undefined>,
    data: mutation.data?.data,
    isSuccess: mutation.data?.success,
  };
}
