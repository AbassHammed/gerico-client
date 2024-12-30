import type { ReactNode } from 'react';

export type ILoginInputs = {
  email: string;
  password: string;
};

export type ISiteConfig = {
  url: string;
  name: string;
  description: string;
  ogImage: string;
  authors: {
    name: string;
    url: string;
  }[];
  creator: string;
};

export type IChangePasswordInput = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordType = {
  uid: string;
  reset_code: string;
  password: string;
  confirm_password: string;
};

export interface IIssueInput {
  type: string;
  description: string;
  priority: string;
  subject: string;
}

export interface IIssue extends IIssueInput {
  issue_id: string;
  solved: boolean;
  issue_date: string;
}

export interface IRoute {
  key: string;
  label: string;
  icon: ReactNode;
  link?: string;
  disabled?: boolean;
  linkComponent?: ReactNode;
}

export interface Enum {
  label: string;
  value: string;
  icon?: string;
}

export interface IUser {
  uid: string;
  civility: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  hashed_password: string;
  is_admin: boolean;
  job_title: string;
  job_department: string;
  remaining_leave_balance: number;
  hire_date: string;
  created_at: string;
  updated_at: string;
  departure_date?: string;
  is_archived: boolean;
  reset_code?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
  date_of_birth: string;
  social_security_number: string;
  marital_status: string;
  contract_type: string;
  dependants: number;
  company_id: string;
}

export interface ICompanyInfo {
  siret: string;
  code_ape: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
  collective_convention: string;
}

export interface ISSThreshold {
  threshold_id: string;
  threshold_name: string;
  min_value: number;
  max_value: number;
  is_ceiling: boolean;
}

export interface IDeduction {
  deduction_id: string;
  deduction_type: string;
  deduction_name: string;
  part_salarial: number;
  part_patronal: number;
  threshold_id: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface IPayslip {
  pid: string;
  uid: string;
  gross_salary: number;
  net_salary: number;
  start_period: Date;
  end_period: Date;
  pay_date: Date;
  total_hours_worked: string;
  hourly_rate: number;
  path_to_pdf: string;
}

export type ICreatePayslip = Omit<IPayslip, 'pid'>;

export interface ILeaveRequest {
  leave_request_id: string;
  request_status: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  reason?: string;
  leave_type: string;
  uid: string;
}

export type ILeaveRequestInput = Omit<ILeaveRequest, 'leave_request_id' | 'created_at'>;

export interface IGeneratePayslipParams {
  thresholds: ISSThreshold[];
  deductions: IDeduction[];
  companyInfo: ICompanyInfo;
  selectedUser: IUser;
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

export interface IPaySlipRow {
  isCotisationTitle: boolean;
  cotisation: string;
  assiette: string | number;
  partSalariale: Part;
  partPatronale: Part;
}
