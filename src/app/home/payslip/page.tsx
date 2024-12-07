'use client';

import React from 'react';

import {
  deductions,
  social_security_thresholds,
  user_data,
} from '@/components/interfaces/PayslipPDF/data';
import PaySlipPDF from '@/components/interfaces/PayslipPDF/PayslipPDF';
import { PDFViewer } from '@react-pdf/renderer';

function PayslipPage() {
  return (
    <PDFViewer width="100%" height="100%">
      <PaySlipPDF
        user={user_data.user}
        company={user_data.company}
        paySlip={user_data.pay_slip}
        deductions={deductions}
        thresholds={social_security_thresholds}
      />
    </PDFViewer>
  );
}
export default PayslipPage;
