/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React, { Suspense } from 'react';

import type { Metadata } from 'next';

import PayslipForm from '@/components/interfaces/Payslip/PayslipForm';
import {
  LoadingV2,
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Nouvelle fiche de paie',
};

const CreatePayslipPage = () => (
  <React.Fragment>
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Editer une nouvelle fiche de paie</ScaffoldTitle>
      </ScaffoldContainer>
    </ScaffoldHeader>

    <ScaffoldDivider />
    <ScaffoldContainerLegacy>
      <Suspense fallback={<LoadingV2 />}>
        <PayslipForm />
      </Suspense>
    </ScaffoldContainerLegacy>
  </React.Fragment>
);

export default CreatePayslipPage;
