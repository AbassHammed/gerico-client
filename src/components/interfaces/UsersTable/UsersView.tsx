'use client';

/* eslint-disable indent */
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { useEmployees } from '@/hooks/useEmployees';
import { useUser } from '@/hooks/useUser';
import { PAGE_LIMIT } from '@/lib/constants';
import { IUser } from '@/types';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AlertError, Button, GenericSkeletonLoader, Loading, Table } from '@ui';
import { AlertCircle, ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

import { UserRow } from './UserRow';

export interface MembersViewProps {
  searchString: string;
}

const UsersView = ({ searchString }: MembersViewProps) => {
  const { user: profile } = useUser();
  const [dateSortDesc, setDateSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_LIMIT);

  const offset = (page - 1) * pageSize;

  const {
    employees: members,
    error: membersError,
    pagination,
    isLoading: isLoadingMembers,
  } = useEmployees({ page: page, limit: pageSize, offset });

  const allMembers = members ?? [];
  const sortByArchiveAndName = (a: IUser, b: IUser) => {
    // Compare archived status first
    if (a.is_archived !== b.is_archived) {
      return a.is_archived ? 1 : -1;
    }
    // If archive status is the same, sort by last name
    return a.last_name.localeCompare(b.last_name);
  };

  const matchesSearch = (member: IUser, search: string) => {
    const searchLower = search.toLowerCase();
    return [member.last_name, member.first_name, member.email].some(field =>
      field.toLowerCase().includes(searchLower),
    );
  };

  const filteredMembers = allMembers
    .filter(member => !searchString || matchesSearch(member, searchString))
    .sort(sortByArchiveAndName)
    .sort((a, b) =>
      dateSortDesc
        ? Number(new Date(b.hire_date)) - Number(new Date(a.hire_date))
        : Number(new Date(a.hire_date)) - Number(new Date(b.hire_date)),
    );
  return (
    <>
      {isLoadingMembers && <GenericSkeletonLoader />}

      {membersError && (
        <AlertError error={membersError} subject="Failed to retrieve organization members" />
      )}

      {!membersError && !isLoadingMembers && profile && (
        <div className="rounded w-full">
          <Loading active={!filteredMembers}>
            <Table
              head={[
                <Table.th key="header-user">Employé</Table.th>,
                <Table.th key="header-status" className="w-24" />,
                <Table.th key="header-hire-date">
                  <div className="flex items-center space-x-2">
                    <p>Date d'embauche</p>

                    <Tooltip.Root delayDuration={0}>
                      <Tooltip.Trigger asChild>
                        <Button
                          type="text"
                          className="px-1"
                          icon={
                            dateSortDesc ? (
                              <ArrowDown strokeWidth={1.5} size={14} />
                            ) : (
                              <ArrowUp strokeWidth={1.5} size={14} />
                            )
                          }
                          onClick={() => setDateSortDesc(!dateSortDesc)}
                        />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Portal>
                          <Tooltip.Content side="right">
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
                <Table.th key="header-role">
                  <div className="flex items-center space-x-2">
                    <span>Poste</span>
                  </div>
                </Table.th>,
                <Table.th key="header-action" />,
              ]}
              body={[
                ...filteredMembers.map(member => <UserRow key={member.uid} member={member} />),
                ...(searchString.length > 0 && filteredMembers.length === 0
                  ? [
                      <Table.tr key="no-results" className="bg-panel-secondary-light">
                        <Table.td colSpan={12}>
                          <div className="flex items-center space-x-3 opacity-75">
                            <AlertCircle size={16} strokeWidth={2} />
                            <p className="text-foreground-light">
                              Aucun employé ne correspond à la requête de recherche "{searchString}"
                            </p>
                          </div>
                        </Table.td>
                      </Table.tr>,
                    ]
                  : []),
                <Table.tr key="footer" className="bg-panel-secondary-light">
                  <Table.td colSpan={6}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm opacity-50">
                        {pagination?.totalItems
                          ? `Affichage de ${Math.min(offset + 1, pagination.totalItems)} à ${Math.min(offset + filteredMembers.length, pagination.totalItems)} sur ${pagination.totalItems} employés`
                          : 'Aucun employé trouvé'}
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
                </Table.tr>,
              ]}
            />
          </Loading>
        </div>
      )}
    </>
  );
};

export default UsersView;
