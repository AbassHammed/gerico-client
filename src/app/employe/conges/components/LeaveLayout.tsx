/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavMenu,
  NavMenuItem,
  ScaffoldContainer,
  ScaffoldHeader,
  ScaffoldTitle,
} from '@/components/ui';
import { PagesRoutes } from '@/lib/constants';

const LeaveLayout = () => {
  const pathname = usePathname();

  const navMenuItems = [
    {
      label: 'Demande de congé',
      href: PagesRoutes.Employee_LeaveRequest,
    },
    {
      label: 'Liste de congé',
      href: PagesRoutes.Employee_LeaveList,
    },
  ];
  return (
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Demandes de congé</ScaffoldTitle>
        <NavMenu className="border-none" aria-label="leave-menu">
          {navMenuItems.map(item => (
            <NavMenuItem key={item.label} active={pathname === item.href}>
              <Link href={item.href}>{item.label}</Link>
            </NavMenuItem>
          ))}
        </NavMenu>
      </ScaffoldContainer>
    </ScaffoldHeader>
  );
};

export default LeaveLayout;
