import { Metadata } from 'next';

import UserPayslipList from '@/components/interfaces/Payslip/UserPayslipList';

export const metadata: Metadata = {
  title: {
    default: 'Fiches de paie',
    template: '%s | Gerico',
  },
};

export default function UserPayslipPage() {
  return <UserPayslipList />;
}
