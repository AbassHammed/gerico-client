'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';

import { AlertError, Button, FilterPopover, ShimmeringLoader, Table } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeaveRequestQuery } from '@/hooks/useFetchLeave';
import { PAGE_LIMIT } from '@/lib/constants';
import { getWorkingDaysBetweenDates } from '@/lib/utils';
import { ILeaveRequest, IUser } from '@/types';
import * as Tooltip from '@radix-ui/react-tooltip';
import dayjs from 'dayjs';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

import AdminHandleModal from './AdminHandleModal';
import LeaveStatusBadge, { LeaveStatusEnum } from './LeaveStatusBadge';
import { LeaveStatus } from './UserLeaveTable';

type IUserAndILeaveRequest = ILeaveRequest & IUser;

const AdminLeaveTable = () => {
  const { employees, isLoading: employeesLoading, error: employeesError } = useEmployees();
  const [dateSortDesc, setDateSortDesc] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<ILeaveRequest>();
  const [filter, setFilter] = useState<string>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_LIMIT);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const offset = (page - 1) * pageSize;

  const {
    leaves: data,
    pagination,
    isLoading: leaveLoading,
    error: leaveError,
    isSuccess,
    mutate,
  } = useLeaveRequestQuery({ page: page, limit: pageSize, offset }, filter ?? '');

  const leaves = data ?? [];
  const users = employees ?? [];

  const sortedLeaves = leaves
    .sort((a, b) =>
      dateSortDesc
        ? Number(new Date(b.created_at)) - Number(new Date(a.created_at))
        : Number(new Date(a.created_at)) - Number(new Date(b.created_at)),
    )
    .filter(leave => {
      if (!filter) {
        return true;
      }
      return leave.request_status === filter;
    });

  const leavesWithUser: IUserAndILeaveRequest[] = useMemo(
    () =>
      sortedLeaves
        .map(leave => {
          const user = users.find(user => user.uid === leave.uid);
          if (user) {
            return {
              // there is something tricky here, both the user and the leave object have a created_at field, but we only want the leave one
              ...user,
              ...leave,
            };
          }
          return undefined;
        })
        .filter((payslip): payslip is IUserAndILeaveRequest => payslip !== undefined),
    [sortedLeaves, users],
  );

  return (
    <>
      <div className="space-y-4 flex flex-col">
        <div className="flex items-center justify-start">
          <div className="flex items-center space-x-2">
            <p className="text-xs prose">Filtrer par</p>
            <FilterPopover
              name="Statut"
              options={LeaveStatus}
              valueKey="value"
              labelKey="label"
              activeOption={filter}
              onSaveFilter={setFilter}
            />
          </div>
        </div>

        {(leaveLoading || employeesLoading) && (
          <div className="space-y-2">
            <ShimmeringLoader />
            <ShimmeringLoader className="w-3/4" />
            <ShimmeringLoader className="w-1/2" />
          </div>
        )}

        {(leaveError || employeesError) && (
          <AlertError error={leaveError || employeesError} subject="Failed to retrieve leaves" />
        )}

        {isSuccess && (
          <>
            {leaves.length === 0 ? (
              <div className="bg-surface-100 border rounded p-4 flex items-center justify-center">
                <p className="prose text-sm">Aucune demande de congé trouvée</p>
              </div>
            ) : leaves.length > 0 && sortedLeaves.length === 0 ? (
              <div className="bg-surface-100 border rounded p-4 flex items-center justify-center">
                <p className="prose text-sm">
                  Aucune demande de congé trouvée pour le statut sélectionné
                </p>
              </div>
            ) : (
              <Table
                head={[
                  <Table.th key="user" className="py-2">
                    Employé
                  </Table.th>,
                  <Table.th key="created_at" className="py-2">
                    <div className="flex items-center space-x-2">
                      <p>Date Demande</p>

                      <Tooltip.Root delayDuration={0}>
                        <Tooltip.Trigger asChild>
                          <Button
                            type="text"
                            className="px-1"
                            icon={
                              dateSortDesc ? (
                                <ArrowDown size={14} strokeWidth={1.5} />
                              ) : (
                                <ArrowUp size={14} strokeWidth={1.5} />
                              )
                            }
                            onClick={() => setDateSortDesc(!dateSortDesc)}
                          />
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Portal>
                            <Tooltip.Content sideOffset={5} side="right">
                              <Tooltip.Arrow className="radix-tooltip-arrow" />
                              <div
                                className={[
                                  'rounded bg-alternative py-1 px-2 leading-none shadow',
                                  'border border-background',
                                ].join(' ')}>
                                <span className="text-xs text-foreground">
                                  {dateSortDesc
                                    ? 'Trier par date croissante'
                                    : 'Trier par date décroissante'}
                                </span>
                              </div>
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </div>
                  </Table.th>,
                  <Table.th key="days" className="py-2">
                    Nombre de jours
                  </Table.th>,
                  <Table.th key="status" className="py-2">
                    Statut
                  </Table.th>,
                ]}
                body={
                  <>
                    {leavesWithUser.map(leave => (
                      <Table.tr
                        key={leave.leave_request_id}
                        onClick={() => {
                          setSelectedLeave(leave);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer hover:!bg-alternative transition duration-100">
                        <Table.td>
                          <div className="flex items-center space-x-4">
                            <div>
                              <Image
                                alt={leave.first_name}
                                src={`https://avatar.vercel.sh/${leave.uid}.png?size=80`}
                                width="40"
                                height="40"
                                className="border rounded-full"
                              />
                            </div>
                            <div className="flex item-center gap-x-2">
                              <p className="text-foreground-light truncate">{`${leave.last_name} ${leave.first_name}`}</p>
                            </div>
                          </div>
                        </Table.td>
                        <Table.td>{dayjs(leave.created_at).format('DD MMM YYYY, HH:mm')}</Table.td>
                        <Table.td>{`${getWorkingDaysBetweenDates(leave.start_date, leave.end_date)} jours`}</Table.td>
                        <Table.td>
                          <LeaveStatusBadge
                            status={leave.request_status as LeaveStatusEnum}
                            isAdminPage
                          />
                        </Table.td>
                      </Table.tr>
                    ))}

                    <Table.tr key="navigation">
                      <Table.td colSpan={6}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm opacity-50">
                            {pagination?.totalItems
                              ? `Affichage de ${Math.min(offset + 1, pagination.totalItems)} à ${Math.min(offset + leaves.length, pagination.totalItems)} sur ${pagination.totalItems} demandes de congé`
                              : 'Aucune demande de congé à afficher'}
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
                }
              />
            )}
          </>
        )}
      </div>
      {selectedLeave && (
        <AdminHandleModal
          leaveRequest={selectedLeave}
          isOpen={isModalOpen}
          setIsHandleModalOpen={setIsModalOpen}
          onCancelButtonClicked={mutate}
          onConfirm={mutate}
        />
      )}
    </>
  );
};

export default AdminLeaveTable;
