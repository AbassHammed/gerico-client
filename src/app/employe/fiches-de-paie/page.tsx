/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Suspense } from 'react';

import { Metadata } from 'next';

import UserPayslipList from '@/components/interfaces/Payslip/UserPayslipList';
import { LoadingV2 } from '@/components/ui';

export const metadata: Metadata = {
  title: {
    default: 'Fiches de paie',
    template: '%s | Gerico',
  },
};

export default function UserPayslipPage() {
  return (
    <Suspense fallback={<LoadingV2 />}>
      <UserPayslipList />
    </Suspense>
  );
}
