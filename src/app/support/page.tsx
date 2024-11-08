import { Metadata } from 'next';
import Image from 'next/legacy/image';

import { SupportForm } from '@/components/interfaces/support/supportForm';

export const metadata: Metadata = {
  title: 'Support',
};

const SupportPage = () => (
  <div className="relative flex overflow-y-auto overflow-x-hidden">
    <div className="mx-auto my-8 max-w-2xl w-full px-4 lg:px-6">
      <div className="space-y-12 py-8">
        <div className="flex flex-col  justify-start items-start sm:items-center gap-y-2">
          <div className="flex items-center space-x-3">
            <Image src={`/app/gerico-logo-icon.svg`} width={20} height={20} priority />
            <h1 className="m-0 text-lg">Gérico support</h1>
          </div>
        </div>

        <div
          className={
            'min-w-full w-full space-y-12 rounded border bg-white shadow-md py-8 border-border'
          }>
          <SupportForm />
        </div>
      </div>
    </div>
  </div>
);

export default SupportPage;
