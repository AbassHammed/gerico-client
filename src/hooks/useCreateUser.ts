import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';

import { useApiMutationWithAuth, useApiMutationWithAuthAndPatch } from './useApi';

export function useCreateUser() {
  const { trigger, isMutating: loading } = useApiMutationWithAuth<
    undefined,
    UserSchemaType & { company_id: string }
  >('/users');

  const createUser = async (inputs: UserSchemaType & { company_id: string }) => {
    try {
      const res = await trigger(inputs);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { createUser, loading };
}

export function useUpdateUser(userId: string) {
  const { trigger, isMutating: loading } = useApiMutationWithAuthAndPatch<
    undefined,
    UserSchemaType & { company_id: string }
  >(`/users/${userId}`);

  const update = async (inputs: UserSchemaType & { company_id: string }) => {
    try {
      const res = await trigger(inputs);
      return res?.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { update, loading };
}
