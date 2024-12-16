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
import { usePayslipsQueryForUser } from '@/hooks/usePayslips';
import { useUser } from '@/hooks/useUser';
import { endOfDay, isAfter, startOfDay, subDays } from 'date-fns';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Download, Eye, FileText } from 'lucide-react';

import PayslipListHeader from './Header';
import { filterPayslips } from './Payslip.utils';
import PaySlipBadge, { PayslipStatus } from './PayslipBadge';
import PdfViewerModal from './PayslipPDFModal';

const PAGE_LIMIT = 10;

const UserPayslipList = () => {
  const { user, isLoading: userLoading, error: userError } = useUser();
  const [page, setPage] = useState(1);
  const [pdfModal, setPdfModal] = useState({ isOpen: false, filePath: '' });

  const offset = (page - 1) * PAGE_LIMIT;

  const {
    payslips: data,
    pagination,
    isLoading: payslipLoading,
    error: payslipError,
    isSuccess,
  } = usePayslipsQueryForUser(user?.uid!, { page, limit: PAGE_LIMIT, offset });

  const searchParams = useSearchParams();

  const showPdf = useCallback((filePath: string) => {
    setPdfModal({ isOpen: true, filePath });
  }, []);

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

  const filteredPayslips = useMemo(
    () => filterPayslips(payslips, start, end, interval),
    [payslips, start, end, interval],
  );

  const handlePrint = (pdfUrl: string) => {
    // Open the PDF in a new window
    const printWindow = window.open(pdfUrl, '_blank')!;

    // Wait for the PDF to load, then trigger the print dialog
    printWindow.onload = () => {
      printWindow.print();
      // Optionally, close the window after printing
      // printWindow.onafterprint = () => printWindow.close();
    };
  };

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
                          />
                        </Table.td>
                        <Table.td className="align-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              type="outline"
                              icon={<Eye size={16} strokeWidth={1.5} />}
                              onClick={() => showPdf(payslip.path_to_pdf)}
                            />
                            <Button
                              type="outline"
                              icon={<Download size={16} strokeWidth={1.5} />}
                              onClick={() => handlePrint(payslip.path_to_pdf)}
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
                              ? `Showing ${Math.min(offset + 1, pagination.totalItems)} to ${Math.min(offset + payslips.length, pagination.totalItems)} out of ${pagination.totalItems} payslips`
                              : 'No payslips to display'}
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
      <PdfViewerModal
        isOpen={pdfModal.isOpen}
        setOpen={isOpen => setPdfModal(prev => ({ ...prev, isOpen }))}
        filePath={pdfModal.filePath}
      />
    </ScaffoldContainerLegacy>
  );
};

export default UserPayslipList;