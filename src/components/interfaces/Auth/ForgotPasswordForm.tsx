'use client';

import { useRouter } from 'next/navigation';

import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Button, Form, Input } from '@ui';
import { toast } from 'sonner';
import { object, string } from 'yup';

const forgotPasswordSchema = object({
  email: string().email('Must be a valid email').required('Email is required'),
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { sendMail, loading } = useForgotPassword();

  const onForgotPassword = async ({ email }: { email: string }) => {
    try {
      await sendMail({ email });
      toast.success(
        `If you registered using your email and password, you will receive a password reset email. The password reset link expires in 10 minutes.`,
      );
      router.push('/auth/reset-password');
    } catch (error: any) {
      toast.error('Invalid operation', {
        description: error.message,
      });
    }
  };

  return (
    <Form
      validateOnBlur
      id="forgot-password-form"
      initialValues={{ email: '' }}
      validationSchema={forgotPasswordSchema}
      onSubmit={onForgotPassword}>
      <div className="flex flex-col pt-4 space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          disabled={loading}
          autoComplete="email"
        />

        <div className="border-t border-overlay-border" />

        <Button
          block
          form="forgot-password-form"
          htmlType="submit"
          size="medium"
          disabled={loading}
          loading={loading}>
          Send Reset Email
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
