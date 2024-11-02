'use client';

import { Calendar } from '@/components/shared/calendar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from '@/components/shared/sidebar';
import { fr } from 'date-fns/locale';

function DatePicker() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          className="[&_[role=gridcell].bg-accent]:bg-brand-500 [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          disabled={date => [0, 6].includes(date.getDay())}
          locale={fr}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      {...props}
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l !w-[calc(var(--sidebar-width)_+_10px)]">
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
    </Sidebar>
  );
}
