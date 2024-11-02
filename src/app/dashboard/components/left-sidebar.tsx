'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { AppIcon } from '@/components/shared/app-icon';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
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
  const router = useRouter();
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="flex flex-row items-center justify-between">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <AppIcon className="size-6" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <SidebarTrigger className={`${state === 'collapsed' && 'hidden'} !size-8`} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton tooltip={item.title} onClick={() => router.push(item.url)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTrigger className={`hidden ${state === 'collapsed' && 'flex'}`} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
