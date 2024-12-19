'use client';

import { useMemo, useState } from 'react';

import {
  FormHeader,
  Input,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
} from '@/components/ui';
import LeavePicker from '@/components/ui/date-picker/leave-picker';
import { formatDate } from '@/components/ui/date-picker/shared';
import { DateRange } from '@/components/ui/date-picker/types';
import { fr } from 'date-fns/locale';

const LeaveRequest = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const displayRange = useMemo(() => {
    if (!range) {
      return '';
    }

    return `${range.from ? formatDate(range.from, fr, true) : ''} - ${
      range.to ? formatDate(range.to, fr, true) : ''
    }`;
  }, [range]);

  return (
    <ScaffoldContainerLegacy className="gap-0">
      <div className="flex items-center justify-between">
        <FormHeader title="Fiches de paie" description="Retrouvez ici toutes vos fiches de paie." />
      </div>
      <ScaffoldFilterAndContent>
        <ScaffoldActionsContainer className="justify-stretch">
          <Input
            label="Période"
            className="w-full"
            value={displayRange}
            disabled
            placeholder="Commencer par choisir une date ..."
          />
        </ScaffoldActionsContainer>
        <ScaffoldSectionContent className="w-full">
          <LeavePicker value={range} onChange={setRange} />
        </ScaffoldSectionContent>
      </ScaffoldFilterAndContent>
    </ScaffoldContainerLegacy>
  );
};

export default LeaveRequest;
