/* eslint-disable quotes */
'use client';

import React from 'react';

import UserForm from '@/components/interfaces/User/UserForm';
import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';
import {
  ScaffoldContainer,
  ScaffoldContainerLegacy,
  ScaffoldDivider,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';
import { useCreateUser } from '@/hooks/useCreateUser';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

export default function EmployeeForm() {
  const { user } = useUser();
  const { createUser, loading } = useCreateUser();

  const onSubmit = async (inputs: UserSchemaType, { resetForm }: any) => {
    // this will probably never happen since the user is required to be connected to access this page
    if (!user) {
      toast.error('Vous devez être connecté pour accéder à cette page');
      return;
    }

    try {
      const company_id = user.company_id;
      const message = await createUser({ ...inputs, company_id });
      toast.success(message);
      resetForm();
    } catch (error: any) {
      toast.error("Une erreur est survenue lors de la création de l'employé", {
        description: error.message,
      });
    }
  };
  return (
    <React.Fragment>
      <ScaffoldHeader className="pb-0">
        <ScaffoldContainer>
          <ScaffoldTitle className="pb-3">Créer un nouvel employé</ScaffoldTitle>
        </ScaffoldContainer>
      </ScaffoldHeader>

      <ScaffoldDivider />

      <ScaffoldContainerLegacy>
        {<UserForm onSubmit={onSubmit} isSubmitting={loading} />}
      </ScaffoldContainerLegacy>
    </React.Fragment>
  );
}
