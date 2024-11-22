/* eslint-disable quotes */
'use client';

import { useRouter } from 'next/navigation';

import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Button, Form, Input } from '@ui';
import { toast } from 'sonner';
import { object, string } from 'yup';

const forgotPasswordSchema = object({
  email: string().email("L'email doit être valide").required("L'email est requis"),
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { sendMail, loading } = useForgotPassword();

  const onForgotPassword = async ({ email }: { email: string }) => {
    try {
      await sendMail({ email });
      toast.success(
        `Si vous vous êtes inscrit avec votre email et mot de passe, vous recevrez un email de réinitialisation.`,
      );
      router.push('/auth/reset-password');
    } catch (error: any) {
      toast.error('Opération invalide', {
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
      {() => (
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

          <Button
            block
            form="forgot-password-form"
            htmlType="submit"
            size="medium"
            disabled={loading}
            loading={loading}>
            Envoyer le mail
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ForgotPasswordForm;
