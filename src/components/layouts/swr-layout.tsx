/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { SWRConfig } from 'swr';

interface SWRLayoutProps {
  children: React.ReactNode;
}

const SWRLayout: React.FC<SWRLayoutProps> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json()),
      revalidateOnFocus: false,
    }}>
    {children}
  </SWRConfig>
);

export default SWRLayout;
