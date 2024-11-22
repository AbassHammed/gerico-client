/* eslint-disable quotes */
'use client';

import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';
import { getCookie } from 'cookies-next';
import useSWRMutation from 'swr/mutation';

import { API_URL } from './useUser';

async function createNewUser(
  url: string,
  { arg }: { arg: UserSchemaType & { company_id: string } },
) {
  try {
    const auth_token = getCookie('auth_token');
    if (!auth_token) {
      throw new Error("Looks like you're not connected");
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { message } = await response.json();
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useCreateUser() {
  const { trigger, isMutating: loading } = useSWRMutation(`${API_URL}/users`, createNewUser);

  const createUser = async (inputs: UserSchemaType & { company_id: string }) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { createUser, loading };
}

async function updateUser(url: string, { arg }: { arg: UserSchemaType & { company_id: string } }) {
  try {
    const auth_token = getCookie('auth_token');
    if (!auth_token) {
      throw new Error("Looks like you're not connected");
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { message } = await response.json();
    return message;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useUpdateUser(userId: string) {
  const { trigger, isMutating: loading } = useSWRMutation(`${API_URL}/users/${userId}`, updateUser);

  const update = async (inputs: UserSchemaType & { company_id: string }) => {
    try {
      const res = await trigger(inputs);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { update, loading };
}
