import { forwardRef, Ref } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import footerData from '@/data/Footer';
import { cn } from '@/lib/utils';
import { IconDiscord, IconGitHubSolid, IconTwitterX, IconYoutubeSolid } from '@ui';

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer = forwardRef(
  ({ children, className, id }: Props, ref: Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      id={id}
      className={cn(
        `sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20`,
        className,
      )}>
      {children}
    </div>
  ),
);

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
            <div className="flex space-x-5">
              <a
                href="https://twitter.com/supabase"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Twitter</span>
                <IconTwitterX size={22} />
              </a>

              <a
                href="https://github.com/supabase"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">GitHub</span>
                <IconGitHubSolid size={22} />
              </a>

              <a
                href="https://discord.supabase.com/"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Discord</span>
                <IconDiscord size={22} />
              </a>

              <a
                href="https://youtube.com/c/supabase"
                className="text-foreground-lighter hover:text-foreground transition">
                <span className="sr-only">Youtube</span>
                <IconYoutubeSolid size={22} />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
          <small className="small">&copy; Supabase Inc</small>
          <div></div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
