/* eslint-disable indent */
'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';

import { Loading, Table } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Button as Button_Shadcn } from '@/components/ui/shadcn/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/ui/popover';
import { useEmployees } from '@/hooks/useEmployees';
import { IUser } from '@/types';
import { AlertCircle, ChevronDown, X } from 'lucide-react';

interface UserSelectProps {
  onUsersChange: (users: string) => void;
  setSelectedUser: Dispatch<SetStateAction<IUser | undefined>>;
  selectedUser: IUser | undefined;
  loading?: boolean;
}

export function MyUser({
  user,
  removeUser,
  loading,
}: {
  user: IUser;
  removeUser: () => void;
  loading?: boolean;
}) {
  return (
    <Table.tr>
      <Table.td>
        <div className="flex items-center space-x-4">
          <div>
            <Image
              alt={user.first_name}
              src={`https://avatar.vercel.sh/${user.uid}.png?size=80`}
              width="40"
              height="40"
              className="border rounded-full"
            />
          </div>
          <div className="flex item-center gap-x-2">
            <p className="text-foreground-light truncate">{`${user.last_name} ${user.first_name}`}</p>
          </div>
        </div>
      </Table.td>
      <Table.td align="right">
        <Button
          size={'small'}
          type={'default'}
          disabled={loading}
          onClick={() => removeUser()}
          aria-label={`Remove ${user.last_name}`}>
          <X className="h-4 w-4" />
        </Button>
      </Table.td>
    </Table.tr>
  );
}

export default function UserSelect({
  onUsersChange,
  selectedUser,
  setSelectedUser,
  loading,
}: UserSelectProps) {
  const { employees: members, isLoading: isLoadingMembers } = useEmployees();
  const [open, setOpen] = useState(false);

  const removeUser = () => {
    onUsersChange('');
    setSelectedUser(undefined);
  };

  const addUser = (user: IUser) => {
    onUsersChange(user.uid);
    setSelectedUser(user);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button_Shadcn
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={selectedUser !== undefined || loading}
            className="w-full justify-between bg-alternative dark:bg-muted  hover:bg-selection
          border-strong hover:border-stronger">
            Search for a User to link to...
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button_Shadcn>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-40rem)]  p-0">
          <Loading active={isLoadingMembers}>
            <Command>
              <CommandInput placeholder="Search for a User to link to..." />
              <CommandList>
                {members?.map(user => (
                  <CommandItem key={user.uid} onSelect={() => addUser(user)}>
                    {user.first_name} {user.last_name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </Loading>
        </PopoverContent>
      </Popover>

      <div className="mt-4 table-container">
        <div className="rounded w-full">
          <Table
            head={[<Table.th key="header-user">User</Table.th>, <Table.th key="header-action" />]}
            body={[
              ...(selectedUser === undefined
                ? [
                    <Table.tr key="no-results" className="bg-panel-secondary-light">
                      <Table.td colSpan={12}>
                        <div className="flex items-center space-x-3 opacity-75">
                          <AlertCircle size={16} strokeWidth={2} />
                          <p className="text-foreground-light">No users is selected</p>
                        </div>
                      </Table.td>
                    </Table.tr>,
                  ]
                : [
                    <MyUser
                      key={selectedUser.uid}
                      user={selectedUser}
                      removeUser={removeUser}
                      loading={loading}
                    />,
                  ]),
            ]}
          />
        </div>
      </div>
    </div>
  );
}
