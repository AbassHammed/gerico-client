/* eslint-disable quotes */
import { getSignedURL } from '@/app/actions';
import { FILE_TYPE } from '@/lib/constants';
import { computeSHA256 } from '@/lib/utils';
import { ICompanyInfo, IDeduction, IPayslip, ISSThreshold, IUser } from '@/types';
import { pdf } from '@react-pdf/renderer';
import { isAfter, isBefore, isWithinInterval } from 'date-fns';

import { PaySlipItem } from '../PayslipPDF/interface';
import PaySlipPDF from '../PayslipPDF/PayslipPDF';

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

const deductionCalculationMethods: {
  [key: string]: (grossSalary: number) => number;
} = {
  'CSG non imposable': (grossSalary: number) => grossSalary * 0.9825,
  'CSG/CRDS imposable': (grossSalary: number) => grossSalary * 0.9825,
};

function getAssiette(grossSalary: number, threshold: ISSThreshold): number {
  if (threshold.is_ceiling) {
    return Math.min(grossSalary, threshold.max_value);
  } else {
    const amountAboveMin = grossSalary - threshold.min_value;
    if (amountAboveMin < 0) {
      return 0;
    } else {
      return Math.min(amountAboveMin, threshold.max_value - threshold.min_value);
    }
  }
}

function generatePaySlipData(
  grossSalary: number,
  deductions: IDeduction[],
  socialSecurityThresholds: ISSThreshold[],
): PaySlipItem[] {
  const thresholdMap = new Map<string, ISSThreshold>();
  socialSecurityThresholds.forEach(threshold =>
    thresholdMap.set(threshold.threshold_id, threshold),
  );

  return deductions.map(deduction => {
    let assiette: number;
    let salarialAmount: number;

    // Determine assiette based on threshold_id
    if (deduction.threshold_id === '0') {
      assiette = grossSalary;
    } else {
      const threshold = thresholdMap.get(deduction.threshold_id);
      if (threshold) {
        assiette = getAssiette(grossSalary, threshold);
      } else {
        // Handle missing threshold
        assiette = grossSalary;
      }
    }

    // Apply specific calculation rules if defined
    if (deductionCalculationMethods[deduction.deduction_name]) {
      assiette = deductionCalculationMethods[deduction.deduction_name](assiette);

      salarialAmount = assiette * deduction.part_salarial;
    } else {
      salarialAmount = assiette * deduction.part_salarial;
    }

    const patronalAmount = assiette * deduction.part_patronal;

    return {
      isCotisationTitle: false,
      cotisation: deduction.deduction_name,
      assiette: assiette.toFixed(2),
      partSalariale: {
        percentage: deduction.part_salarial,
        amount: salarialAmount.toFixed(2),
      },
      partPatronale: {
        percentage: deduction.part_patronal,
        amount: patronalAmount.toFixed(2),
      },
    };
  });
}

function calculateTotals(data: PaySlipItem[]): {
  totalSalarial: string;
  totalPatronal: string;
} {
  const totalSalarial = data
    .reduce((total, item) => total + (Number(item.partSalariale?.amount) || 0), 0)
    .toFixed(2);

  const totalPatronal = data
    .reduce((total, item) => total + (Number(item.partPatronale?.amount) || 0), 0)
    .toFixed(2);

  return {
    totalSalarial,
    totalPatronal,
  };
}

function calculateGrossSalary(
  total_hours_worked: {
    worked_hours: number;
    overtime: number;
    week: number;
  }[],
  hourlyRate: number,
  overtimeMultipliers: number[] = [1.25, 1.5],
): number {
  const regularPay = 151.67 * hourlyRate;
  let overtimePay = 0;
  for (const week of total_hours_worked) {
    if (week.overtime > 0) {
      const firstOvertime = Math.min(week.overtime, 8) * hourlyRate * overtimeMultipliers[0];
      const additionalOvertime =
        Math.max(week.overtime - 8, 0) * hourlyRate * overtimeMultipliers[1];
      overtimePay += firstOvertime + additionalOvertime;
    }
  }
  const grossSalary = regularPay + overtimePay;
  return parseFloat(grossSalary.toFixed(2));
}

interface IGeneratePayslipParams {
  thresholds: ISSThreshold[];
  deductions: IDeduction[];
  companyInfo: ICompanyInfo;
  seletedUser: IUser;
  total_hours_worked: {
    worked_hours: number;
    overtime: number;
    week: number;
  }[];
  payslip: {
    start_period: string;
    end_period: string;
    pay_date: string;
  };
  hourlyRate: number;
}

const handlePayslipGeneration = async (
  params: IGeneratePayslipParams,
): Promise<{
  blob: Blob;
  grossSalary: number;
  netSalary: number;
}> => {
  const grossSalary = calculateGrossSalary(params.total_hours_worked, params.hourlyRate);
  const paySlipData = generatePaySlipData(grossSalary, params.deductions, params.thresholds);
  const totals = calculateTotals(paySlipData);

  const blob = await pdf(
    <PaySlipPDF
      totals={totals}
      paySlip={params.payslip}
      user={params.seletedUser}
      company={params.companyInfo}
      payslipData={paySlipData}
      grossSalary={grossSalary}
    />,
  ).toBlob();

  const returnData = {
    blob,
    grossSalary,
    netSalary: grossSalary - Number(totals.totalSalarial),
  };

  return returnData;
};

export const handleFileUpload = async (params: IGeneratePayslipParams) => {
  const { blob, grossSalary, netSalary } = await handlePayslipGeneration(params);
  const signedURLResult = await getSignedURL({
    fileSize: blob.size,
    fileType: FILE_TYPE,
    checksum: await computeSHA256(blob),
  });
  if (signedURLResult.failure !== undefined) {
    throw new Error(signedURLResult.failure);
  }
  const { signedUrl, fileUrl } = signedURLResult.success;
  await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': FILE_TYPE,
    },
    body: blob,
  });

  return { fileUrl, grossSalary, netSalary };
};
