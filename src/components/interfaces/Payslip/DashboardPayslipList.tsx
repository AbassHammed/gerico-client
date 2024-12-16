'use client';

import { useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import {
  AlertError,
  Button,
  FormHeader,
  GenericSkeletonLoader,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
  Table,
} from '@/components/ui';
import { useEmployees } from '@/hooks/useEmployees';
import { usePayslipsQuery } from '@/hooks/usePayslips';
import { formatLastName, shortenCivility } from '@/lib/utils';
import { IPayslip } from '@/types';
import { endOfDay, isAfter, startOfDay, subDays } from 'date-fns';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Download, Eye, FileText } from 'lucide-react';

import PayslipListHeader from './Header';
import { filterPayslips } from './Payslip.utils';
import PaySlipBadge, { PayslipStatus } from './PayslipBadge';

const PAGE_LIMIT = 10;

type PayslipWithUserInfo = IPayslip & {
  first_name: string;
  last_name: string;
  civility: string;
};

const DashboardPayslipList = () => {
  const { employees, isLoading: employeesLoading, error: employeesError } = useEmployees();
  const [page, setPage] = useState(1);

  const offset = (page - 1) * PAGE_LIMIT;

  const {
    payslips: data,
    pagination,
    isLoading: payslipLoading,
    error: payslipError,
    isSuccess,
  } = usePayslipsQuery({ page, limit: PAGE_LIMIT, offset });

  const searchParams = useSearchParams();

  const { start, end } = useMemo(() => {
    const hasRange = searchParams?.has('start') && searchParams?.has('end');

    return {
      start: hasRange
        ? startOfDay(new Date(searchParams?.get('start') || subDays(new Date(), 1)))
        : undefined,

      end: hasRange ? endOfDay(new Date(searchParams?.get('end') || new Date())) : undefined,
    };
  }, [searchParams?.get('start'), searchParams?.get('end')]);

  // Only set interval if start and end are not provided
  const interval = start || end ? undefined : (searchParams?.get('interval') ?? 'all');

  const payslips = data || [];
  const users = employees || [];

  const filteredPayslips = useMemo(
    () => filterPayslips(payslips, start, end, interval),
    [payslips, start, end, interval],
  );

  const payslipsWithUserInfo: PayslipWithUserInfo[] = useMemo(
    () =>
      filteredPayslips
        .map(payslip => {
          const user = users.find(user => user.uid === payslip.uid);
          if (user) {
            return {
              ...payslip,
              first_name: user.first_name,
              last_name: user.last_name,
              civility: user.civility,
            };
          }
          return undefined;
        })
        .filter((payslip): payslip is PayslipWithUserInfo => payslip !== undefined),
    [filteredPayslips, users],
  );

  return (
    <ScaffoldContainerLegacy className="gap-0">
      <div className="flex items-center justify-between">
        <FormHeader title="Fiches de paie" description="Retrouvez ici toutes les fiches de paie." />
      </div>
      {(employeesLoading || payslipLoading) && <GenericSkeletonLoader />}

      {(employeesError || payslipError) && (
        <AlertError
          error={employeesError || payslipError}
          subject="Erreur lors du chargement de la page"
        />
      )}

      {isSuccess && (
        <ScaffoldFilterAndContent>
          <ScaffoldActionsContainer className="justify-end">
            <PayslipListHeader startDate={start} endDate={end} interval={interval} />
          </ScaffoldActionsContainer>
          <ScaffoldSectionContent className="w-full">
            <Table
              head={[
                <Table.th key="header-icon"></Table.th>,
                <Table.th key="header-name">Nom</Table.th>,
                <Table.th key="header-date">Date</Table.th>,
                <Table.th key="header-amount">Montant (Net)</Table.th>,
                <Table.th key="header-status">Statut</Table.th>,
                <Table.th key="header-actions"></Table.th>,
              ]}
              body={
                payslipsWithUserInfo.length === 0 ? (
                  <Table.tr>
                    <Table.td colSpan={6} className="p-3 py-12 text-center">
                      {payslipLoading
                        ? 'Chargement des fiches de paie...'
                        : 'Aucune fiche de paie disponible pour le moment.'}
                    </Table.td>
                  </Table.tr>
                ) : (
                  <>
                    {payslipsWithUserInfo.map(payslip => (
                      <Table.tr key={payslip.pid}>
                        <Table.td>
                          <FileText size={24} />
                        </Table.td>
                        <Table.td>
                          <p>{`${shortenCivility(payslip.civility)} ${formatLastName(payslip.last_name)} ${payslip.first_name}`}</p>
                        </Table.td>
                        <Table.td>
                          <p>{dayjs(payslip.pay_date).format('MMM DD, YYYY')}</p>
                        </Table.td>
                        <Table.td>
                          <p>{payslip.net_salary} €</p>
                        </Table.td>
                        <Table.td>
                          <PaySlipBadge
                            status={
                              isAfter(new Date(payslip.pay_date), new Date())
                                ? PayslipStatus.NOTPAID
                                : PayslipStatus.PAID
                            }
                          />
                        </Table.td>
                        <Table.td className="align-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button type="outline" icon={<Eye size={16} strokeWidth={1.5} />} />
                            <Button
                              type="outline"
                              icon={<Download size={16} strokeWidth={1.5} />}
                              onClick={() => window.open(payslip.path_to_pdf, '_blank')}
                            />
                          </div>
                        </Table.td>
                      </Table.tr>
                    ))}
                    <Table.tr key="navigation">
                      <Table.td colSpan={6}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm opacity-50">
                            {`Showing ${offset + 1} to ${
                              offset + payslips.length
                            } out of ${pagination?.totalItems} payslips`}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button
                              icon={<ChevronLeft />}
                              type="default"
                              size="tiny"
                              disabled={page === 1}
                              onClick={async () => setPage(page - 1)}
                            />
                            <Button
                              icon={<ChevronRight />}
                              type="default"
                              size="tiny"
                              disabled={page * PAGE_LIMIT >= (pagination?.totalItems ?? 0)}
                              onClick={async () => setPage(page + 1)}
                            />
                          </div>
                        </div>
                      </Table.td>
                    </Table.tr>
                  </>
                )
              }
            />
          </ScaffoldSectionContent>
        </ScaffoldFilterAndContent>
      )}
    </ScaffoldContainerLegacy>
  );
};

export default DashboardPayslipList;