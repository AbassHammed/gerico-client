'use client';

import UserForm from '@/components/interfaces/User/UserForm';
import { GenericSkeletonLoader } from '@/components/ui';
import { ScaffoldContainer } from '@/components/ui/Scaffold';
import { useProfile } from '@/hooks/useUser';

const LoadingList = () => (
  <div className="flex items-center justify-center">
    {Array.from({ length: 4 }).map((_, index) => (
      <GenericSkeletonLoader key={index} />
    ))}
  </div>
);

export default function ModifyEmployeeForm({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { user, isLoading } = useProfile(slug);
  return (
    <ScaffoldContainer className="flex flex-col gap-10" bottomPadding>
      {isLoading || (!user && <LoadingList />)}
      {user && <UserForm defaultUser={user} isUpdatePage />}
    </ScaffoldContainer>
  );
}
