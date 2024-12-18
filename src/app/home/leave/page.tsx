'use client';

import React, { useMemo, useState } from 'react';

import {
  Input,
  ScaffoldContainer,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';
import LeavePicker from '@/components/ui/date-picker/leave-picker';
import { formatDate } from '@/components/ui/date-picker/shared';
import { DateRange } from '@/components/ui/date-picker/types';
import { fr } from 'date-fns/locale';

const CreatePayslipPage = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const displayRange = useMemo(() => {
    if (!range) {
      return '';
    }

    return `${range.from ? formatDate(range.from, fr) : ''} - ${
      range.to ? formatDate(range.to, fr) : ''
    }`;
  }, [range]);

  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer id="billing-page-top">
          <ScaffoldTitle className="pb-3">Editer une nouvelle fiche de paie</ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />
      <Input label="Période" value={displayRange} disabled />
      <LeavePicker value={range} onChange={setRange} />
    </React.Fragment>
  );
};

export default CreatePayslipPage;
