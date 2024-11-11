import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Fades the panel and clicks are disabled
   */
  disabled?: boolean;
}

const FormPanelContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn('bg-surface-100 border overflow-hidden rounded-md shadow', props.className)}>
      {children}
    </div>
  ),
);

const FormPanelHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn('border-default border-b px-8 py-4', props.className)}>
      {children}
    </div>
  ),
);

const FormPanelContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn('divide-border flex flex-col gap-0', props.className)}>
      {children}
    </div>
  ),
);

const FormPanelFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn('border-t', props.className)}>
      {children}
    </div>
  ),
);

const FormPanel = ({ children, header, footer }: Props) => (
  <FormPanelContainer>
    {header && <FormPanelHeader>{header}</FormPanelHeader>}
    <FormPanelContent className="divide-y">{children}</FormPanelContent>
    {footer && <FormPanelFooter>{footer}</FormPanelFooter>}
  </FormPanelContainer>
);

export { FormPanel, FormPanelContainer, FormPanelContent, FormPanelHeader, FormPanelFooter };
