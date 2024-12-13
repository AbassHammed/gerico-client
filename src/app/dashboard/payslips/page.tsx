import { Suspense } from 'react';

import DashboardPayslipList from '@/components/interfaces/Payslip/DashboardPayslipList';
import { LoadingV2 } from '@/components/ui';

export default function DashboardPayslipPage() {
  return (
    <Suspense fallback={<LoadingV2 />}>
      <DashboardPayslipList />
    </Suspense>
  );
}
