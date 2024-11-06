import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useLogin from '@/hooks/useLogin';
import { buildPathWithParams } from '@/lib/utils';
import { Button, Form, Input } from '@ui';
import { toast } from 'sonner';
import { object, string } from 'zod';

const signInSchema = object({
  email: string({ required_error: 'Email is required' }).email('Must be a valid email'),
  password: string({ required_error: 'Password is required' }),
});

const SignInForm = () => {
  const router = useRouter();
  const { login, loading } = useLogin();

  const onSignIn = async ({ email, password }: { email: string; password: string }) => {
    const toastId = toast.loading('Signing in...');

    try {
      const { code } = await login({ email, password });
      if (code) {
        if (code !== 'DEFAULTPASS') {
          toast.success(`You need to provide your second factor authentication`, { id: toastId });
          const url = buildPathWithParams('/sign-in-mfa');
          router.replace(url);
          return;
        }
      }

      toast.success(`Signed in successfully!`, { id: toastId });
      // since we're already on the /sign-in page, prevent redirect loops
      router.push('/home');
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
            type="password"
            label="Password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            disabled={loading}
            autoComplete="current-password"
          />

          {/* positioned using absolute instead of labelOptional prop so tabbing between inputs works smoothly */}
          <Link
            href="/forgot-password"
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
    </Form>
  );
};

export default SignInForm;
