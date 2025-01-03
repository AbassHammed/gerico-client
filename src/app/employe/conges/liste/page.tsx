/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import UserLeaveTable from '@/components/interfaces/LeaveRequest/UserLeaveTable';
import { FormHeader, ScaffoldContainerLegacy } from '@/components/ui';

const page: React.FC = () => (
  <ScaffoldContainerLegacy className="gap-0">
    <div className="flex items-center justify-between">
      <FormHeader
        title="Liste de congé"
        description="Consultez l'ensemble de vos demandes de congé ici"
      />
    </div>
    <UserLeaveTable />
  </ScaffoldContainerLegacy>
);
export default page;
