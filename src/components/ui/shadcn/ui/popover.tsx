/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverContentProps = {
  portal?: boolean;
  align?: 'center' | 'start' | 'end';
  sideOffset?: number;
} & React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, portal = false, ...props }, ref) => {
  const Portal = portal ? PopoverPrimitive.Portal : React.Fragment;
  return (
    <Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-md border border-overlay bg-overlay p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </Portal>
  );
});
PopoverContent.displayName = 'PopoverContent';

const PopoverSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} {...props} className={cn('w-full h-px bg-border-overlay', className)} />
  ),
);
PopoverSeparator.displayName = 'PopoverSeparator';

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverSeparator };
