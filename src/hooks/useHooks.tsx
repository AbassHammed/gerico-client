'use client';

import React from 'react';

import { IDeduction, ISSThreshold } from '@/types';

import { useApiGet } from './useApi';

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

export function useGetThresholds() {
  const { data, error, isLoading, success, mutate, isValidating } =
    useApiGet<ISSThreshold[]>(`/common/thresholds`);
  return {
    thresholds: data,
    isLoading: isValidating || isLoading,
    error,
    mutate,
    isSuccess: success,
  };
}

export function useGetDeductions() {
  const { data, error, isLoading, mutate, isValidating, success } =
    useApiGet<IDeduction[]>(`/common/deductions`);
  return {
    deductions: data,
    isLoading: isValidating || isLoading,
    error,
    mutate,
    isSuccess: success,
  };
}
