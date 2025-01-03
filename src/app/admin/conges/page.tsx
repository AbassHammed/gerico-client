/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Suspense } from 'react';

import { Metadata } from 'next';

import AdminLeaveTable from '@/components/interfaces/LeaveRequest/AdminLeaveTable';
import {
  LoadingV2,
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Demandes de congés',
};

export default function DashboardPayslipPage() {
  return (
    <Suspense fallback={<LoadingV2 />}>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">Les demandes de congés</ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />
      <ScaffoldContainerLegacy>
        <AdminLeaveTable />
      </ScaffoldContainerLegacy>
    </Suspense>
  );
}
