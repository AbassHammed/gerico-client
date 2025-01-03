/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import { Metadata } from 'next';

import AdminPaySlip from '@/components/interfaces/Payslip/AdminPayslip';

export const metadata: Metadata = {
  title: 'Fiches de paie',
};

const AdminPayslipPage = () => <AdminPaySlip />;
export default AdminPayslipPage;
