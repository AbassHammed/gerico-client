import { Metadata } from 'next';
import Link from 'next/link';

import { ResetPasswordForm } from '@/components/interfaces/Auth/ResetPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Changer de mot passe',
};

const ResetPasswordPage = () => (
  <AuthLayout
    heading="Reset Your Password"
    subheading="Type in your email and we'll send you a link to reset your password">
    <div className="flex flex-col gap-4">
      <ResetPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href="/auth-2/sign-in" className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ResetPasswordPage;
