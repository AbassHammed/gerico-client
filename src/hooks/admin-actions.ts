/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useApiMutation } from './useApi';

export const useResendWelcomeEmail = (userId: string) => {
  const { trigger, isMutating } = useApiMutation<{ sent: true }, undefined>(
    `/users/resend-welcome-email/${userId}`,
    undefined,
    'POST',
    true,
  );

  const resendEmail = async () => {
    try {
      const res = await trigger(undefined);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { resendEmail, loading: isMutating };
};

export const useArchiveUser = (userId: string) => {
  const { trigger, isMutating } = useApiMutation<{ result: true }, undefined>(
    `/users/archive/${userId}`,
    undefined,
    'PATCH',
    true,
  );

  const archive = async () => {
    try {
      const res = await trigger(undefined);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { archive, loading: isMutating };
};
