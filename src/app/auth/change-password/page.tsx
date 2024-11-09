import { Metadata } from 'next';
import Link from 'next/link';

import { ChangeDefaultPasswordForm } from '@/components/interfaces/Auth/ChangeDefaultPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Changer le mot de passe par default',
};

const ChangeDefaultPassword = () => (
  <AuthLayout
    heading="Reset Your Password"
    subheading="Type in your email and we'll send you a link to reset your password">
    <div className="flex flex-col gap-4">
      <ChangeDefaultPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href="/auth-2/sign-in" className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ChangeDefaultPassword;
