'use client';

import UserForm from '@/components/interfaces/User/UserForm';
import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';
import { ScaffoldContainer } from '@/components/ui/Scaffold';
import { GenericSkeletonLoaderList } from '@/components/ui/ShimmeringLoader';
import { useUpdateUser } from '@/hooks/useCreateUser';
import { useProfile } from '@/hooks/useUser';
import { toast } from 'sonner';

export default function ModifyEmployeeForm({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { user, isLoading, mutate } = useProfile(slug);
  const { update, loading } = useUpdateUser(slug);

  const onSubmit = async (inputs: UserSchemaType) => {
    try {
      const message = await update({
        ...inputs,
        is_admin: Boolean(user?.is_admin),
        remaining_leave_balance: Number(inputs.remaining_leave_balance),
        company_id: user?.company_id || '',
      });
      toast.success(message);
      mutate();
    } catch (error: any) {
      toast.error(`Failed to update user: ${error.message ? error.message : 'An error occurred'}`);
    }
  };

  return (
    <ScaffoldContainer className="flex flex-col gap-10" bottomPadding>
      {(isLoading || !user) && <GenericSkeletonLoaderList />}
      {user && (
        <UserForm defaultUser={user} isUpdatePage onSubmit={onSubmit} isSubmitting={loading} />
      )}
    </ScaffoldContainer>
  );
}
