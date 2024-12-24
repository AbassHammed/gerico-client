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
      label: 'Demandes de congé',
      href: PagesRoutes.Employee_LeaveRequest,
    },
    {
      label: 'Listes de congé',
      href: PagesRoutes.Employee_LeaveList,
    },
  ];
  return (
    <ScaffoldHeader className="pb-0">
      <ScaffoldContainer id="billing-page-top">
        <ScaffoldTitle className="pb-3">Editer une nouvelle fiche de paie</ScaffoldTitle>
        <NavMenu className="border-none" aria-label="Organization menu navigation">
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
