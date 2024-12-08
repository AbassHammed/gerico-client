import { ICompanyInfo, IDeduction, ISSThreshold, IUser } from '@/types';

import { PaySlip } from '../interface';

/* eslint-disable quotes */
export const deductions: IDeduction[] = [
  // ---------------- SANTÉ ----------------
  // * Maladie
  {
    deduction_id: '1',
    deduction_type: 'SANTÉ',
    deduction_name: 'Maladie',
    part_salarial: 0,
    part_patronal: 0.07,
    threshold_id: '0',
  },
  // * CSAPAH
  {
    deduction_id: '2',
    deduction_type: 'SANTÉ',
    deduction_name: 'CSAPAH',
    part_salarial: 0,
    part_patronal: 0.003,
    threshold_id: '0',
  },
  // ---------------- ACCIDENT DU TRAVAIL ----------------
  {
    deduction_id: '3',
    deduction_type: 'ACCIDENT DU TRAVAIL',
    deduction_name: 'Accidents de Travail',
    part_salarial: 0,
    part_patronal: 0.01,
    threshold_id: '0',
  },
  // ---------------- RETRAITE ----------------
  // * Vieillesse plafonnée
  {
    deduction_id: '4',
    deduction_type: 'RETRAITE',
    deduction_name: 'Vieillesse plafonnée',
    part_salarial: 0.069,
    part_patronal: 0.0855,
    threshold_id: '6',
  },
  // * Vieillesse déplafonnée
  {
    deduction_id: '5',
    deduction_type: 'RETRAITE',
    deduction_name: 'Vieillesse déplafonnée',
    part_salarial: 0.004,
    part_patronal: 0.0202,
    threshold_id: '0',
  },
  // * Complémentaire T1
  {
    deduction_id: '6',
    deduction_type: 'RETRAITE',
    deduction_name: 'Complémentaire T1',
    part_salarial: 0.0315,
    part_patronal: 0.0472,
    threshold_id: '1',
  },
  // * Complémentaire T2
  {
    deduction_id: '7',
    deduction_type: 'RETRAITE',
    deduction_name: 'Complémentaire T2',
    part_salarial: 0.0864,
    part_patronal: 0.1295,
    threshold_id: '2',
  },
  // * CEG T1
  {
    deduction_id: '8',
    deduction_type: 'RETRAITE',
    deduction_name: 'CEG T1',
    part_salarial: 0.0086,
    part_patronal: 0.0129,
    threshold_id: '1',
  },
  // * CEG T2
  {
    deduction_id: '9',
    deduction_type: 'RETRAITE',
    deduction_name: 'CEG T2',
    part_salarial: 0.0108,
    part_patronal: 0.0162,
    threshold_id: '2',
  },
  // * CET
  {
    deduction_id: '10',
    deduction_type: 'RETRAITE',
    deduction_name: 'CET',
    part_salarial: 0.0014,
    part_patronal: 0.0021,
    threshold_id: '5',
  },
  // ---------------- FAMILLE ----------------
  // * Famille
  {
    deduction_id: '11',
    deduction_type: 'FAMILLE',
    deduction_name: 'Famille',
    part_salarial: 0,
    part_patronal: 0.0345,
    threshold_id: '0',
  },
  // * Chômage + AGS
  {
    deduction_id: '12',
    deduction_type: 'ASSURANCE CHÔMAGE',
    deduction_name: 'Chômage + AGS',
    part_salarial: 0,
    part_patronal: 0.0425,
    threshold_id: '7',
  },
  {
    deduction_id: '14',
    deduction_type: "AUTRES CONTRIBUTIONS DUES PAR L'EMPLOYEUR",
    deduction_name: 'FNAL',
    part_salarial: 0,
    part_patronal: 0.001,
    threshold_id: '6',
  },
  {
    deduction_id: '16',
    deduction_type: 'CSG non imposable',
    deduction_name: 'CSG non imposable',
    part_salarial: 0.068,
    part_patronal: 0,
    threshold_id: '0',
  },
  // * CSG/CRDS imposable
  {
    deduction_id: '17',
    deduction_type: 'CSG/CRDS imposable',
    deduction_name: 'CSG/CRDS imposable',
    part_salarial: 0.029,
    part_patronal: 0,
    threshold_id: '0',
  },
  // * Effort à la construction(entreprise >= 20 salariés)
  {
    deduction_id: '18',
    deduction_type: 'Effort à la construction',
    deduction_name: 'Effort à la construction',
    part_salarial: 0,
    part_patronal: 0.0045,
    threshold_id: '0',
  },
];

export const social_security_thresholds: ISSThreshold[] = [
  // tranche A = tranche 1
  {
    threshold_id: '1',
    threshold_name: 'TRANCHE A',
    min_value: 0,
    max_value: 3864,
    is_ceiling: false,
  },
  // tranche B
  {
    threshold_id: '2',
    threshold_name: 'TRANCHE B',
    min_value: 3864,
    max_value: 15456,
    is_ceiling: false,
  },
  // tranche C
  {
    threshold_id: '3',
    threshold_name: 'TRANCHE C',
    min_value: 15456,
    max_value: 30912,
    is_ceiling: false,
  },
  // tranche A+B+C
  {
    threshold_id: '4',
    threshold_name: 'TRANCHE A+B+C',
    min_value: 0,
    max_value: 30912,
    is_ceiling: false,
  },
  //  tranche 2
  {
    threshold_id: '5',
    threshold_name: 'TRANCHE 2',
    min_value: 3864,
    max_value: 30912,
    is_ceiling: false,
  },
  // plafond SS (Sécurité Sociale)
  {
    threshold_id: '6',
    threshold_name: 'Plafond Sécurité Sociale',
    min_value: 3864,
    max_value: 3864,
    is_ceiling: true,
  },
  // tranche A+B
  {
    threshold_id: '7',
    threshold_name: 'TRANCHE A+B',
    min_value: 0,
    max_value: 13712,
    is_ceiling: false,
  },
  // tranche 1
  {
    threshold_id: '8',
    threshold_name: 'TRANCHE 1',
    min_value: 0,
    max_value: 3864,
    is_ceiling: false,
  },
];

export const user_data: { company: ICompanyInfo; user: IUser; pay_slip: PaySlip } = {
  company: {
    siret: '12345678901234',
    code_ape: '6202A',
    name: 'Gérico',
    address_line1: '10 Rue des 3 Cailloux',
    address_line2: 'Bâtiment A',
    city: 'Paris',
    postal_code: '75001',
    country: 'France',
    collective_convention: 'Convention Collective Syntec',
  },

  user: {
    uid: '550e8400-e29b-41d4-a716-446655440000',
    civility: 'Monsieur',
    first_name: 'Hammed',
    last_name: 'Abass',
    phone_number: '+33612345678',
    email: 'hammed.abass@gmail.com',
    hashed_password: 'hashedPassword123!',
    job_title: 'Développeur Web',
    job_department: 'Informatique',
    remaining_leave_balance: 7.5,
    is_admin: false,
    hire_date: '2022-09-15',
    departure_date: undefined,
    is_archived: false,
    address_line1: '15 Rue des Lilas',
    address_line2: 'Appartement 3B',
    city: 'Lyon',
    postal_code: '69001',
    country: 'France',
    date_of_birth: '1995-05-12',
    social_security_number: '123456789012345',
    contract_type: 'CDI',
    marital_status: 'Marié',
    dependants: 2,
    reset_code: undefined,
    company_id: '12345678901234',
    created_at: '2022-09-15',
    updated_at: '2024-11-28',
  },

  pay_slip: {
    pid: 'PS20241001',
    uid: '550e8400-e29b-41d4-a716-446655440000',
    gross_salary: 0,
    net_salary: 0,
    start_period: '2024-10-01',
    end_period: '2024-10-31',
    pay_date: '2024-11-05',
    total_hours_worked: [
      { week: 1, worked_hours: 35, overtime: 100 },
      { week: 2, worked_hours: 35, overtime: 0 },
      { week: 3, worked_hours: 35, overtime: 0 },
      { week: 4, worked_hours: 35, overtime: 0 },
    ],
    hourly_rate: 15.3,
    path_to_pdf: '/path/to/payslip/PS20241001.pdf',
  },
};
