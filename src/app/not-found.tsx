'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import { Button } from '@ui';

const Error404 = () => {
  const [show404, setShow404] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow404(true);
    }, 500);
  }, []);

  return (
    <>
      <main className="relative min-h-screen">
        <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center">
          <div className="absolute top-0 mx-auto w-full max-w-7xl px-8 pt-6 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10">
              <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="/">
                    <Image
                      src="/app/gerico-logo-wordmark.svg"
                      alt="Gerico logo"
                      height={24}
                      width={120}
                    />
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="absolute">
            <h1
              className={`text-foreground select-none text-[14rem] opacity-[5%] filter transition duration-200 sm:text-[18rem] lg:text-[28rem] ${
                show404 ? 'blur-sm' : 'blur-none'
              }`}>
              404
            </h1>
          </div>
          <div
            className={`flex flex-col items-center justify-center space-y-6 transition ${
              show404 ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="text-foreground flex w-[320px] flex-col items-center justify-center space-y-3">
              <h1 className="m-2 text-2xl text-center">Vous cherchez quelque chose ?</h1>
              <p className="text-center text-sm">
                Nous n'avons pas pu trouver la page que vous recherchez !
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild size="small" className="text-white">
                <Link href="/">Accueil</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Error404;
