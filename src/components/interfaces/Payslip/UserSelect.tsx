'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Table } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Button as Button_Shadcn } from '@/components/ui/shadcn/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/ui/popover';
import { IUser } from '@/types';
import { ChevronDown, X } from 'lucide-react';

import { mockUsers } from './data';

interface UserSelectProps {
  selectedUsersIds: string[];
  onUsersChange: (users: string[]) => void;
}

export function MyUser({ user, removeUser }: { user: IUser; removeUser: (id: string) => void }) {
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
          onClick={() => removeUser(user.uid)}
          aria-label={`Remove ${user.last_name}`}>
          <X className="h-4 w-4" />
        </Button>
      </Table.td>
    </Table.tr>
  );
}

export default function UserSelect({ selectedUsersIds, onUsersChange }: UserSelectProps) {
  const [users] = useState<IUser[]>(mockUsers);
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const removeUser = (id: string) => {
    onUsersChange(selectedUsersIds.filter(user => user !== id));
    setSelectedUsers(selectedUsers.filter(user => user.uid !== id));
  };

  const addUser = (user: IUser) => {
    if (!selectedUsersIds.some(p => p === user.uid)) {
      onUsersChange([...selectedUsersIds, user.uid]);
      setSelectedUsers([...selectedUsers, user]);
    }
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
            className="w-full justify-between">
            Search for a User to link to...
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button_Shadcn>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-6rem)]  p-0">
          <Command>
            <CommandInput placeholder="Search for a User to link to..." />
            <CommandList>
              {users
                .filter(user => !selectedUsers.some(su => su.uid === user.uid))
                .map(user => (
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
            head={[<Table.th key="header-user">User</Table.th>, <Table.th key="header-action" />]}
            body={[
              ...selectedUsers.map(user => (
                <MyUser key={user.uid} user={user} removeUser={removeUser} />
              )),

              <Table.tr key="footer" className="bg-panel-secondary-light">
                <Table.td colSpan={12}>
                  <p className="text-foreground-light">
                    {selectedUsers.length || '0'} {selectedUsers.length === 1 ? 'user' : 'users'}
                  </p>
                </Table.td>
              </Table.tr>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
