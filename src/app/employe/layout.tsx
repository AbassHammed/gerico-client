import { HomeLayoutHeader } from '@/components/layouts/HomeLayout/homeLayoutHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="border-border/40">
      <div className="mx-auto h-screen w-full border-border/40 min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <HomeLayoutHeader />
        <main className="flex-1 h-[calc(100%-58px)]">{children}</main>
      </div>
    </div>
  );
}
