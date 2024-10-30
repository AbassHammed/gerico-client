/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';

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
import useChangeDefaultPassword from '@/hooks/useChangePassword';
import useLogin from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { IChangePasswordInput, ILoginInputs } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AuthButton from '../components/button';

const passwordSchema = z
  .string()
  .min(8, { message: 'Votre mot de passe doit contenir au moins 8 caractères.' })
  .max(16, { message: 'Votre mot de passe ne peut pas dépasser 16 caractères.' })
  .refine(motDePasse => /[A-Z]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins une majuscule.',
  })
  .refine(motDePasse => /[a-z]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins une minuscule.',
  })
  .refine(motDePasse => /[0-9]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un chiffre.',
  })
  .refine(motDePasse => /[!@#$%^&*]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un caractère spécial.',
  });

const changeDefaultPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(mdp => mdp.confirmPassword === mdp.password, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

type IChangeDefaultPasswordFormValues = z.infer<typeof changeDefaultPasswordFormSchema>;

export default function ChangeDefaultPasswordForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const { change, loading } = useChangeDefaultPassword();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<IChangeDefaultPasswordFormValues> = {
    password: '',
    confirmPassword: '',
  };

  const form = useForm<IChangeDefaultPasswordFormValues>({
    resolver: zodResolver(changeDefaultPasswordFormSchema),
    defaultValues,
  });

  const handleChangePassword = async (inputs: IChangePasswordInput) => {
    setIsLoading(true);
    try {
      const user = await change(inputs);

      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center md:px-4">
      <div className="w-full space-y-6 ">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-3xl sm:text-3xl">Changer mot de passe</h3>
          </div>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleChangePassword)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={isPasswordHidden ? 'password' : 'text'}
                        autoComplete="off"
                        {...field}
                        onKeyDown={handleKeyDown}
                        className="h-12"
                        disabled={isLoading || loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <button
                          tabIndex={-1}
                          type="button"
                          className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                          onClick={() => setPasswordHidden(!isPasswordHidden)}>
                          {isPasswordHidden ? <Eye /> : <EyeOff />}
                        </button>
                        <Input
                          placeholder="********"
                          type={isPasswordHidden ? 'password' : 'text'}
                          autoComplete="off"
                          {...field}
                          onKeyDown={handleKeyDown}
                          className="h-12"
                          disabled={isLoading || loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AuthButton loading={isLoading || loading}>Changer</AuthButton>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
