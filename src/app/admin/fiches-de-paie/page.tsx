import React from 'react';

import { Metadata } from 'next';

import AdminPaySlip from '@/components/interfaces/Payslip/AdminPayslip';

export const metadata: Metadata = {
  title: 'Fiches de paie',
};

const AdminPayslipPage = () => <AdminPaySlip />;
export default AdminPayslipPage;
