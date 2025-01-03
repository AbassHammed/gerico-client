/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React from 'react';

import { ScaffoldContainer, ScaffoldDivider, ScaffoldHeader, ScaffoldTitle } from '@/components/ui';
import { useCompanyInfo } from '@/hooks/company-mutations';

import UsersTable from './UsersTable';

const Users = () => {
  const { companyInfo } = useCompanyInfo();

  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">
            Les employés de {companyInfo?.name ?? 'votre entreprise'}
          </ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />
      <UsersTable />
    </React.Fragment>
  );
};

export default Users;
