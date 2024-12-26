import { Suspense } from 'react';

import { Metadata } from 'next';

import DashboardPayslipList from '@/components/interfaces/Payslip/AdminPayslipList';
import {
  LoadingV2,
  ScaffoldContainer,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Fiches de paie',
};

const DashboardPayslipPage = () => (
  <Suspense fallback={<LoadingV2 />}>
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer>
        <ScaffoldTitle className="pb-3">Fiches de paie</ScaffoldTitle>
      </ScaffoldContainer>
    </ScaffoldHeader>

    <ScaffoldDivider />
    <DashboardPayslipList />
  </Suspense>
);

export default DashboardPayslipPage;
