/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Image from 'next/image';
import Link from 'next/link';

import footerData from '@/data/Footer';
import { cn } from '@/lib/utils';
import { IconTwitterX, IconYoutubeSolid } from '@ui';
import { Facebook, Instagram } from 'lucide-react';

import SectionContainer from './SectionContainer';

interface FooterProps {
  className?: string;
  hideFooter?: boolean;
}

const Footer = (props: FooterProps) => {
  if (props.hideFooter) {
    return null;
  }

  return (
    <footer className={cn('bg-alternative', props.className)} aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <SectionContainer className="py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="#" as="/" className="w-40">
              <Image
                src={'/app/gerico-logo-wordmark.svg'}
                width={160}
                height={30}
                alt="Gérico Logo"
                priority
              />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-8 ">
              {footerData.map(segment => (
                <div key={`footer_${segment.title}`}>
                  <h6 className="text-foreground overwrite text-base">{segment.title}</h6>
                  <ul className="mt-4 space-y-2">
                    {segment.links.map(({ ...link }, idx) => {
                      const children = (
                        <div
                          className={`text-sm transition-colors ${
                            link.url
                              ? 'text-foreground-lighter hover:text-foreground'
                              : 'text-muted hover:text-foreground-lighter'
                          } `}>
                          {link.text}
                        </div>
                      );

                      return (
                        <li key={`${segment.title}_link_${idx}`}>
                          {link.url &&
                            (link.url.startsWith('https') ? (
                              <a href={link.url}>{children}</a>
                            ) : (
                              <Link href={link.url}>{children}</Link>
                            ))}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-default mt-32 flex justify-between border-t pt-8">
          <small className="small">&copy; Gérico Transport</small>
          <div>
            <div className="flex space-x-5">
              <a
                href="https://twitter.com"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Twitter</span>
                <IconTwitterX size={22} />
              </a>

              <a
                href="https://facebook.com"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Facebook</span>
                <Facebook size={22} />
              </a>

              <a
                href="https://instagram.com/"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Instagram</span>
                <Instagram size={22} />
              </a>

              <a
                href="https://youtube.com/c/supabase"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Youtube</span>
                <IconYoutubeSolid size={22} />
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
