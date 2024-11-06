'use client';

import { Calendar } from '@/components/ui/shadcn/ui/calendar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from '@/components/ui/shadcn/ui/sidebar';
import { fr } from 'date-fns/locale';
import Holidays from 'date-holidays';

function DatePicker() {
  const hd = new Holidays();
  hd.init('FR');

  const holidays = hd.getHolidays(new Date()).map(holiday => new Date(holiday.date));

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          modifiers={{ holidays }}
          modifiersClassNames={{ holidays: 'holiday' }}
          className="[&_[role=gridcell].bg-accent]:bg-brand-500 [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          disabled={date =>
            [0, 6].includes(date.getDay()) ||
            holidays.some(holiday => holiday.getTime() === date.getTime())
          }
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
      className="sticky hidden lg:flex top-0 h-svh border-l !w-[calc(var(--sidebar-width)_+_80px)]">
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
    </Sidebar>
  );
}
