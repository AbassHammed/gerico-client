'use client';

import Link from 'next/link';

import { EmployeePresence } from '@/components/interfaces/Auth/LeaveChart';
import { generateToolRoutes } from '@/components/layouts/DashboardLayout/NavigationBar/NavigationBar.utils';
import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { useCompanyInfo } from '@/hooks/company-mutations';

export default function dashboardPage() {
  const { companyInfo } = useCompanyInfo();

  const companyName = companyInfo?.name ?? siteConfig.name;
  return (
    <div className="w-full mx-auto my-16 space-y-16 max-w-7xl">
      <div className="flex items-center justify-between mx-6 space-x-6">
        <div className="flex flex-row items-center gap-3">
          <h1 className="text-3xl">{companyName}</h1>
        </div>
      </div>

      <div className="mx-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-20">
          <div className="col-span-12">
            <div className="flex flex-col space-y-20">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl text-foreground">
                    Bienvenue sur le tableau de bord Gerico Transport
                  </h3>
                  <p className="text-base text-foreground-light">
                    Your project has been deployed on its own instance, with its own API all set up
                    and ready to use.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col justify-center space-y-8 lg:col-span-7">
                  <div className="space-y-2">
                    <h3 className="text-xl text-foreground">
                      Gérez vos employés et vos données facilement
                    </h3>
                    <p className="text-base text-foreground-light">
                      Utilisez les options ci-dessus pour gérer l'ensemble des employés, créer de
                      nouveaux employés, générer des bulletins de paie, consulter la liste des
                      bulletins ou approuver les demandes de congé. Tout est à portée de main pour
                      simplifier vos opérations.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {generateToolRoutes().map((route, idx) => (
                      <Button asChild type={'default'} key={idx} icon={route.icon}>
                        <Link href={route.link!}>{route.label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:grid lg:col-span-5">{<EmployeePresence />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
