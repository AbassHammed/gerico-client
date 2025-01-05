/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useCallback, useMemo, useState } from 'react';

import { AlertError, Button, GenericSkeletonLoader, Table } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { useEmployees } from '@/hooks/useEmployees';
import { usePayslipsQuery } from '@/hooks/usePayslips';
import { PAGE_LIMIT } from '@/lib/constants';
import { formatLastName, shortenCivility } from '@/lib/utils';
import { PayslipWithUserInfo } from '@/types';
import { isAfter } from 'date-fns';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

import PaySlipBadge, { PayslipStatus } from '../PayslipBadge';
import PdfViewerModal from '../PayslipPDFModal';
import { filterPayslips } from './AdminPayslip.utils';
import AdminPasyslipActions from './AdminPayslipActions';

interface DashboardPayslipListProps {
  startDate?: Date;
  endDate?: Date;
  interval?: string;
}

const AdminPayslipList = ({ startDate, endDate, interval }: DashboardPayslipListProps) => {
  const { employees, isLoading: employeesLoading, error: employeesError } = useEmployees();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_LIMIT);
  const [pdfModal, setPdfModal] = useState<{
    isOpen: boolean;
    filePath: string;
    startPeriod: string | Date;
  }>({ isOpen: false, filePath: '', startPeriod: '' });

  const offset = (page - 1) * pageSize;

  const {
    payslips: data,
    pagination,
    isLoading: payslipLoading,
    error: payslipError,
    isSuccess,
  } = usePayslipsQuery({ page, limit: pageSize, offset });

  const showPdf = useCallback(
    ({ filePath, startPeriod }: { filePath: string; startPeriod: string | Date }) => {
      setPdfModal({ isOpen: true, filePath, startPeriod });
    },
    [],
  );

  const payslips = data || [];
  const users = employees || [];

  const filteredPayslips = useMemo(
    () => filterPayslips(payslips, startDate, endDate, interval),
    [payslips, startDate, endDate, interval],
  );

  const payslipsWithUserInfo: PayslipWithUserInfo[] = useMemo(
    () =>
      filteredPayslips
        .map(payslip => {
          const user = users.find(user => user.uid === payslip.uid);
          if (user) {
            return {
              ...user,
              ...payslip,
            };
          }
          return undefined;
        })
        .filter((payslip): payslip is PayslipWithUserInfo => payslip !== undefined),
    [filteredPayslips, users],
  );

  return (
    <>
      {(employeesLoading || payslipLoading) && <GenericSkeletonLoader />}

      {(employeesError || payslipError) && (
        <AlertError
          error={employeesError || payslipError}
          subject="Erreur lors du chargement de la page"
        />
      )}

      {!employeesLoading && !employeesError && isSuccess && (
        <>
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
                          isAdminPage
                        />
                      </Table.td>
                      <Table.td className="align-right">
                        <AdminPasyslipActions payslip={payslip} showPdf={showPdf} />
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
                              onValueChange={e => setPageSize(Number(e))}
                              value={pageSize.toString()}>
                              <SelectTrigger size="tiny" className="w-16">
                                <SelectValue placeholder={pageSize.toString()} />
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
                              disabled={page * pageSize >= (pagination?.totalItems ?? 0)}
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
          <PdfViewerModal
            isOpen={pdfModal.isOpen}
            setOpen={isOpen => setPdfModal(prev => ({ ...prev, isOpen }))}
            filePath={pdfModal.filePath}
            startPeriod={pdfModal.startPeriod}
          />
        </>
      )}
    </>
  );
};

export default AdminPayslipList;
