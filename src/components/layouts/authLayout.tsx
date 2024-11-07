import { PropsWithChildren } from 'react';

import Image from 'next/legacy/image';
import Link from 'next/link';

type AuthLayoutProps = {
  heading: string;
  subheading: string;
  showHeadings?: boolean;
  showDisclaimer?: boolean;
};

const AuthLayout = ({
  heading,
  subheading,
  showHeadings = true,
  showDisclaimer,
  children,
}: PropsWithChildren<AuthLayoutProps>) => (
  <div className="flex-1 bg-studio flex flex-col gap-8 lg:gap-16 xl:gap-32">
    <div className="sticky top-0 mx-auto w-full max-w-7xl px-8 pt-6 sm:px-6 lg:px-8">
      <nav className="relative flex items-center justify-between sm:h-10">
        <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link href={'/'}>
              <Image src="/app/gerico-logo-wordmark.svg" alt="" height={24} width={120} />
            </Link>
          </div>
        </div>
      </nav>
    </div>

    <div className="flex flex-col justify-center items-center">
      <main className="max-w-[448px] w-full flex flex-col px-5">
        {showHeadings && (
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl mt-8 mb-2">{heading}</h1>
            <h2 className="text-foreground-light text-sm">{subheading}</h2>
          </div>
        )}

        {children}

        {showDisclaimer && (
          <div className="sm:text-center">
            <p className="text-xs text-foreground-lighter sm:mx-auto sm:max-w-sm">
              By continuing, you agree to Gérico's{' '}
              <Link href="#" className="underline hover:text-foreground-light">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="underline hover:text-foreground-light">
                Privacy Policy.
              </Link>
            </p>
          </div>
        )}
      </main>
    </div>
  </div>
);

export default AuthLayout;
