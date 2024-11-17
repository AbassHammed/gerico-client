import React from 'react';

import { Loader } from 'lucide-react';

import styleHandler from './theme/style-handler';

interface Props {
  children: React.ReactNode;
  active: boolean;
}
export default function Loading({ children, active }: Props) {
  const __styles = styleHandler('loading');

  const classNames = [__styles.base];

  const contentClasses = [__styles.content.base];

  if (active) {
    contentClasses.push(__styles.content.active);
  }

  const spinnerClasses = [__styles.spinner];

  return (
    <div className={classNames.join(' ')}>
      <div className={contentClasses.join(' ')}>{children}</div>
      {active && <Loader size={24} className={spinnerClasses.join(' ')} />}
    </div>
  );
}
