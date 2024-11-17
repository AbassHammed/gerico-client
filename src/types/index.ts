import { ReactNode } from 'react';

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
  type: 'auth' | 'leave' | 'payslip' | 'other';
  priority: 'high' | 'average' | 'normal';
  subject: string;
  description: string;
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
  convention_collective: string;
}
