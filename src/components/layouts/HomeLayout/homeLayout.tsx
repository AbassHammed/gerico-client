import { PropsWithChildren } from 'react';

import Image from 'next/legacy/image';
import Link from 'next/link';

import { CircleHelp } from 'lucide-react';

import { Button } from '../../ui';
import AvatarDropdown from './UserAccount';

const HomeLayout = ({ children }: PropsWithChildren) => (
  <div className="flex-1 bg-studio flex flex-col ">
    <header className="sticky top-0 mx-auto w-full px-6 sm:px-4 py-2 items-center justify-between lg:px-6 border-b border-border">
      <nav className="relative flex items-center justify-between sm:h-10">
        <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link href={'/'}>
              <Image
                src="/app/gerico-logo-wordmark.svg"
                alt="Gérico Logo"
                height={24}
                width={120}
                quality={95}
                priority
              />
            </Link>
          </div>
        </div>

        <div className="items-center hidden space-x-3 md:ml-10 md:flex md:pr-4">
          <AvatarDropdown />
          <Button asChild type={'default'} size="tiny" icon={<CircleHelp />}>
            <Link href="/support" />
          </Button>
        </div>
      </nav>
    </header>

    <div className="flex flex-col justify-center items-center">
      <main className="w-full flex flex-col px-5">{children}</main>
    </div>
  </div>
);

export default HomeLayout;
