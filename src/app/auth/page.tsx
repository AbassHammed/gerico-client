/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingV2 } from '@/components/ui';
import { PagesRoutes } from '@/lib/constants';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push(PagesRoutes.Auth_SignIn);
  }, []);

  return <LoadingV2 />;
}
