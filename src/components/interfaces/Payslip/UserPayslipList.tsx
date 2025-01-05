/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useCallback, useMemo, useState } from 'react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { usePayslipsQueryForUser } from '@/hooks/usePayslips';
import { useUser } from '@/hooks/useUser';
import { PAGE_LIMIT } from '@/lib/constants';
import { downloadFile } from '@/lib/utils';
import { endOfDay, isAfter, startOfDay, subDays } from 'date-fns';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Download, Eye, FileText } from 'lucide-react';

import { filterPayslips } from './AdminPayslip/AdminPayslip.utils';
import PayslipListHeader from './Header';
import PaySlipBadge, { PayslipStatus } from './PayslipBadge';
import PdfViewerModal from './PayslipPDFModal';

const UserPayslipList = () => {
  const { user, isLoading: userLoading, error: userError } = useUser();
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
  const [pdfModal, setPdfModal] = useState<{
    isOpen: boolean;
    filePath: string;
    startPeriod: string | Date;
  }>({ isOpen: false, filePath: '', startPeriod: '' });

  const offset = (page - 1) * pageLimit;

  const {
    payslips: data,
    pagination,
    isLoading: payslipLoading,
    error: payslipError,
    isSuccess,
  } = usePayslipsQueryForUser(user?.uid!, { page, limit: pageLimit, offset });

  const searchParams = useSearchParams();

  const showPdf = useCallback(
    ({ filePath, startPeriod }: { filePath: string; startPeriod: string | Date }) => {
      setPdfModal({ isOpen: true, filePath, startPeriod });
    },
    [],
  );

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

  const payedPayslips = payslips.filter(
    payslip => !isAfter(new Date(payslip.pay_date), new Date()),
  );

  const filteredPayslips = useMemo(
    () => filterPayslips(payedPayslips, start, end, interval),
    [payedPayslips, start, end, interval],
  );

  return (
    <ScaffoldContainerLegacy className="gap-0">
      <div className="flex items-center justify-between">
        <FormHeader title="Fiches de paie" description="Retrouvez ici toutes vos fiches de paie." />
      </div>
      {(userLoading || payslipLoading) && <GenericSkeletonLoader />}

      {(userError || payslipError) && (
        <AlertError
          error={userError || payslipError}
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
                <Table.th key="header-date">Date</Table.th>,
                <Table.th key="header-amount">Montant (Net)</Table.th>,
                <Table.th key="header-status">Statut</Table.th>,
                <Table.th key="header-actions"></Table.th>,
              ]}
              body={
                filteredPayslips.length === 0 ? (
                  <Table.tr>
                    <Table.td colSpan={6} className="p-3 py-12 text-center">
                      {payslipLoading
                        ? 'Chargement des fiches de paie...'
                        : 'Aucune fiche de paie disponible pour cette période.'}
                    </Table.td>
                  </Table.tr>
                ) : (
                  <>
                    {filteredPayslips.map(payslip => (
                      <Table.tr key={payslip.pid}>
                        <Table.td>
                          <FileText size={24} />
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
                            isAdminPage={false}
                          />
                        </Table.td>
                        <Table.td className="align-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              type="outline"
                              icon={<Eye size={16} strokeWidth={1.5} />}
                              onClick={() =>
                                showPdf({
                                  filePath: payslip.path_to_pdf,
                                  startPeriod: payslip.pay_date,
                                })
                              }
                            />
                            <Button
                              type="outline"
                              icon={<Download size={16} strokeWidth={1.5} />}
                              onClick={() => downloadFile(payslip.path_to_pdf)}
                            />
                          </div>
                        </Table.td>
                      </Table.tr>
                    ))}
                    <Table.tr key="navigation">
                      <Table.td colSpan={6}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm opacity-50">
                            {pagination?.totalItems
                              ? `Affichage de ${Math.min(offset + 1, pagination.totalItems)} à ${Math.min(offset + filteredPayslips.length, pagination.totalItems)} sur un total de ${pagination.totalItems} bulletins de paie`
                              : 'Aucun bulletin de paie à afficher'}
                          </p>
                          <div className="flex items-center space-x-6 lg:space-x-8">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm opacity-50">Lignes par page</p>
                              <Select
                                onValueChange={e => setPageLimit(Number(e))}
                                value={pageLimit.toString()}>
                                <SelectTrigger size="tiny" className="w-16">
                                  <SelectValue placeholder={pageLimit.toString()} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                  {[10, 20, 50, 100].map(size => (
                                    <SelectItem key={size} value={size.toString()}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
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
                                disabled={page * pageLimit >= (pagination?.totalItems ?? 0)}
                                onClick={async () => setPage(page + 1)}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.td>
                    </Table.tr>
                  </>
                )
              }
            />
          </ScaffoldSectionContent>
          <PdfViewerModal
            isOpen={pdfModal.isOpen}
            setOpen={isOpen => setPdfModal(prev => ({ ...prev, isOpen }))}
            filePath={pdfModal.filePath}
            startPeriod={pdfModal.startPeriod}
          />
        </ScaffoldFilterAndContent>
      )}
    </ScaffoldContainerLegacy>
  );
};

export default UserPayslipList;
