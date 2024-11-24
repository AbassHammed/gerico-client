import { Suspense } from 'react';

import { Metadata } from 'next';

import SignInForm from '@/components/interfaces/Auth/SignInForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Se connecter',
};

const SignInPage = () => (
  <AuthLayout heading="Bienvenue" subheading="Connectez-vous à votre compte" showDisclaimer>
    <div className="flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  </AuthLayout>
);

export default SignInPage;
