import { ISSThreshold } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createThresholdMap(thresholds: ISSThreshold[]) {
  return thresholds.reduce(
    (acc, threshold) => {
      const key = threshold.treshold_name.toLowerCase().replace(/\s+/g, '_');
      acc[key] = [threshold.min_value, threshold.max_value];
      return acc;
    },
    {} as Record<string, [number, number]>,
  );
}

export function createMap<T, U>(
  arr: T[],
  keyCallback: (item: T) => string,
  valueCallback: (item: T) => U,
) {
  return arr.reduce(
    (acc, item) => {
      acc[keyCallback(item)] = valueCallback(item);
      return acc;
    },
    {} as Record<string, U>,
  );
}

export const buildPathWithParams = (pathname: string) => {
  const searchParams = new URLSearchParams(location.search);
  return `${pathname}?${searchParams.toString()}`;
};

export const getReturnToPath = (fallback = '/home') => {
  const searchParams = new URLSearchParams(location.search);

  let returnTo = searchParams.get('returnTo') ?? fallback;

  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    returnTo = returnTo.replace(process.env.NEXT_PUBLIC_BASE_PATH, '');
  }

  searchParams.delete('returnTo');

  const remainingSearchParams = searchParams.toString();

  let validReturnTo;

  try {
    // if returnTo is a relative path, this will throw an error
    new URL(returnTo);
    // if no error, returnTo is a valid URL and NOT an internal page
    validReturnTo = fallback;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // check returnTo doesn't try trick the browser to redirect
    // don't try sanitize, it is a losing battle. Go to fallback
    // disallow anything that starts with /non-word-char+/ or non-char+/
    const pattern = /^\/?[\W]+\//;
    validReturnTo = pattern.test(returnTo) ? fallback : returnTo;
  }

  return validReturnTo + (remainingSearchParams ? `?${remainingSearchParams}` : '');
};

/**
 * Converts string to KebabCase
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string): string =>
  string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .trim();
