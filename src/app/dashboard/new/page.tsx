'use client';

import UserForm from '@/components/interfaces/User/UserForm';
import { ScaffoldContainer } from '@/components/ui/Scaffold';

export default function EmployeeForm() {
  return (
    <ScaffoldContainer className="flex flex-col gap-10" bottomPadding>
      <UserForm />
    </ScaffoldContainer>
  );
}
