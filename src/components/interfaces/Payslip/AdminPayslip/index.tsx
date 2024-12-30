import React, { Suspense } from 'react';

import {
  LoadingV2,
  ScaffoldContainer,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';

import AdminPaySlip from './AdminPayslip';

const Payslips = () => (
  <React.Fragment>
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Fiches de paie</ScaffoldTitle>
      </ScaffoldContainer>
    </ScaffoldHeader>

    <ScaffoldDivider />
    <Suspense fallback={<LoadingV2 />}>
      <AdminPaySlip />
    </Suspense>
  </React.Fragment>
);

export default Payslips;
