/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { cn } from '@/lib/utils';
import ReactMarkdown, { type Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props extends Omit<Options, 'children' | 'node'> {
  className?: string;
  content: string;
  extLinks?: boolean;
}

const Markdown = ({ className, content = '', extLinks = false, ...props }: Props) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h3: ({ children }) => <h3 className="mb-1">{children}</h3>,
      a: ({ children, href }) => (
        <a href={href} target={extLinks ? '_blank' : ''} rel={extLinks ? 'noreferre' : ''}>
          {children}
        </a>
      ),
    }}
    {...props}
    className={cn('prose text-sm', className)}>
    {content}
  </ReactMarkdown>
);

export { Markdown };
