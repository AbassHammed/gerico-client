/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Metadata } from 'next';

import Users from '@/components/interfaces/UsersTable';

export const metadata: Metadata = {
  title: 'Employés',
};

const EmployeesPage = () => <Users />;

export default EmployeesPage;
