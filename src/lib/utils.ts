import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildPathWithParams = (pathname: string) => {
  const searchParams = new URLSearchParams(location.search);
  return `${pathname}?${searchParams.toString()}`;
};

export const getReturnToPath = (fallback = '/projects') => {
  const searchParams = new URLSearchParams(location.search);

  let returnTo = searchParams.get('returnTo') ?? fallback;

  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    returnTo = returnTo.replace(process.env.NEXT_PUBLIC_BASE_PATH, '');
  }

  searchParams.delete('returnTo');

  const remainingSearchParams = searchParams.toString();

  let validReturnTo;

  // only allow returning to internal pages. e.g. /projects
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
