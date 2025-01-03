/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Suspense } from 'react';

import { Metadata } from 'next';

import SignInForm from '@/components/interfaces/Auth/SignInForm';
import AuthLayout from '@/components/layouts/authLayout';
import { LoadingV2 } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Se connecter',
};

const SignInPage = () => (
  <AuthLayout heading="Bienvenue" subheading="Connectez-vous à votre compte" showDisclaimer>
    <div className="flex flex-col">
      <Suspense fallback={<LoadingV2 />}>
        <SignInForm />
      </Suspense>
    </div>
  </AuthLayout>
);

export default SignInPage;
