import { Metadata } from 'next';
import Link from 'next/link';

import ForgotPasswordForm from '@/components/interfaces/Auth/ForgotPasswordForm';
import AuthLayout from '@/components/interfaces/layouts/authLayout';
import { PagesRoutes } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mot de pass oublié',
};

const ForgotPasswordPage = () => (
  <AuthLayout
    heading="Mot de passe oublié"
    subheading="Saisissez votre adresse e-mail et nous vous enverrons un code pour réinitialiser votre mot de passe">
    <div className="flex flex-col gap-4">
      <ForgotPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href={PagesRoutes.Auth_SignIn} className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ForgotPasswordPage;
