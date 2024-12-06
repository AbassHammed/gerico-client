'use client';

import { useMemo } from 'react';

import { ThresholdValue } from '@/components/interfaces/PayslipPDF/interface';
import { createThresholdMap } from '@/lib/utils';

import { useGetThresholds } from '../useHooks';

export function useSocialSecurityThresholds() {
  const { thresholds, isLoading, error } = useGetThresholds();

  const result = useMemo(() => {
    if (!thresholds) {
      return {
        socialSecurityThresholdMap: {},
        social_security_ceiling: [0, 0],
        social_security_ceiling_min: 0,
        social_security_ceiling_max: 0,
        tranche_A: [0, 0],
        tranche_A_min: 0,
        tranche_A_max: 0,
        tranche_B: [0, 0],
        tranche_B_min: 0,
        tranche_B_max: 0,
        tranche2: [0, 0],
        tranche2_min: 0,
        tranche2_max: 0,
        trancheA_B_C: [0, 0],
        trancheA_B_C_min: 0,
        trancheA_B_C_max: 0,
        trancheA_B: [0, 0],
        trancheA_B_min: 0,
        trancheA_B_max: 0,
      };
    }

    const map = createThresholdMap(thresholds);

    const getThreshold = (name: string): ThresholdValue => map[name] || [0, 0];
    const getMin = (threshold: ThresholdValue) => threshold[0];
    const getMax = (threshold: ThresholdValue) => threshold[1];

    const social_security_ceiling = getThreshold('plafond_sécurité_sociale');
    const tranche_A = getThreshold('tranche_a');
    const tranche_B = getThreshold('tranche_b');
    const tranche2 = getThreshold('tranche_2');
    const trancheA_B_C = getThreshold('tranche_a+b+c');
    const trancheA_B = getThreshold('tranche_a+b');

    return {
      socialSecurityThresholdMap: map,
      social_security_ceiling,
      social_security_ceiling_min: getMin(social_security_ceiling),
      social_security_ceiling_max: getMax(social_security_ceiling),
      tranche_A,
      tranche_A_min: getMin(tranche_A),
      tranche_A_max: getMax(tranche_A),
      tranche_B,
      tranche_B_min: getMin(tranche_B),
      tranche_B_max: getMax(tranche_B),
      tranche2,
      tranche2_min: getMin(tranche2),
      tranche2_max: getMax(tranche2),
      trancheA_B_C,
      trancheA_B_C_min: getMin(trancheA_B_C),
      trancheA_B_C_max: getMax(trancheA_B_C),
      trancheA_B,
      trancheA_B_min: getMin(trancheA_B),
      trancheA_B_max: getMax(trancheA_B),
    };
  }, [thresholds]);

  const CSG_CRDS_percentage = 0.9825;

  return {
    ...result,
    CSG_CRDS_percentage,
    isLoading,
    error: error || null,
  };
}