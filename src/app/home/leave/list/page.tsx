import React from 'react';

import UserLeaveTable from '@/components/interfaces/LeaveRequest/UserLeaveTable';
import { FormHeader, ScaffoldContainerLegacy } from '@/components/ui';

const page: React.FC = () => (
  <ScaffoldContainerLegacy className="gap-0">
    <div className="flex items-center justify-between">
      <FormHeader title="Leave Requests" description="View all your leave requests here." />
    </div>
    <UserLeaveTable />
  </ScaffoldContainerLegacy>
);
export default page;
