import { Metadata } from 'next';
import Link from 'next/link';

import ForgotPasswordForm from '@/components/interfaces/Auth/ForgotPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Mot de pass oublié',
};

const ForgotPasswordPage = () => (
  <AuthLayout
    heading="Reset Your Password"
    subheading="Type in your email and we'll send you a link to reset your password">
    <div className="flex flex-col gap-4">
      <ForgotPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href="/auth/sign-in" className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ForgotPasswordPage;
