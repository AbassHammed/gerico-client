'use client';

/* eslint-disable indent */
import { useEmployees } from '@/hooks/useEmployees';
import { useUser } from '@/hooks/useUser';
import { GenericSkeletonLoader, Loading, Table } from '@ui';
import { AlertCircle } from 'lucide-react';

import { UserRow } from './UserRow';

export interface MembersViewProps {
  searchString: string;
}

const UsersView = ({ searchString }: MembersViewProps) => {
  const { user: profile } = useUser();
  const { employees: members, error: membersError, isLoading: isLoadingMembers } = useEmployees();

  const allMembers = members ?? [];
  const filteredMembers = !searchString
    ? allMembers
    : allMembers
        .filter(
          member =>
            member.last_name.toLowerCase().includes(searchString.toLowerCase()) ||
            member.first_name.toLowerCase().includes(searchString.toLowerCase()) ||
            member.email.toLowerCase().includes(searchString.toLowerCase()),
        )
        .slice()
        .sort((a, b) => a.last_name.localeCompare(b.last_name));

  return (
    <>
      {isLoadingMembers && <GenericSkeletonLoader />}

      {/* {isErrorMembers && (
        <AlertError error={membersError} subject="Failed to retrieve organization members" />
      )} */}

      {!membersError && !isLoadingMembers && profile && (
        <div className="rounded w-full">
          <Loading active={!filteredMembers}>
            <Table
              head={[
                <Table.th key="header-user">User</Table.th>,
                <Table.th key="header-status" className="w-24" />,
                <Table.th key="header-mfa" className="text-center w-32">
                  Enabled MFA
                </Table.th>,
                <Table.th key="header-role" className="flex items-center space-x-1">
                  <span>Role</span>
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
