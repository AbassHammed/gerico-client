/* eslint-disable quotes */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import useLogin from '@/hooks/useLogin';
import { PagesRoutes } from '@/lib/constants';
import { Button, Form, Input } from '@ui';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { object, string } from 'yup';

const signInSchema = object({
  email: string().email("L'email doit être valide").required("L'email est requis"),
  password: string().required('Le mot de passe est requis'),
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading } = useLogin();
  const [passwordHidden, setPasswordHidden] = useState(true);

  const onSignIn = async ({ email, password }: { email: string; password: string }) => {
    const toastId = toast.loading('Connexion en cours...');

    try {
      const { code } = await login({ email, password });
      if (code) {
        if (code === 'DEFAULTPASS') {
          toast.success(`Vous utilisez un mot de passe par défaut, vous devez le changer`, {
            id: toastId,
          });
          router.replace(PagesRoutes.Auth_ChangeDefaultPassword);
          return;
        }
      }

      toast.success(`Connexion réussie !`, { id: toastId });
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(decodeURIComponent(redirectTo));
    } catch (error: any) {
      toast.error(`Échec de la connexion : ${error.message}`, { id: toastId });
    }
  };

  return (
    <Form
      validateOnBlur
      id="signIn-form"
      initialValues={{ email: '', password: '' }}
      validationSchema={signInSchema}
      onSubmit={onSignIn}>
      {() => (
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            disabled={loading}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={passwordHidden ? 'password' : 'text'}
              label="Mot de passe"
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
              actions={
                <Button
                  icon={passwordHidden ? <Eye /> : <EyeOff />}
                  type="default"
                  className="!mr-1"
                  onClick={() => setPasswordHidden(prev => !prev)}
                />
              }
            />

            <Link
              href={PagesRoutes.Auth_ForgotPassword}
              className="absolute top-0 right-0 text-sm text-foreground-lighter">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            block
            form="signIn-form"
            htmlType="submit"
            size="large"
            className="text-white"
            disabled={loading}
            loading={loading}>
            Se connecter
          </Button>
        </div>
      )}
    </Form>
  );
};

export default SignInForm;
