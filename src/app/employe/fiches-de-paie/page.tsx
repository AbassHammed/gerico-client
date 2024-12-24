import { Suspense } from 'react';

import UserPayslipList from '@/components/interfaces/Payslip/UserPayslipList';
import { LoadingV2 } from '@/components/ui';

export default function UserPayslipPage() {
  return (
    <Suspense fallback={<LoadingV2 />}>
      <UserPayslipList />
    </Suspense>
  );
}
