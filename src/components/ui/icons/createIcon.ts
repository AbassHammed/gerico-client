/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  ReactSVG,
  RefAttributes,
  SVGProps,
} from 'react';

import { toKebabCase } from '@/lib/utils';

import defaultAttributes from './defaultAttributes';

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;

const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = '',
        children,
        ...rest
      },
      ref,
    ) =>
      createElement(
        'svg',
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
          className: ['lucide', `lucide-${toKebabCase(iconName)}`, className].join(' '),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
