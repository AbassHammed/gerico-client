/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IPayslip } from '@/types';
import { isAfter, isBefore, isWithinInterval } from 'date-fns';

import { INTERVAL_DATA } from '../utils';

export function filterPayslips(
  payslips: IPayslip[],
  start: Date | undefined,
  end: Date | undefined,
  interval: string | undefined,
): IPayslip[] {
  if (!start && !end && !interval) {
    return payslips;
  }

  return payslips.filter(payslip => {
    const payDate = new Date(payslip.pay_date);

    if (interval && INTERVAL_DATA[interval]) {
      const { startDate } = INTERVAL_DATA[interval];
      return isAfter(payDate, startDate) && isBefore(payDate, new Date());
    }

    if (start && end) {
      return isWithinInterval(payDate, { start, end });
    }

    if (start) {
      return isAfter(payDate, start);
    }

    if (end) {
      return isBefore(payDate, end);
    }

    return true;
  });
}
