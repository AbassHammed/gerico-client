'use client';

import React from 'react';

import { ScaffoldContainer, ScaffoldDivider, ScaffoldHeader, ScaffoldTitle } from '@/components/ui';
import { useCompanyInfo } from '@/hooks/company-mutations';
import { useGetUser } from '@/hooks/getUser';

import UsersTable from './UsersTable';

const Users = () => {
  const { user } = useGetUser();
  const { companyInfo } = useCompanyInfo(user?.company_id ?? '');

  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">
            {companyInfo?.name ?? 'Organization'} Employees
          </ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />
      <UsersTable />
    </React.Fragment>
  );
};

export default Users;
