'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  Form_Shadcn,
  FormControl_Shadcn,
  FormField_Shadcn,
  Input_Shadcn,
} from '@/components/ui';
import { FormItemLayout } from '@/components/ui/form/FormItemLayout';
import useChangeDefaultPassword from '@/hooks/useChangePassword';
import { PagesRoutes } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { passwordSchema } from './Auth.utils';
import PasswordConditionsHelper from './PasswordConditionsHelper';

export const ChangeDefaultPasswordForm = () => {
  const { change, loading } = useChangeDefaultPassword();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordHidden1, setPasswordHidden1] = useState(true);
  const [showConditions, setShowConditions] = useState<'password' | 'confirmPassword' | null>(null);
  const router = useRouter();

  const FormSchema = z
    .object({
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine(mdp => mdp.confirmPassword === mdp.password, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'],
    });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { password, confirmPassword } = form.watch();

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    try {
      await change(values);
      router.push(PagesRoutes.Admin_Dashboard);
    } catch (error: any) {
      toast.error('Erreur inconnue', {
        description: error.message,
      });
    }
  };

  return (
    <Form_Shadcn {...form}>
      <form
        id="change-default-password-form"
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField_Shadcn
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItemLayout layout="vertical" label="Mot de passe">
              <FormControl_Shadcn>
                <div className="relative">
                  <Input_Shadcn
                    {...field}
                    id="password"
                    name="password"
                    type={passwordHidden ? 'password' : 'text'}
                    aria-label="Mot de passe"
                    autoComplete="new-password"
                    disabled={loading}
                    onFocus={() => setShowConditions('password')}
                    onBlur={() => setShowConditions(null)}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                    <Button
                      icon={passwordHidden ? <Eye /> : <EyeOff />}
                      type={'default'}
                      className="!mr-1"
                      onClick={() => setPasswordHidden(prev => !prev)}
                    />
                  </div>
                </div>
              </FormControl_Shadcn>
            </FormItemLayout>
          )}
        />

        <FormField_Shadcn
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItemLayout layout="vertical" label="Confirmer le mot de passe">
              <FormControl_Shadcn>
                <div className="relative">
                  <Input_Shadcn
                    {...field}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={passwordHidden1 ? 'password' : 'text'}
                    aria-label="Confirmer le mot de passe"
                    autoComplete="new-password"
                    disabled={loading}
                    onFocus={() => setShowConditions('confirmPassword')}
                    onBlur={() => setShowConditions(null)}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                    <Button
                      icon={passwordHidden1 ? <Eye /> : <EyeOff />}
                      type={'default'}
                      className="!mr-1"
                      onClick={() => setPasswordHidden1(prev => !prev)}
                    />
                  </div>
                </div>
              </FormControl_Shadcn>
            </FormItemLayout>
          )}
        />

        {showConditions && (
          <div className={`max-h-[500px] transition-all duration-500 overflow-y-hidden`}>
            <PasswordConditionsHelper
              password={showConditions === 'password' ? password : confirmPassword}
            />
          </div>
        )}

        <Button
          block
          form="change-default-password-form"
          htmlType="submit"
          size={'large'}
          disabled={confirmPassword.length === 0 || password.length === 0 || loading}>
          Change password
        </Button>
      </form>
    </Form_Shadcn>
  );
};
