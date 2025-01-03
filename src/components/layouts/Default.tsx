/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { cn } from '@/lib/utils';

import Nav from '../Nav';
import Footer from '../shared/Footer';

type Props = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
  footerClassName?: string;
  children: React.ReactNode;
};

const DefaultLayout = (props: Props) => {
  const {
    hideHeader = false,
    hideFooter = false,
    className = '',
    footerClassName = '',
    children,
  } = props;

  return (
    <>
      <Nav hideNavbar={hideHeader} />
      <main className={cn('relative min-h-screen', className)}>{children}</main>
      <Footer className={footerClassName} hideFooter={hideFooter} />
    </>
  );
};

export default DefaultLayout;
