'use client';

import { getCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useUser';

async function resendWelcomeEmail(url: string) {
  try {
    const authToken = getCookie('auth_token');

    if (!authToken) {
      throw new Error('User is not authenticated');
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    const { message } = (await res.json()) as { message: string };
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const useResendWelcomeEmail = (userId: string) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_URL}/users/resend-welcome-email/${userId}`,
    resendWelcomeEmail,
  );

  const resendEmail = async () => {
    try {
      const res = await trigger();
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { resendEmail, loading: isMutating };
};

async function archiveUser(url: string) {
  try {
    const authToken = getCookie('auth_token');

    if (!authToken) {
      throw new Error('User is not authenticated');
    }

    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    const { message } = (await res.json()) as { message: string };
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const useArchiveUser = (userId: string) => {
  const { trigger, isMutating } = useSWRMutation(`${API_URL}/users/archive/${userId}`, archiveUser);

  const archive = async () => {
    try {
      const res = await trigger();
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { archive, loading: isMutating };
};
