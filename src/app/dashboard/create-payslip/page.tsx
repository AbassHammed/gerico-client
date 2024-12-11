'use client';

import React, { Suspense } from 'react';

import PayslipForm from '@/components/interfaces/Payslip/PayslipForm';
import {
  LoadingV2,
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';

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
