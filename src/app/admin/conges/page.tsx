import { Suspense } from 'react';

import AdminLeaveTable from '@/components/interfaces/LeaveRequest/AdminLeaveTable';
import { LoadingV2 } from '@/components/ui';

export default function DashboardPayslipPage() {
  return (
    <Suspense fallback={<LoadingV2 />}>
      <AdminLeaveTable />
    </Suspense>
  );
}
