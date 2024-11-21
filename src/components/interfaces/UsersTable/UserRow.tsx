'use client';

import { useUser } from '@/hooks/useUser';
import { IUser } from '@/types';
import { Badge, Table } from '@ui';
import { User, X } from 'lucide-react';

import { UserActions } from './UserActions';

export const UserRow = ({ member }: { member: IUser }) => {
  const { user } = useUser();

  return (
    <Table.tr>
      <Table.td>
        <div className="flex items-center space-x-4">
          <div>
            <div className="w-[40px] h-[40px] bg-surface-100 border border-overlay rounded-full text-foreground-lighter flex items-center justify-center">
              <User size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex item-center gap-x-2">
            <p className="text-foreground-light truncate">{`${member.last_name} ${member.first_name}`}</p>

            {member.email === user?.email && <Badge color="scale">Vous</Badge>}
          </div>
        </div>
      </Table.td>

      <Table.td>
        <Badge variant={'warning'}>{'Invited'}</Badge>
      </Table.td>

      <Table.td>
        <div className="flex items-center justify-center">
          <X className="text-foreground-light" strokeWidth={1.5} size={20} />
        </div>
      </Table.td>

      <Table.td className="max-w-64">
        <div className="flex items-center gap-x-2">
          <p>{member.job_title}</p>
        </div>
      </Table.td>

      <Table.td>{<UserActions member={member} />}</Table.td>
    </Table.tr>
  );
};
