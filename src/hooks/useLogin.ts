'use client';

import { ILoginInputs, IUser } from '@/types';
import { setCookie } from 'cookies-next';

import { useApiMutation } from './useApi';

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

interface LoginResponse {
  token: string;
  user: IUser | null;
  code: string | null;
}

export default function useLogin() {
  const {
    trigger,
    isMutating: loading,
    isSuccess,
  } = useApiMutation<LoginResponse, ILoginInputs & { browser: string; os: string }>('/users/login');

  const login = async (inputs: ILoginInputs) => {
    try {
      const newInput = { ...inputs, ...parseUserAgent(window.navigator.userAgent) };
      const res = await trigger(newInput);
      if (res?.data?.token) {
        setCookie('auth_token', res?.data?.token);
      }
      return { code: res?.data?.code || null, user: res?.data?.user || null };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { login, loading, isSuccess };
}
