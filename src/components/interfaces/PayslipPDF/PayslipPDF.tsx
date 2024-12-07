'use client';

import React from 'react';

import { useCalculations } from '@/hooks/payslip/useCalculations';
import { usePayrollCalculations } from '@/hooks/payslip/usePayrollCalculations';
import { ICompanyInfo, IDeduction, ISSThreshold, IUser } from '@/types';
import { Document, Page, View } from '@react-pdf/renderer';

import EnterpriseAndUserInfo from './components/EnterpriseAndUserInfo';
import GrossSalaryAndPayDate from './components/GrossSalaryAndPayDate';
import NetSalaryRow from './components/NetSalaryRow';
import RemainingLeaveRequest from './components/RemainingLeave';
import { PaySlipRow } from './components/Row';
import { PaySlipRowTotalDeduction } from './components/RowTotalDeduction';
import PaySlipHeader from './components/TableHeader';
import PaySlipTitleSection from './components/TitleSection';
import { PaySlip, PaySlipItem } from './interface';
import { styles } from './styles';
import { calculateTotals } from './utils/misc';

interface PaySlipPDFProps {
  user: IUser;
  company: ICompanyInfo;
  paySlip: PaySlip;
  thresholds: ISSThreshold[];
  deductions: IDeduction[];
}

const PaySlipPDF: React.FC<PaySlipPDFProps> = ({
  user,
  company,
  paySlip,
  thresholds,
  deductions,
}) => {
  const { calculateGrossSalary } = usePayrollCalculations(thresholds);
  const { generatePaySlipData, deductionsConfig } = useCalculations(thresholds, deductions);
  const grossSalary = calculateGrossSalary(paySlip);
  const paySlipData = generatePaySlipData(grossSalary, deductionsConfig);
  const totals = calculateTotals(paySlipData);

  const paySlipTotalDeductions: PaySlipItem[] = [
    //TOTAL DES COTISATIONS
    {
      isCotisationTitle: true,
      cotisation: 'TOTAL DES COTISATIONS',
      assiette: '',
      partSalariale: {
        percentage: 0,
        amount: totals.totalSalarial,
      },
      partPatronale: {
        percentage: 0,
        amount: totals.totalPatronal,
      },
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Section du titre de la fiche de paie */}
        <PaySlipTitleSection startPeriod={paySlip.start_period} endPeriod={paySlip.end_period} />

        {/* Informations sur l'entreprise et l'utilisateur */}
        <EnterpriseAndUserInfo company={company} user={user} />

        {/* Affichage du salaire brut et de la date de paiement */}
        <GrossSalaryAndPayDate grossSalary={grossSalary} payDate={paySlip.pay_date} />

        {/* Espace entre les sections */}
        <View style={styles.spaceBetween30}></View>

        {/* Section des cotisations */}
        <View style={styles.paySlipContainer}>
          <PaySlipHeader />
          {/* Affichage des lignes de cotisations */}
          <View style={styles.paySlipContainer}>
            {paySlipData.map((row, index) => (
              <PaySlipRow
                key={index}
                isCotisationTitle={row.isCotisationTitle}
                cotisation={row.cotisation}
                assiette={row.assiette}
                partSalariale={row.partSalariale!}
                partPatronale={row.partPatronale!}
              />
            ))}
          </View>
        </View>

        {/* Section des totaux des cotisations */}
        <View style={styles.paySlipContainer2}>
          {/* Affichage des totaux des cotisations */}
          {paySlipTotalDeductions.map((row, index) => (
            <PaySlipRowTotalDeduction
              key={index}
              isCotisationTitle={row.isCotisationTitle}
              cotisation={row.cotisation}
              assiette={row.assiette}
              partSalariale={row.partSalariale!}
              partPatronale={row.partPatronale!}
            />
          ))}
        </View>

        {/* Affichage du salaire net */}
        <NetSalaryRow grossSalary={grossSalary} totalSalarial={Number(totals.totalSalarial)} />

        {/* Affichage du solde des congés restants */}
        <RemainingLeaveRequest remainingLeave={user.remaining_leave_balance.toString()} />
      </Page>
    </Document>
  );
};
export default PaySlipPDF;
