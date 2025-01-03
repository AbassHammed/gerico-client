/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { getCookie } from 'cookies-next';

import { useApiMutation } from './useApi';

export function useResendCode() {
  const { trigger, isMutating: loading } = useApiMutation<{ sent: boolean }, { uid: string }>(
    '/users/resend-password-code',
    undefined,
    'POST',
  );

  const sendResetCode = async () => {
    try {
      const uid = getCookie('t_uid');
      if (!uid) {
        throw new Error(
          'Impossible de récupérer votre identifiant utilisateur. Veuillez réessayer plus tard.',
        );
      }
      const res = await trigger({ uid });
      return res?.data?.sent;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { sendResetCode, loading };
}
