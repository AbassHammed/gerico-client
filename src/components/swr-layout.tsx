'use client';

import { SWRConfig } from 'swr';

interface SWRLayoutProps {
  children: React.ReactNode;
}

const SWRLayout: React.FC<SWRLayoutProps> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json()),
    }}>
    {children}
  </SWRConfig>
);

export default SWRLayout;
