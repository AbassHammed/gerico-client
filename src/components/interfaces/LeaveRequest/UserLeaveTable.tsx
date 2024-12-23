'use client';

import { useState } from 'react';

import { AlertError, Button, FilterPopover, ShimmeringLoader, Table } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { useLeaveRequestForUser } from '@/hooks/useFetchLeave';
import { getWorkingDaysBetweenDates } from '@/lib/utils';
import { ILeaveRequest } from '@/types';
import * as Tooltip from '@radix-ui/react-tooltip';
import dayjs from 'dayjs';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

import LeaveStatusBadge, { LeaveStatusEnum } from './LeaveStatusBadge';
import UserDeleteLeaveRequestModal from './UserDeleteModal';

const LeaveStatus = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const PAGE_LIMIT = 10;

const UserLeaveTable = () => {
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
  } = useLeaveRequestForUser({ page: page, limit: pageSize, offset });

  const leaves = data || [];
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

  return (
    <>
      <div className="space-y-4 flex flex-col">
        <div className="flex items-center justify-start">
          <div className="flex items-center space-x-2">
            <p className="text-xs prose">Filter by</p>
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

        {leaveLoading && (
          <div className="space-y-2">
            <ShimmeringLoader />
            <ShimmeringLoader className="w-3/4" />
            <ShimmeringLoader className="w-1/2" />
          </div>
        )}

        {leaveError && <AlertError error={leaveError} subject="Failed to retrieve leaves" />}

        {isSuccess && (
          <>
            {leaves.length === 0 ? (
              <div className="bg-surface-100 border rounded p-4 flex items-center justify-between">
                <p className="prose text-sm">You do not have any leave request available yet</p>
              </div>
            ) : leaves.length > 0 && sortedLeaves.length === 0 ? (
              <div className="bg-surface-100 border rounded p-4 flex items-center justify-between">
                <p className="prose text-sm">No leave request found for the filter applied</p>
              </div>
            ) : (
              <Table
                head={[
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
                  <Table.th key="start_date" className="py-2">
                    Début Congé
                  </Table.th>,
                  <Table.th key="end_date" className="py-2">
                    Fin Congé
                  </Table.th>,
                  <Table.th key="days" className="py-2">
                    Nombre de jours
                  </Table.th>,
                  <Table.th key="status" className="py-2">
                    Statut
                  </Table.th>,
                  <Table.th key="motif" className="py-2">
                    Motif
                  </Table.th>,
                ]}
                body={
                  <>
                    {sortedLeaves.map(leave => (
                      <Table.tr
                        key={leave.leave_request_id}
                        onClick={() => {
                          setSelectedLeave(leave);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer hover:!bg-alternative transition duration-100">
                        <Table.td>{dayjs(leave.created_at).format('DD MMM YYYY, HH:mm')}</Table.td>
                        <Table.td>{dayjs(leave.start_date).format('DD MMM YYYY, HH:mm')}</Table.td>
                        <Table.td>{dayjs(leave.end_date).format('DD MMM YYYY, HH:mm')}</Table.td>
                        <Table.td>{`${getWorkingDaysBetweenDates(leave.start_date, leave.end_date)} jours`}</Table.td>
                        <Table.td>
                          <LeaveStatusBadge
                            status={
                              leave.request_status === 'approved'
                                ? LeaveStatusEnum.ACCEPTED
                                : leave.request_status === 'rejected'
                                  ? LeaveStatusEnum.REFUSED
                                  : LeaveStatusEnum.WAITING
                            }
                          />
                        </Table.td>
                        <Table.td>{leave.leave_type}</Table.td>
                      </Table.tr>
                    ))}

                    <Table.tr key="navigation">
                      <Table.td colSpan={6}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm opacity-50">
                            {pagination?.totalItems
                              ? `Showing ${Math.min(offset + 1, pagination.totalItems)} to ${Math.min(offset + leaves.length, pagination.totalItems)} out of ${pagination.totalItems} payslips`
                              : 'No payslips to display'}
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
        <UserDeleteLeaveRequestModal
          leaveRequest={selectedLeave!}
          isOpen={isModalOpen}
          setIsDeleteModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default UserLeaveTable;
