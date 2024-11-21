'use client';

import React from 'react';

import {
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';
import { useCompanyInfo } from '@/hooks/company-mutations';
import { useUser } from '@/hooks/useUser';

import AddressSettings from './AddressSettings';
import GeneralSettings from './GeneralSettings';

const Settings = () => {
  const { user } = useUser();
  const { companyInfo } = useCompanyInfo(user?.company_id ?? '');

  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">
            {companyInfo?.name ?? 'Organization'} settings
          </ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />

      <ScaffoldContainerLegacy>
        <GeneralSettings />
        <AddressSettings />
      </ScaffoldContainerLegacy>
    </React.Fragment>
  );
};

export default Settings;
