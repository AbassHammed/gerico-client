'use client';

import UserForm from '@/components/interfaces/User/UserForm';
import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';
import { ScaffoldContainer } from '@/components/ui/Scaffold';
import { GenericSkeletonLoaderList } from '@/components/ui/ShimmeringLoader';
import { useCreateUser } from '@/hooks/useCreateUser';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

export default function EmployeeForm() {
  const { user, isLoading } = useUser();
  const { createUser, loading } = useCreateUser();

  const onSubmit = async (inputs: UserSchemaType, { resetForm }: any) => {
    // this will probably never happen since the user is required to be connected to access this page
    if (!user) {
      toast.error('You are not connected');
      return;
    }

    try {
      const company_id = user.company_id;
      const message = await createUser({ ...inputs, company_id });
      toast.success(message);
      resetForm();
    } catch (error: any) {
      toast.error(`Failed to create user: ${error.message ? error.message : 'An error occurred'}`);
    }
  };
  return (
    <ScaffoldContainer className="flex flex-col gap-10" bottomPadding>
      {(isLoading || loading) && <GenericSkeletonLoaderList />}
      {!isLoading && !loading && <UserForm onSubmit={onSubmit} isSubmitting={loading} />}
    </ScaffoldContainer>
  );
}
