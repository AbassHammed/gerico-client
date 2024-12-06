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
