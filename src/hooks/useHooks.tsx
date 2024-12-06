'use client';

import React from 'react';

import { IDeduction, ISSThreshold } from '@/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

import { API_URL } from './useUser';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}

async function fetchUser(url: string) {
  const token = getCookie('auth_token');
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  return res.json();
}

export function useGetThresholds() {
  const { data, error, isValidating, isLoading, mutate } = useSWR<{
    thresholds: ISSThreshold[];
  }>(`${API_URL}/common/thresholds`, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    thresholds: data?.thresholds,
    isLoading: isValidating || isLoading,
    error,
    mutate,
  };
}

export function useGetDeductions() {
  const { data, error, isValidating, isLoading, mutate } = useSWR<{
    deductions: IDeduction[];
  }>(`${API_URL}/common/deductions`, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    deductions: data?.deductions,
    isLoading: isValidating || isLoading,
    error,
    mutate,
  };
}
