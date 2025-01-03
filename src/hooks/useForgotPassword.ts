/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { setCookie } from 'cookies-next';

import { useApiMutation } from './useApi';

interface ForgotPasswordResponse {
  uid: string;
  sent: boolean;
}

export function useForgotPassword() {
  const {
    trigger,
    isMutating: loading,
    isSuccess,
  } = useApiMutation<ForgotPasswordResponse, { email: string }>(
    '/users/forgot-password',
    undefined,
    'POST',
  );

  const sendMail = async (inputs: { email: string }) => {
    try {
      const res = await trigger(inputs);
      setCookie('t_uid', res?.data?.uid);
      return res?.data?.sent;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { sendMail, loading, isSuccess };
}
