'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  Form_Shadcn,
  FormControl_Shadcn,
  FormField_Shadcn,
  Input_Shadcn,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui';
import { FormItemLayout } from '@/components/ui/form/FormItemLayout';
import { useResetPassword } from '@/hooks/useResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import { Eye, EyeOff } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { passwordSchema } from './Auth.utils';
import PasswordConditionsHelper from './PasswordConditionsHelper';

export const ResetPasswordForm = () => {
  const { resetPassword, loading } = useResetPassword();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordHidden1, setPasswordHidden1] = useState(true);
  const [showConditions, setShowConditions] = useState<'password' | 'confirmPassword' | null>(null);
  const router = useRouter();

  const FormSchema = z
    .object({
      reset_code: z.string().min(6, { message: 'Le code doit contenir 6 caractères' }),
      password: passwordSchema,
      confirm_password: passwordSchema,
    })
    .refine(mdp => mdp.confirm_password === mdp.password, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'],
    });

  const defaultValues = {
    reset_code: '',
    password: '',
    confirm_password: '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { password, confirm_password } = form.watch();

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    try {
      const uid = getCookie('t_uid')!;
      const inputs = { ...values, uid };

      const res = await resetPassword(inputs);
      if (res) {
        toast.success('Mot de passe réinitialisé avec succès');
        router.push('/auth/sign-in');
        return;
      }
    } catch (error: any) {
      toast.error('Opération invalide', {
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
          name="reset_code"
          control={form.control}
          render={({ field }) => (
            <FormItemLayout layout="vertical" label="Code">
              <FormControl_Shadcn>
                <InputOTP
                  maxLength={6}
                  {...field}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  disabled={loading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl_Shadcn>
            </FormItemLayout>
          )}
        />
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
                    disabled={loading}
                    autoComplete="new-password"
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
          name="confirm_password"
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
              password={showConditions === 'password' ? password : confirm_password}
            />
          </div>
        )}

        <Button
          block
          form="change-default-password-form"
          htmlType="submit"
          size={'large'}
          disabled={confirm_password.length === 0 || password.length === 0 || loading}>
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Form_Shadcn>
  );
};
