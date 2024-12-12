'use client';

/* eslint-disable indent */
import { useState } from 'react';

import { useEmployees } from '@/hooks/useEmployees';
import { useUser } from '@/hooks/useUser';
import { IUser } from '@/types';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AlertError, Button, GenericSkeletonLoader, Loading, Table } from '@ui';
import { AlertCircle, ArrowDown, ArrowUp } from 'lucide-react';

import { UserRow } from './UserRow';

export interface MembersViewProps {
  searchString: string;
}

const UsersView = ({ searchString }: MembersViewProps) => {
  const { user: profile } = useUser();
  const { employees: members, error: membersError, isLoading: isLoadingMembers } = useEmployees();
  const [dateSortDesc, setDateSortDesc] = useState(true);

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
    .sort(sortByArchiveAndName);

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
                <Table.th key="header-user">User</Table.th>,
                <Table.th key="header-status" className="w-24" />,
                <Table.th key="header-hire-date">
                  <div className="flex items-center space-x-2">
                    <p>Hire Date</p>

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
                                {dateSortDesc ? 'Sort latest first' : 'Sort earliest first'}
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
                    <span>Role</span>
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
                              No users matched the search query "{searchString}"
                            </p>
                          </div>
                        </Table.td>
                      </Table.tr>,
                    ]
                  : []),
                <Table.tr key="footer" className="bg-panel-secondary-light">
                  <Table.td colSpan={12}>
                    <p className="text-foreground-light">
                      {searchString ? `${filteredMembers.length} of ` : ''}
                      {allMembers.length || '0'} {allMembers.length === 1 ? 'user' : 'users'}
                    </p>
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
