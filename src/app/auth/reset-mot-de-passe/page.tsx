import { Metadata } from 'next';
import Link from 'next/link';

import { ResetPasswordForm } from '@/components/interfaces/Auth/ResetPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';
import { PagesRoutes } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Changer de mot passe',
};

const ResetPasswordPage = () => (
  <AuthLayout
    heading="Réinitialiser votre mot de passe"
    subheading="Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe">
    <div className="flex flex-col gap-4">
      <ResetPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href={PagesRoutes.Auth_SignIn} className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ResetPasswordPage;
