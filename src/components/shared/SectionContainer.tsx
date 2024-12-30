import { forwardRef, Ref } from 'react';

import { cn } from '@/lib/utils';

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

export default SectionContainer;
