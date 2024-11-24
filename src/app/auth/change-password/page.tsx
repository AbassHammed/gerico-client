import { Metadata } from 'next';
import Link from 'next/link';

import { ChangeDefaultPasswordForm } from '@/components/interfaces/Auth/ChangeDefaultPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Changer le mot de passe par default',
};

const ChangeDefaultPassword = () => (
  <AuthLayout
    heading="Changer le mot de passe par default"
    subheading="Saisissez votre mot de passe actuel et votre nouveau mot de passe">
    <div className="flex flex-col gap-4">
      <ChangeDefaultPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <Link href="/auth/sign-in" className="underline hover:text-foreground-light">
        Annuler
      </Link>
    </div>
  </AuthLayout>
);

export default ChangeDefaultPassword;
