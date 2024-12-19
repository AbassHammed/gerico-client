import React from 'react';

import LeaveRequest from '@/components/interfaces/LeaveRequest/LeaveRequest';
import { ScaffoldContainer, ScaffoldDivider, ScaffoldHeader, ScaffoldTitle } from '@/components/ui';

const CreatePayslipPage = () => (
  <React.Fragment>
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Editer une nouvelle fiche de paie</ScaffoldTitle>
      </ScaffoldContainer>
    </ScaffoldHeader>

    <ScaffoldDivider />
    <LeaveRequest />
  </React.Fragment>
);

export default CreatePayslipPage;
