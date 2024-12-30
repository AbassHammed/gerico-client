import { ICompanyInfo, IUser } from '@/types';

/* eslint-disable quotes */
export const INTERVAL_DISPLAYS = [
  {
    display: 'Les 30 derniers jours',
    value: '30d',
  },
  {
    display: 'Les 3 derniers mois',
    value: '90d',
  },
  {
    display: "Depuis le début de l'année",
    value: 'ytd',
  },
  {
    display: 'Les 12 derniers mois',
    value: '1y',
  },
  {
    display: 'Tout le temps',
    value: 'all',
  },
];

export const INTERVAL_DATA: Record<
  string,
  {
    startDate: Date;
    granularity: 'minute' | 'hour' | 'day' | 'month';
  }
> = {
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

export async function getPdfBuffer(data: {
  totals: any;
  payslip: any;
  user: IUser;
  company: ICompanyInfo;
  payslipData: any;
  grossSalary: number;
}): Promise<Blob> {
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate PDF');
  }

  return await response.blob();
}
