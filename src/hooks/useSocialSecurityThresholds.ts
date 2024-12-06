'use client';

import { useMemo } from 'react';

import { createThresholdMap } from '@/lib/utils';

import { useGetThresholds } from './useHooks';

export function useSocialSecurityThresholds() {
  const { thresholds, isLoading, error } = useGetThresholds();

  const {
    socialSecurityThresholdMap,
    social_security_ceiling,
    social_security_ceiling_min,
    social_security_ceiling_max,
    tranche_A,
    tranche_A_min,
    tranche_A_max,
    tranche_B,
    tranche_B_min,
    tranche_B_max,
    tranche2,
    tranche2_min,
    tranche2_max,
    trancheA_B_C,
    trancheA_B_C_min,
    trancheA_B_C_max,
    trancheA_B,
    trancheA_B_min,
    trancheA_B_max,
  } = useMemo(() => {
    if (!thresholds) {
      return {} as any;
    }

    const map = createThresholdMap(thresholds);

    const getThreshold = (name: string) => map[name] || [0, 0];
    const getMin = (threshold: [number, number]) => threshold[0];
    const getMax = (threshold: [number, number]) => threshold[1];

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
    socialSecurityThresholdMap,
    social_security_ceiling,
    social_security_ceiling_min,
    social_security_ceiling_max,
    tranche_A,
    tranche_A_min,
    tranche_A_max,
    tranche_B,
    tranche_B_min,
    tranche_B_max,
    tranche2,
    tranche2_min,
    tranche2_max,
    trancheA_B_C,
    trancheA_B_C_min,
    trancheA_B_C_max,
    trancheA_B,
    trancheA_B_min,
    trancheA_B_max,
    CSG_CRDS_percentage,
    isLoading,
    error,
  };
}
