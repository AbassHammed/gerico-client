'use client';

import React from 'react';

import { AppIcon } from '@/components/shared/app-icon';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/shared/sidebar';
import { CalendarFold, Plus, Users } from 'lucide-react';

const routes = [
  {
    title: 'Create an employee',
    url: '/dashboard/new',
    icon: Plus,
  },
  {
    title: 'Employees',
    url: '/dashboard/employees',
    icon: Users,
  },
  {
    title: 'Leave Requests',
    url: '#',
    icon: CalendarFold,
  },
];

export default function Page() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand-400 text-sidebar-primary-foreground">
                <AppIcon className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Gerico</span>
                <span className="truncate text-xs">Transport</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
