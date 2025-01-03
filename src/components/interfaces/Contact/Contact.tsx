/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import SectionContainer from '@/components/shared/SectionContainer';
import { cn } from '@/lib/utils';

interface Props {
  label?: string | React.ReactNode;
  h1: string | React.ReactNode;
  subheader?: string[] | React.ReactNode[];
  title?: string;
  image?: React.ReactNode;
  footer?: React.ReactNode;
  footerPosition?: 'bottom' | 'left';
  className?: string;
  sectionContainerClassName?: string;
}

const ContactContainer = (props: Props) => (
  <div
    className={cn(
      'w-full max-w-full relative mx-auto py-16 lg:py-24 border-b bg-alternative overflow-hidden',
      props.className,
    )}>
    <SectionContainer className={cn('!py-0 grid grid-cols-12', props.sectionContainerClassName)}>
      <div className="relative z-10 col-span-12 gap-8 lg:col-span-5 space-y-3">
        <div>
          {props.title && (
            <div className="mb-4 flex items-center gap-3">
              {props.title && (
                <span
                  className="text-brand-600 dark:text-brand font-mono uppercase"
                  key={`product-name-${props.title}`}>
                  {props.title}
                </span>
              )}
            </div>
          )}
          <h1 className="h1 text-3xl md:!text-4xl lg:!text-4xl 2xl:!text-4xl tracking-[-.15px]">
            {props.h1}
          </h1>
        </div>
        <div className="mt-4">
          {props.subheader &&
            props.subheader.map((subheader, i) => (
              <p className="p lg:text-lg max-w-lg lg:max-w-none" key={i}>
                {subheader}
              </p>
            ))}
        </div>

        {props.footer && props.footerPosition === 'left' && (
          <div className="ph-footer relative z-10 mt-4 md:mt-8 lg:mt-20 xl:mt-32 col-span-12">
            {props.footer}
          </div>
        )}
      </div>
      {props.image && (
        <div className="relative min-h-[300px] col-span-12 mt-8 lg:col-span-7 lg:mt-0 xl:col-span-6 xl:col-start-7">
          {props.image}
        </div>
      )}
      {props.footer && props.footerPosition !== 'left' && (
        <div className="relative z-10 mt-4 md:mt-8 lg:mt-20 xl:mt-32 col-span-12">
          {props.footer}
        </div>
      )}
    </SectionContainer>
  </div>
);

export default ContactContainer;
