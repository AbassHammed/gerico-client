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
