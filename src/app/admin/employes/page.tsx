import { Metadata } from 'next';

import Users from '@/components/interfaces/UsersTable';

export const metadata: Metadata = {
  title: 'Employés',
};

const EmployeesPage = () => <Users />;

export default EmployeesPage;
