export interface TotalHoursWorked {
  week: number;
  worked_hours: number;
  overtime: number;
}

export interface PaySlip {
  pid: string;
  uid: string;
  gross_salary: number;
  net_salary: number;
  start_period: string;
  end_period: string;
  pay_date: string;
  total_hours_worked: TotalHoursWorked[];
  hourly_rate: number;
  path_to_pdf: string;
}

export interface DeductionConfig {
  deduction_name: string;
  deduction_type: string;
  part_salarial: number;
  part_patronal: number;
  calculationMethod:
    | 'onGrossSalary'
    | 'onSocialSecurityTreshold'
    | 'onTranche1'
    | 'onTranche2'
    | 'onTrancheAB'
    | 'onTrancheABC'
    | 'onCSGCRDS';
  applicableTo: 'salarial' | 'patronal' | 'both';
}

export interface Part {
  percentage: string | number;
  amount: string | number;
}

export type PaySlipItem = {
  isCotisationTitle: boolean;
  cotisation: string;
  assiette: string | number;
  partSalariale?: Part;
  partPatronale?: Part;
};

export interface PaySlipRow {
  isCotisationTitle: boolean;
  cotisation: string;
  assiette: string;
  partSalariale: Part;
  partPatronale: Part;
}

// Define the type for the threshold values
type ThresholdValue = [number, number];

// Define the interface for the hook's return type
export interface SocialSecurityThresholdsResult {
  socialSecurityThresholdMap: Record<string, ThresholdValue>;
  social_security_ceiling: ThresholdValue;
  social_security_ceiling_min: number;
  social_security_ceiling_max: number;
  tranche_A: ThresholdValue;
  tranche_A_min: number;
  tranche_A_max: number;
  tranche_B: ThresholdValue;
  tranche_B_min: number;
  tranche_B_max: number;
  tranche2: ThresholdValue;
  tranche2_min: number;
  tranche2_max: number;
  trancheA_B_C: ThresholdValue;
  trancheA_B_C_min: number;
  trancheA_B_C_max: number;
  trancheA_B: ThresholdValue;
  trancheA_B_min: number;
  trancheA_B_max: number;
  CSG_CRDS_percentage: number;
  isLoading: boolean;
  error: Error | null;
}
