'use client';

import Image from 'next/image';

import { useUpcomingLeaveRequestsUser } from '@/hooks/useFetchLeave';
import { useUser } from '@/hooks/useUser';
import { isUserOnLeave } from '@/lib/utils';
import { IUser } from '@/types';
import { Badge, Table } from '@ui';

import { UserActions } from './UserActions';

export const UserRow = ({ member }: { member: IUser }) => {
  const { user } = useUser();
  const { leaves: data } = useUpcomingLeaveRequestsUser(member.uid);
  const leaves = data ?? [];
  const onLeave = isUserOnLeave(leaves);

  return (
    <Table.tr>
      <Table.td>
        <div className="flex items-center space-x-4">
          <div>
            <Image
              alt={member.first_name}
              src={`https://avatar.vercel.sh/${member.uid}.png?size=80`}
              width="40"
              height="40"
              className="border rounded-full"
            />
          </div>
          <div className="flex item-center gap-x-2">
            <p className="text-foreground-light truncate">{`${member.last_name} ${member.first_name}`}</p>

            {member.email === user?.email && (
              <Badge className="hidden lg:flex" color="scale">
                Vous
              </Badge>
            )}
          </div>
        </div>
      </Table.td>

      <Table.td>
        <Badge
          className={!onLeave && !member.is_archived ? 'text-white' : ''}
          variant={onLeave ? 'warning' : member.is_archived ? 'destructive' : 'brand'}>
          {onLeave ? 'Absent' : member.is_archived ? 'Archivé' : 'Actif'}
        </Badge>
      </Table.td>

      <Table.td>
        <div className="flex items-center">
          <p>
            {new Intl.DateTimeFormat('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: '2-digit',
            }).format(new Date(member.hire_date))}
          </p>
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
