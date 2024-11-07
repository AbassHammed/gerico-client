import Link from 'next/link';

import ForgotPasswordForm from '@/components/interfaces/Auth/ForgotPasswordForm';
import AuthLayout from '@/components/layouts/authLayout';

const ForgotPasswordPage = () => (
  <AuthLayout
    heading="Reset Your Password"
    subheading="Type in your email and we'll send you a link to reset your password">
    <div className="flex flex-col gap-4">
      <ForgotPasswordForm />
    </div>

    <div className="my-8 self-center text-sm">
      <span className="text-foreground-light">Already have an account?</span>{' '}
      <Link href="/sign-in" className="underline hover:text-foreground-light">
        Sign In
      </Link>
    </div>
  </AuthLayout>
);

export default ForgotPasswordPage;
