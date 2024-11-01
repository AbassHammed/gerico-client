/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/form';
import { Input } from '@/components/shared/input';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AuthButton from './button';

const ForgotFormSchema = z.object({
  email: z.string({ required_error: 'Veuillez saisir votre adresse e-mail' }).email(),
});

export type IForgotFormType = z.infer<typeof ForgotFormSchema>;

export default function ForgotPasswordAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const { sendMail, loading } = useForgotPassword();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<IForgotFormType> = {
    email: '',
  };

  const form = useForm<IForgotFormType>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues,
  });

  const handleForgot = async (inputs: { email: string }) => {
    try {
      const emailSent = await sendMail(inputs);
      router.push('/auth/reset-password');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleForgot)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@john.doe"
                    autoComplete="email"
                    {...field}
                    onKeyDown={handleKeyDown}
                    className="h-12"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthButton loading={loading}>Se connecter</AuthButton>
        </form>
      </Form>
    </div>
  );
}
