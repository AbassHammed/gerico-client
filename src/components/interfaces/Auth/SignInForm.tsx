'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import useLogin from '@/hooks/useLogin';
import { Button, Form, Input } from '@ui';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { object, string } from 'yup';

const signInSchema = object({
  email: string().email('Must be a valid email').required('Email is required'),
  password: string().required('Password is required'),
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading } = useLogin();
  const [passwordHidden, setPasswordHidden] = useState(true);

  const onSignIn = async ({ email, password }: { email: string; password: string }) => {
    const toastId = toast.loading('Signing in...');

    try {
      const { code } = await login({ email, password });
      if (code) {
        if (code === 'DEFAULTPASS') {
          toast.success(`You used a default password, you have to change it `, { id: toastId });
          router.replace('/auth/change-password');
          return;
        }
      }

      toast.success(`Signed in successfully!`, { id: toastId });
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(decodeURIComponent(redirectTo));
    } catch (error: any) {
      toast.error(`Failed to sign in: ${error.message}`, { id: toastId });
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
              label="Password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
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
              href="/auth/forgot-password"
              className="absolute top-0 right-0 text-sm text-foreground-lighter">
              Forgot Password?
            </Link>
          </div>

          <Button
            block
            form="signIn-form"
            htmlType="submit"
            size="large"
            disabled={loading}
            loading={loading}>
            Sign In
          </Button>
        </div>
      )}
    </Form>
  );
};

export default SignInForm;
