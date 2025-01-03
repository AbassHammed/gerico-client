/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Link from 'next/link';

import SectionContainer from '@/components/shared/SectionContainer';
import { Button } from '@ui';

const Hero = () => (
  <div className="relative -mt-[65px]">
    <SectionContainer className="pt-8 pb-10 md:pt-16 overflow-hidden">
      <div className="relative">
        <div className="mx-auto">
          <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
            <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
              <div className="flex flex-col items-center">
                <h1 className="text-foreground text-3xl sm:text-5xl sm:leading-none lg:text-5xl">
                  <span className="block text-foreground">Entreprise logistique</span>
                  <span className="text-brand block md:ml-0">et transport routier</span>
                </h1>
                <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                  Spécialisés dans le transport routier de marchandises depuis{' '}
                  <span className="text-brand-300">1999</span>, nous offrons des solutions adaptées
                  aux besoins de chaque client.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="medium" className="text-white">
                  <Link href="/contact" as="/contact">
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  </div>
);

export default Hero;
