import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/shared/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/shared/sidebar';
import { Separator } from '@radix-ui/react-separator';

import SidebarLeft from './components/left-sidebar';
import SidebarRight from './components/right-sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-sidebar border border-sidebar-border">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="md:hidden" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
