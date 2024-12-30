import { ComponentProps, forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@ui';

export const NavigationIconButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof Button>,
    // omit other icon props to avoid confusion
    // using `icon` instead as there is only 1 use case for this component
    'iconRight' | 'iconLeft'
  > & {
    rightText?: ReactNode;
  }
>(({ icon, rightText, ...props }, ref) => (
  <Button
    ref={ref}
    type="text"
    size="tiny"
    {...props}
    className={cn(
      'h-10 [&>span]:relative [&>span]:items-center [&>span]:gap-3 [&>span]:flex [&>span]:w-full [&>span]:h-full p-0',
      props.className,
    )}>
    <div className="absolute left-2 text-foreground-lighter">{icon}</div>
    <span
      className={cn(
        'absolute left-7 md:left-10',
        'opacity-0 md:opacity-100',
        'w-[10rem] text-sm flex flex-col items-center',
        'transition-all',
      )}>
      <span className="w-full text-left text-foreground-light truncate">{props.children}</span>
    </span>
    {rightText && (
      <div
        className={cn(
          'absolute right-2 flex items-center',
          'opacity-0 transition-all',
          'md:opacity-100 ',
        )}>
        {rightText}
      </div>
    )}
  </Button>
));

NavigationIconButton.displayName = 'NavigationIconButton';
