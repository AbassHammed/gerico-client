import { useMemo } from 'react';

import { PaySlip } from '@/components/interfaces/PayslipPDF/interface';
import { ISSThreshold } from '@/types';

import { useSocialSecurityThresholds } from './useSocialSecurityThresholds';

export function usePayrollCalculations(thresholds: ISSThreshold[]) {
  const {
    social_security_ceiling_min,
    tranche_A_max,
    tranche2_min,
    tranche2_max,
    trancheA_B_C_min,
    trancheA_B_C_max,
    trancheA_B_min,
    trancheA_B_max,
    CSG_CRDS_percentage,
  } = useSocialSecurityThresholds(thresholds);

  const calculations = useMemo(
    () => ({
      calculatePaySlipOnGrossSalary: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        const partSalariale = (gross_salary * part_salarial).toFixed(2);
        const partPatronale = (gross_salary * part_patronal).toFixed(2);
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnSocialSecurityTreshold: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        let partSalariale = (gross_salary * part_salarial).toFixed(2);
        let partPatronale = (gross_salary * part_patronal).toFixed(2);
        if (gross_salary > social_security_ceiling_min) {
          partSalariale = (social_security_ceiling_min * part_salarial).toFixed(2);
          partPatronale = (social_security_ceiling_min * part_patronal).toFixed(2);
        }
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnTranche1: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        let partSalariale = (gross_salary * part_salarial).toFixed(2);
        let partPatronale = (gross_salary * part_patronal).toFixed(2);
        if (gross_salary > tranche_A_max) {
          partSalariale = (tranche_A_max * part_salarial).toFixed(2);
          partPatronale = (tranche_A_max * part_patronal).toFixed(2);
        }
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnTranche2: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        let partSalariale = '0';
        let partPatronale = '0';
        if (gross_salary > tranche2_min) {
          if (gross_salary > tranche2_max) {
            partSalariale = (tranche2_max * part_salarial).toFixed(2);
            partPatronale = (tranche2_max * part_patronal).toFixed(2);
          } else {
            partSalariale = (gross_salary * part_salarial).toFixed(2);
            partPatronale = (gross_salary * part_patronal).toFixed(2);
          }
        }
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnTrancheABC: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        let partSalariale = (gross_salary * part_salarial).toFixed(2);
        let partPatronale = (gross_salary * part_patronal).toFixed(2);
        if (gross_salary > trancheA_B_C_max) {
          partSalariale = (trancheA_B_C_max * part_salarial).toFixed(2);
          partPatronale = (trancheA_B_C_max * part_patronal).toFixed(2);
        }
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnTrancheAB: (
        gross_salary: number,
        part_salarial: number,
        part_patronal: number,
      ): [string, string] => {
        let partSalariale = (gross_salary * part_salarial).toFixed(2);
        let partPatronale = (gross_salary * part_patronal).toFixed(2);
        if (gross_salary > trancheA_B_max) {
          partSalariale = (trancheA_B_max * part_salarial).toFixed(2);
          partPatronale = (trancheA_B_max * part_patronal).toFixed(2);
        }
        return [partSalariale, partPatronale];
      },

      calculatePaySlipOnCSGCRDS: (
        gross_salary: number,
        part_salarial: number,
      ): [string, string] => {
        const partSalariale = (CSG_CRDS_percentage * gross_salary * part_salarial).toFixed(2);
        const partPatronale = '0';
        return [partSalariale, partPatronale];
      },

      calculateGrossSalary: (pay_slip: PaySlip, temp_partiel: number = 100): number => {
        const adjustedHours = 151.67 * (temp_partiel / 100);
        const baseSalary = pay_slip.hourly_rate * adjustedHours;
        let totalOvertimePay = 0;
        pay_slip.total_hours_worked.forEach(week => {
          const overtime = week.overtime;
          if (overtime > 0) {
            const overtime25 = Math.min(overtime, 8) * 1.25 * pay_slip.hourly_rate;
            const overtime50 = Math.max(overtime - 8, 0) * 1.5 * pay_slip.hourly_rate;
            totalOvertimePay += overtime25 + overtime50;
          }
        });

        const grossSalary = baseSalary + totalOvertimePay;
        return parseFloat(grossSalary.toFixed(2));
      },
    }),
    [
      social_security_ceiling_min,
      tranche_A_max,
      tranche2_min,
      tranche2_max,
      trancheA_B_C_min,
      trancheA_B_C_max,
      trancheA_B_min,
      trancheA_B_max,
      CSG_CRDS_percentage,
    ],
  );

  return calculations;
}
