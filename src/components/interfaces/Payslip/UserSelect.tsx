/* eslint-disable indent */
'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';

import { Table } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Button as Button_Shadcn } from '@/components/ui/shadcn/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/ui/popover';
import { useEmployees } from '@/hooks/useEmployees';
import { IUser } from '@/types';
import { AlertCircle, ChevronDown, X } from 'lucide-react';

interface UserSelectProps {
  onUsersChange: (users: string[]) => void;
  selectedUsers: IUser[] | undefined;
  setSelectedUsers: Dispatch<SetStateAction<IUser[] | undefined>>;
  loading?: boolean;
}

function MyUser({
  user,
  removeUser,
  loading,
}: {
  user: IUser;
  removeUser: (uid: string) => void;
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
          onClick={() => removeUser(user.uid)}
          aria-label={`Remove ${user.last_name}`}>
          <X className="h-4 w-4" />
        </Button>
      </Table.td>
    </Table.tr>
  );
}

export default function UserSelect({
  onUsersChange,
  selectedUsers,
  setSelectedUsers,
  loading,
}: UserSelectProps) {
  const { employees: members } = useEmployees();
  const [open, setOpen] = useState(false);

  const removeUser = (uid: string) => {
    const updatedUsers = selectedUsers?.filter(user => user.uid !== uid);
    onUsersChange(updatedUsers?.map(user => user.uid) ?? []);
    setSelectedUsers(updatedUsers);
  };

  const addUser = (user: IUser) => {
    if (!selectedUsers?.some(selected => selected.uid === user.uid) && selectedUsers!.length < 5) {
      const updatedUsers = [...selectedUsers!, user];
      onUsersChange(updatedUsers.map(user => user.uid));
      setSelectedUsers(updatedUsers);
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button_Shadcn
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={loading}
            className="w-full justify-between bg-alternative dark:bg-muted  hover:bg-selection
          border-strong hover:border-stronger">
            Rechercher un emlployé
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button_Shadcn>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-40rem)]  p-0">
          <Command>
            <CommandInput placeholder="Rechercer un employé" />
            <CommandList>
              {members?.map(user => (
                <CommandItem key={user.uid} onSelect={() => addUser(user)}>
                  {user.first_name} {user.last_name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-4 table-container">
        <div className="rounded w-full">
          <Table
            head={[
              <Table.th key="header-user">Employé</Table.th>,
              <Table.th key="header-action" />,
            ]}
            body={
              selectedUsers?.length === 0 || !selectedUsers
                ? [
                    <Table.tr key="no-results" className="bg-panel-secondary-light">
                      <Table.td colSpan={12}>
                        <div className="flex items-center space-x-3 opacity-75">
                          <AlertCircle size={16} strokeWidth={2} />
                          <p className="text-foreground-light">Aucun employé sélectionné</p>
                        </div>
                      </Table.td>
                    </Table.tr>,
                  ]
                : selectedUsers.map(user => (
                    <MyUser
                      key={user.uid}
                      user={user}
                      removeUser={() => removeUser(user.uid)}
                      loading={loading}
                    />
                  ))
            }
          />
        </div>
      </div>
    </div>
  );
}
