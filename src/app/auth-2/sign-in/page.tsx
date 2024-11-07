import Link from 'next/link';

import SignInForm from '@/components/interfaces/Auth/SignInForm';
import AuthLayout from '@/components/layouts/authLayout';

const SignInPage = () => (
  <AuthLayout heading="Welcome back" subheading="Sign in to your account" showDisclaimer>
    <div className="flex flex-col">
      <SignInForm />
    </div>

    <div className="self-center my-8 text-sm">
      <div>
        <span className="text-foreground-light">Don't have an account?</span>{' '}
        <Link
          href="/sign-up"
          className="underline transition text-foreground hover:text-foreground-light">
          Sign Up Now
        </Link>
      </div>
    </div>
  </AuthLayout>
);

export default SignInPage;
