'use client';

import { useState } from 'react';

import Link from 'next/link';

import LoginAuthForm from './components/login';

export type AuthPage = 'login' | 'forgot';

export default function UserPage() {
  const [page, setPage] = useState<AuthPage>('login');

  return (
    <main className="w-full h-full flex flex-col items-center justify-center md:px-4">
      <div className="w-full space-y-6 ">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-3xl sm:text-3xl">Se connecter</h3>
          </div>
        </div>

        {page === 'login' ? <LoginAuthForm /> : null}

        <div className="flex flex-col items-center justify-center space-y-3">
          <Link
            href={page === 'login' ? '#forgot-password' : '#login'}
            className="text-[14px] underline text-brand-purple"
            onClick={() => setPage(page === 'forgot' ? 'login' : 'forgot')}>
            {page === 'login' ? 'Mot de passe oublié ?' : 'Annuler'}
          </Link>
        </div>
      </div>
    </main>
  );
}
