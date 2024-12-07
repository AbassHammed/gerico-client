/* eslint-disable indent */
'use client';

import { useMemo } from 'react';

import { DeductionConfig, PaySlipItem } from '@/components/interfaces/PayslipPDF/interface';
import { createMap } from '@/lib/utils';
import { IDeduction, ISSThreshold } from '@/types';

import { usePayrollCalculations } from './usePayrollCalculations';
import { useSocialSecurityThresholds } from './useSocialSecurityThresholds';

export function useCalculations(thresholds: ISSThreshold[], deductions: IDeduction[]) {
  const { socialSecurityThresholdMap, CSG_CRDS_percentage } =
    useSocialSecurityThresholds(thresholds);

  const deductionsMap = createMap(
    deductions,
    deduction => deduction.deduction_name.toLowerCase().replace(/\s+/g, '_'),
    deduction => ({
      deduction_id: deduction.deduction_id,
      deduction_name: deduction.deduction_name,
      part_salarial: deduction.part_salarial,
      part_patronal: deduction.part_patronal,
      threshold_id: deduction.threshold_id,
    }),
  );

  const {
    calculatePaySlipOnCSGCRDS,
    calculatePaySlipOnSocialSecurityTreshold,
    calculatePaySlipOnGrossSalary,
    calculatePaySlipOnTranche1,
    calculatePaySlipOnTranche2,
    calculatePaySlipOnTrancheAB,
    calculatePaySlipOnTrancheABC,
  } = usePayrollCalculations(thresholds);

  const calculateDeduction = useMemo(
    () =>
      (
        grossSalary: number,
        partSalarial: number,
        partPatronal: number,
        method: DeductionConfig['calculationMethod'],
      ): [string, string] => {
        switch (method) {
          case 'onGrossSalary':
            return calculatePaySlipOnGrossSalary(grossSalary, partSalarial, partPatronal);
          case 'onSocialSecurityTreshold':
            return calculatePaySlipOnSocialSecurityTreshold(
              grossSalary,
              partSalarial,
              partPatronal,
            );
          case 'onTranche1':
            return calculatePaySlipOnTranche1(grossSalary, partSalarial, partPatronal);
          case 'onTranche2':
            return calculatePaySlipOnTranche2(grossSalary, partSalarial, partPatronal);
          case 'onTrancheAB':
            return calculatePaySlipOnTrancheAB(grossSalary, partSalarial, partPatronal);
          case 'onTrancheABC':
            return calculatePaySlipOnTrancheABC(grossSalary, partSalarial, partPatronal);
          case 'onCSGCRDS':
            return calculatePaySlipOnCSGCRDS(grossSalary, partSalarial);
          default:
            return ['0', '0'];
        }
      },
    [],
  );

  const generatePaySlipData = useMemo(
    () =>
      (grossSalary: number, deductionsConfig: DeductionConfig[]): PaySlipItem[] =>
        deductionsConfig.map(deduction => {
          const [partSalariale, partPatronale] = calculateDeduction(
            grossSalary,
            deduction.part_salarial,
            deduction.part_patronal,
            deduction.calculationMethod,
          );

          return {
            isCotisationTitle: false,
            cotisation: deduction.deduction_name,
            assiette:
              deduction.deduction_name === 'CSG non imposable' ||
              deduction.deduction_name === 'CSG/CRDS imposable'
                ? (CSG_CRDS_percentage * grossSalary).toFixed(2)
                : grossSalary,
            partSalariale:
              deduction.applicableTo !== 'patronal'
                ? { percentage: deduction.part_salarial, amount: partSalariale }
                : { percentage: 0, amount: 0 },
            partPatronale:
              deduction.applicableTo !== 'salarial'
                ? { percentage: deduction.part_patronal, amount: partPatronale }
                : { percentage: 0, amount: 0 },
          };
        }),
    [calculateDeduction, CSG_CRDS_percentage],
  );

  const deductionsConfig: DeductionConfig[] = useMemo(
    () =>
      Object.values(deductionsMap).map(deduction => {
        const thresholdKey =
          Number(deduction.threshold_id) === 0
            ? null
            : Number(deduction.threshold_id) === 6
              ? 'SocialSecurityTreshold'
              : Object.keys(socialSecurityThresholdMap).find(key =>
                  key.includes(deduction.threshold_id.toString()),
                ) || null;

        const calculationMethod =
          deduction.deduction_name.includes('CSG') || deduction.deduction_name.includes('CRDS')
            ? 'onCSGCRDS'
            : deduction.deduction_name === 'Chômage + AGS'
              ? 'onTrancheAB'
              : Number(deduction.threshold_id) === 0
                ? 'onGrossSalary'
                : thresholdKey
                  ? `on${thresholdKey.replace(/_/g, '').replace(/tranche/g, 'Tranche')}`
                  : 'unknownThreshold';

        return {
          deduction_id: deduction.deduction_name,
          deduction_name: deduction.deduction_name,
          part_salarial: deduction.part_salarial,
          part_patronal: deduction.part_patronal,
          calculationMethod: calculationMethod as DeductionConfig['calculationMethod'],
          deduction_type: '',
          applicableTo:
            deduction.part_salarial > 0 && deduction.part_patronal > 0
              ? 'both'
              : deduction.part_salarial > 0
                ? 'salarial'
                : 'patronal',
        };
      }),
    [socialSecurityThresholdMap, deductionsMap],
  );

  return {
    generatePaySlipData,
    deductionsConfig,
  };
}
