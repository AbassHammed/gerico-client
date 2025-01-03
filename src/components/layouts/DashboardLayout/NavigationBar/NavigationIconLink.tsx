/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {
  AnchorHTMLAttributes,
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
} from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { IRoute } from '@/types';
import { noop } from 'lodash';

interface NavigationIconButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  route: IRoute;
  isActive?: boolean;
}

const NavigationIconLink = forwardRef<HTMLAnchorElement, NavigationIconButtonProps>(
  ({ route, isActive = false, onClick = noop, ...props }, ref) => {
    const iconClasses = [
      'absolute left-0 top-0 flex rounded items-center h-10 w-10 items-center justify-center text-foreground-lighter', // Layout
      'group-hover/item:text-foreground-light',
      isActive && '!text-foreground',
      'transition-colors',
    ];

    const classes = [
      'relative',
      'h-10 w-10 md:w-full',
      'transition-all duration-200',
      'flex items-center rounded',
      'group-data-[state=collapsed]:justify-center',
      'md:-space-x-2',
      'hover:bg-surface-200',
      'group/item',
      `${isActive && '!bg-selection shadow-sm'}`,
    ];

    const LinkComponent = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<typeof Link>>(
      function LinkComponent(props, ref) {
        if (route.linkComponent && isValidElement(route.linkComponent)) {
          return cloneElement<any>(route.linkComponent, { ...props, ref });
        }

        return <Link ref={ref} {...props} />;
      },
    );

    const linkContent = (
      <LinkComponent
        role="button"
        aria-current={isActive}
        ref={ref}
        href={route.link || '#'} // Provide a fallback href
        {...props}
        onClick={e => {
          if (!route.link) {
            e.preventDefault(); // Prevent navigation if there's no link
          }
          onClick(e);
        }}
        className={cn(classes, props.className)}>
        <span id="icon-link" className={cn(...iconClasses)} {...props}>
          {route.icon}
        </span>
        <span
          className={cn(
            'min-w-[128px] text-sm text-foreground-light',
            'group-hover/item:text-foreground',
            'group-aria-current/item:text-foreground',
            'absolute left-7 md:left-12',
            'opacity-0 md:opacity-100',
            `${isActive && 'text-foreground hover:text-foreground'}`,
            'transition-all',
          )}>
          {route.label}
        </span>
      </LinkComponent>
    );

    return linkContent;
  },
);

NavigationIconLink.displayName = 'NavigationIconLink';
export default NavigationIconLink;
