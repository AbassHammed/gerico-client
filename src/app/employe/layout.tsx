/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Metadata } from 'next';

import { HomeLayoutHeader } from '@/components/layouts/HomeLayout/homeLayoutHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s | Employé | Gerico',
    default: 'Accueil | Employé ',
  },
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="border-border/40">
      <div className="mx-auto h-screen w-full border-border/40 min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <HomeLayoutHeader />
        <main className="flex-1 h-[calc(100%-58px)]">{children}</main>
      </div>
    </div>
  );
}
