/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import {
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
} from '@/components/ui';
import { endOfDay, startOfDay, subDays } from 'date-fns';

import PayslipListHeader from '../Header';
import AdminPayslipList from './AdminPayslipList';

const AdminPaySlip = () => {
  const searchParams = useSearchParams();

  const { start, end } = useMemo(() => {
    const hasRange = searchParams?.has('start') && searchParams?.has('end');

    return {
      start: hasRange
        ? startOfDay(new Date(searchParams?.get('start') || subDays(new Date(), 1)))
        : undefined,

      end: hasRange ? endOfDay(new Date(searchParams?.get('end') || new Date())) : undefined,
    };
  }, [searchParams?.get('start'), searchParams?.get('end')]);

  // Only set interval if start and end are not provided
  const interval = start || end ? undefined : (searchParams?.get('interval') ?? 'all');

  return (
    <ScaffoldContainerLegacy>
      <ScaffoldFilterAndContent>
        <ScaffoldActionsContainer className="justify-end">
          <PayslipListHeader startDate={start} endDate={end} interval={interval} />
        </ScaffoldActionsContainer>
        <ScaffoldSectionContent className="w-full">
          <AdminPayslipList startDate={start} endDate={end} interval={interval} />
        </ScaffoldSectionContent>
      </ScaffoldFilterAndContent>
    </ScaffoldContainerLegacy>
  );
};

export default AdminPaySlip;
