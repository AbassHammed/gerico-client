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
} from '@/components/ui/shadcn/ui/form';
import { Input } from '@/components/ui/shadcn/ui/input';
import useLogin from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { ILoginInputs } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import AuthButton from './button';

const passwordSchema = z
  .string()
  .min(8, { message: 'Votre mot de passe doit contenir au moins 8 caractères.' })
  .max(20, { message: 'Votre mot de passe ne peut pas dépasser 20 caractères' });

const loginFormSchema = z.object({
  email: z.string({ required_error: 'Veuillez saisir votre adresse e-mail' }).email(),
  password: passwordSchema,
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export default function LoginAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const { login, loading } = useLogin();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<LoginFormType> = {
    email: '',
    password: '',
  };

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const handleLogin = async (inputs: ILoginInputs) => {
    setIsLoading(true);
    try {
      const { code } = await login(inputs);
      if (code === 'DEFAULTPASS') {
        router.push('/auth/change-password');
        return;
      }
      router.push('/home');
    } catch (error: any) {
      toast.error('Invalid operation', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
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
                    disabled={isLoading || loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                      autoComplete="current-password"
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

          <AuthButton loading={isLoading || loading}>Se connecter</AuthButton>
        </form>
      </Form>
    </div>
  );
}
