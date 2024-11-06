'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { AppIcon } from '@/components/shared/app-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/shared/sidebar';
import TestAvatar from '@/components/shared/test-avatar';
import { IssueDialog } from '@/components/ui/issue-dialog';
import { IIssue } from '@/types';
import { CalendarFold, ChevronsUpDown, LogOut, Plus, Users } from 'lucide-react';

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

const issues = [
  {
    issue_id: '1',
    type: 'auth',
    priority: 'high',
    subject: 'Unable to login',
    description:
      'Users are reporting issues with the login process. They are unable to access their accounts.',
    solved: false,
    issue_date: '2023-05-15',
  },
  {
    issue_id: '2',
    type: 'leave',
    priority: 'normal',
    subject: 'Leave request not updating',
    description:
      'Employees are unable to submit new leave requests. The system is not updating the leave balance.',
    solved: false,
    issue_date: '2023-05-16',
  },
  {
    issue_id: '3',
    type: 'payslip',
    priority: 'average',
    subject: 'Incorrect overtime calculation',
    description:
      'The payslip generation system is incorrectly calculating overtime hours for some employees.',
    solved: false,
    issue_date: '2023-05-17',
  },
  {
    issue_id: '4',
    type: 'other',
    priority: 'normal',
    subject: 'Printer not responding',
    description:
      'The office printer on the 3rd floor is not responding to print requests from any computer.',
    solved: true,
    issue_date: '2023-05-18',
  },
] as IIssue[];

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
        <SidebarGroup>
          <SidebarGroupLabel>Issues</SidebarGroupLabel>
          <SidebarMenu>
            {issues.map(issue => (
              <SidebarMenuItem key={issue.issue_id}>
                <IssueDialog issue={issue} />
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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg items-center justify-center">
                    <TestAvatar className="h-6 w-6" />
                    {/* <span className="flex h-full w-full items-center justify-center rounded-lg bg-brand-500 text-white">
                      AH
                    </span> */}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Abass Hammed</span>
                    <span className="truncate text-xs">abasshammedola@gmail.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-primary-foreground">
                      <span className="text-sm font-medium">AH</span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Abass Hammed</span>
                      <span className="truncate text-xs">abasshammedola@gmail.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
