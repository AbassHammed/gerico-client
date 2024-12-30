'use client';

import React from 'react';

import { ICompanyInfo, IUser, PaySlip, PaySlipItem } from '@/types';
import { Document, Page, View } from '@react-pdf/renderer';

import EnterpriseAndUserInfo from './components/EnterpriseAndUserInfo';
import FooterPaySlip from './components/FooterPaySlip';
import GrossSalaryAndPayDate from './components/GrossSalaryAndPayDate';
import NetSalaryRow from './components/NetSalaryRow';
import NetSalaryRowAfterTaxes from './components/NetSalaryRowAfterTaxes';
import RemainingLeaveRequest from './components/RemainingLeave';
import PaySlipRow from './components/Row';
import PaySlipRowTotalDeduction from './components/RowTotalDeduction';
import PaySlipHeader from './components/TableHeader';
import TaxTable from './components/TaxTable';
import PaySlipTitleSection from './components/TitleSection';
import { styles } from './styles';

interface PaySlipPDFProps {
  user: IUser;
  company: ICompanyInfo;
  paySlip: Omit<
    PaySlip,
    | 'pid'
    | 'uid'
    | 'path_to_pdf'
    | 'total_hours_worked'
    | 'gross_salary'
    | 'net_salary'
    | 'hourly_rate'
  >;
  payslipData: PaySlipItem[];
  grossSalary: number;
  totals: {
    totalSalarial: string;
    totalPatronal: string;
  };
}

const PaySlipPDF = ({
  user,
  company,
  paySlip,
  totals,
  grossSalary,
  payslipData,
}: PaySlipPDFProps) => {
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
        <PaySlipTitleSection startPeriod={paySlip.start_period} endPeriod={paySlip.end_period} />

        <EnterpriseAndUserInfo company={company} user={user} />

        <GrossSalaryAndPayDate grossSalary={grossSalary} payDate={paySlip.pay_date} />

        <View style={styles.spaceBetween30}></View>

        <View style={styles.paySlipContainer}>
          <PaySlipHeader />
          <View style={styles.paySlipContainer}>
            {payslipData.map((row, index) => (
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

        <View style={styles.paySlipContainer2}>
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

        <NetSalaryRow grossSalary={grossSalary} totalSalarial={Number(totals.totalSalarial)} />

        <TaxTable grossSalary={grossSalary} totalSalarial={Number(totals.totalSalarial)} />
        <NetSalaryRowAfterTaxes
          grossSalary={grossSalary}
          totalSalarial={Number(totals.totalSalarial)}
        />
        <RemainingLeaveRequest remainingLeave={user.remaining_leave_balance.toString()} />

        <FooterPaySlip />
      </Page>
    </Document>
  );
};
export default PaySlipPDF;
