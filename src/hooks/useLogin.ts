'use client';

import { ILoginInputs } from '@/types';
import useSWRMutation from 'swr/mutation';

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let os = 'Unknown';

  if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
  }

  if (ua.indexOf('Win') > -1) {
    os = 'Windows';
  } else if (ua.indexOf('Mac') > -1) {
    os = 'Mac OS';
  } else if (ua.indexOf('X11') > -1 || ua.indexOf('Linux') > -1) {
    os = 'Linux';
  } else if (ua.indexOf('Android') > -1) {
    os = 'Android';
  } else if (ua.indexOf('like Mac') > -1) {
    os = 'iOS';
  }

  return { browser, os };
}

async function sendRequest(
  url: string,
  { arg }: { arg: ILoginInputs & { browser: string; os: string } },
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error);
    }

    const { token, code, user } = await response.json();
    sessionStorage.setItem('token', token);

    // there are only three case where a `code` is being returned from the back
    // 1&2. when the password is incorrect or email not found in the db in which case the status code is 400 so `!response.ok` will pass and an error will be thrown
    // 3. when the user used a default password
    if (code === 'DEFAULTPASS') {
      return { code, user: null };
    }

    return { code: null, user };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default function useLogin() {
  const { trigger, isMutating: loading } = useSWRMutation(
    'http://localhost:5000/api/employee/login',
    sendRequest,
  );

  const login = async (inputs: ILoginInputs) => {
    try {
      const newInput = { ...inputs, ...parseUserAgent(window.navigator.userAgent) };
      const res = await trigger(newInput);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { login, loading };
}
