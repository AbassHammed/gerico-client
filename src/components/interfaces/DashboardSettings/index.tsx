/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React from 'react';

import {
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
  ShimmeringLoader,
} from '@/components/ui';
import { useCompanyInfo } from '@/hooks/company-mutations';

import AddressSettings from './AddressSettings';
import GeneralSettings from './GeneralSettings';

const Settings = () => {
  const { companyInfo, loading } = useCompanyInfo();

  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">
            {loading && !companyInfo ? <ShimmeringLoader /> : `Paramètres de ${companyInfo?.name}`}
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
