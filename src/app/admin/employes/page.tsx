import { Metadata } from 'next';

import Users from '@/components/interfaces/UsersTable';

export const metadata: Metadata = {
  title: {
    default: 'Employees',
    template: '%s ~ Gerico',
  },
};

const EmployeesPage = () => <Users />;

export default EmployeesPage;
