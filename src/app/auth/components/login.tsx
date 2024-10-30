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
import { cn } from '@/lib/utils';
import { ILoginInputs } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AuthButton from './button';

const passwordSchema = z
  .string()
  .min(8, { message: 'Votre mot de passe doit contenir au moins 8 caractères.' })
  .max(20, { message: 'Votre mot de passe ne peut pas dépasser 20 caractères' })
  .refine(motDePasse => /[A-Z]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins une majuscule.',
  })
  .refine(motDePasse => /[a-z]/.test(motDePasse), {
    message: 'Votre mot de passe doit également contenir au moins une minuscule.',
  })
  .refine(motDePasse => /[0-9]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un caractère numérique.',
  })
  .refine(motDePasse => /[!@#$%^&*]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un caractère spécial.',
  });

const loginFormSchema = z.object({
  email: z.string({ required_error: 'Veuillez saisir votre adresse e-mail' }).email(),
  password: passwordSchema,
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginAuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<LoginFormValues> = {
    email: '',
    password: '',
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const handleLogin = async (inputs: ILoginInputs) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
                    disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthButton loading={isLoading}>Se connecter</AuthButton>
        </form>
      </Form>
    </div>
  );
}

// export default function Login({ setAuthPage }: AuthProps) {
//   return (
//     <main className="w-full h-full flex flex-col items-center justify-center sm:px-4">
//       <div className="w-full space-y-6 sm:max-w-lg">
//         <div className="text-center">
//           <div className="mt-5 space-y-2">
//             <h3 className="text-3xl sm:text-3xl">Se connecter à Code Proctor</h3>
//           </div>
//         </div>
//         <div className="p-4 py-6 sm:p-6 mx-4"></div>

//         <div className="flex flex-col items-center justify-center space-y-3">
//           <Link
//             href={'#'}
//             className="text-[14px] underline text-brand-purple"
//             onClick={() => setAuthPage('reset')}>
//             Mot de passe oublié ?
//           </Link>
//           <span className="text-[14px]">
//             Pas de compte ?{' '}
//             <Link
//               href={'#'}
//               className="text-[14px] underline text-brand-purple"
//               onClick={() => setAuthPage('signup')}>
//               Créer un compte
//             </Link>
//           </span>
//         </div>
//       </div>
//     </main>
//   );
// }
