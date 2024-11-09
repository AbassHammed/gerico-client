import { Metadata } from 'next';

import SignInForm from '@/components/interfaces/Auth/SignInForm';
import AuthLayout from '@/components/layouts/authLayout';

export const metadata: Metadata = {
  title: 'Se connecter',
};

const SignInPage = () => (
  <AuthLayout heading="Welcome back" subheading="Sign in to your account" showDisclaimer>
    <div className="flex flex-col">
      <SignInForm />
    </div>
  </AuthLayout>
);

export default SignInPage;
