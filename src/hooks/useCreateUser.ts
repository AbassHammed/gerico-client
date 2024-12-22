import { UserSchemaType } from '@/components/interfaces/User/UserForm.utils';

import { useApiMutation } from './useApi';

export function useCreateUser() {
  const { trigger, isMutating: loading } = useApiMutation<
    undefined,
    UserSchemaType & { company_id: string }
  >('/users', undefined, 'POST', true);

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
  const { trigger, isMutating: loading } = useApiMutation<
    undefined,
    UserSchemaType & { company_id: string }
  >(`/users/${userId}`, undefined, 'PATCH', true);

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
