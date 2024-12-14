import { IPayslip } from '@/types';
import { isAfter, isBefore, isWithinInterval } from 'date-fns';

export const INTERVAL_DISPLAYS = [
  {
    display: 'Last 24 hours',
    value: '24h',
    shortcut: 'd',
  },
  {
    display: 'Last 7 days',
    value: '7d',
    shortcut: 'w',
  },
  {
    display: 'Last 30 days',
    value: '30d',
    shortcut: 'm',
  },
  {
    display: 'Last 3 months',
    value: '90d',
    shortcut: 't',
  },
  {
    display: 'Year to Date',
    value: 'ytd',
    shortcut: 'y',
  },
  {
    display: 'Last 12 months',
    value: '1y',
    shortcut: 'l',
  },
  {
    display: 'All Time',
    value: 'all',
    shortcut: 'a',
  },
];

export const INTERVAL_DATA: Record<
  string,
  {
    startDate: Date;
    granularity: 'minute' | 'hour' | 'day' | 'month';
  }
> = {
  '24h': {
    startDate: new Date(Date.now() - 86400000),
    granularity: 'hour',
  },
  '7d': {
    startDate: new Date(Date.now() - 604800000),
    granularity: 'day',
  },
  '30d': {
    startDate: new Date(Date.now() - 2592000000),
    granularity: 'day',
  },
  '90d': {
    startDate: new Date(Date.now() - 7776000000),
    granularity: 'day',
  },
  ytd: {
    startDate: new Date(new Date().getFullYear(), 0, 1),
    granularity: 'month',
  },
  '1y': {
    startDate: new Date(Date.now() - 31556952000),
    granularity: 'month',
  },
  all: {
    startDate: new Date(2021, 5, 1),
    granularity: 'month',
  },
};

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
