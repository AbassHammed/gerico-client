/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Children } from 'react';

const FormSection = ({
  children,
  id,
  header,
  disabled,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  header?: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  className?: string;
}) => {
  const classes = [
    'grid grid-cols-12 gap-6 px-8 py-8',
    `${disabled ? ' opacity-30' : ' opacity-100'}`,
    `${className}`,
  ];

  return (
    <div id={id} className={classes.join(' ')}>
      {header}
      {children}
    </div>
  );
};

const FormSectionLabel = ({
  children,
  className = '',
  description,
}: {
  children: React.ReactNode | string;
  className?: string;
  description?: React.ReactNode;
}) => {
  if (description !== undefined) {
    return (
      <div className={`flex flex-col space-y-2 col-span-12 lg:col-span-5 ${className}`}>
        <label className="text-foreground text-sm">{children}</label>
        {description}
      </div>
    );
  } else {
    return (
      <label className={`text-foreground col-span-12 text-sm lg:col-span-5 ${className}`}>
        {children}
      </label>
    );
  }
};

const Shimmer = () => (
  <div className="flex w-full flex-col gap-2">
    <div className="shimmering-loader h-2 w-1/3 rounded"></div>
    <div className="flex flex-col justify-between space-y-2">
      <div className="shimmering-loader h-[34px] w-2/3 rounded" />
    </div>
  </div>
);

const FormSectionContent = ({
  children,
  loading = true,
  fullWidth,
  className,
}: {
  children: React.ReactNode | string;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}) => (
  <div
    className={`
        relative col-span-12 flex flex-col gap-6 lg:col-span-7
        ${fullWidth && '!col-span-12'}
        ${className}
      `}>
    {loading ? Children.map(children, () => <Shimmer />) : children}
  </div>
);

export { FormSection, FormSectionContent, FormSectionLabel };
