'use client';

import React from 'react';

import { ScaffoldContainer, ScaffoldDivider, ScaffoldHeader, ScaffoldTitle } from '@/components/ui';

const CreatePayslipPage = () => (
  <React.Fragment>
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Editer une nouvelle fiche de paie</ScaffoldTitle>
      </ScaffoldContainer>
    </ScaffoldHeader>

    <ScaffoldDivider />
  </React.Fragment>
);

export default CreatePayslipPage;
