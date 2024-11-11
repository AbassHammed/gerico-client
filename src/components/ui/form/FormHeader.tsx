import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Markdown } from '@ui';
import ReactMarkdown from 'react-markdown';

const FormHeader = ({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) => (
  <div className={cn(`mb-6 flex items-center justify-between gap-x-4 ${className}`)}>
    <div className="space-y-1">
      <h3 className="text-foreground text-xl">
        <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
          {title}
        </ReactMarkdown>
      </h3>
      {description && <Markdown content={description} className="max-w-full" />}
    </div>
    <div className="flex items-center gap-x-2">{actions}</div>
  </div>
);

export { FormHeader };
