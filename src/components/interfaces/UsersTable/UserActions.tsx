'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IUser } from '@/types';
import {
  Button,
  ConfirmationModal,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui';
import { noop } from 'lodash';
import { MoreVertical, Trash } from 'lucide-react';

export const UserActions = ({ member }: { member: IUser }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const isLoading = false;

  return (
    <>
      <div className="flex items-center justify-end gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="text"
              className="px-1.5"
              disabled={isLoading}
              loading={isLoading}
              icon={<MoreVertical />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-52">
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/employees/${member.uid}/update`)}>
              <div className="flex flex-col">
                <p>Reset password</p>
                <p className="text-foreground-lighter">Set password to default.</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => noop(null)}>
              <div className="flex flex-col">
                <p>Resend welcome mail</p>
                <p className="text-foreground-lighter">
                  Resend welcome email with default password
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="space-x-2 items-start"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}>
              <Trash size={16} />
              <div className="flex flex-col">
                <p>Archive user</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmationModal
        size="large"
        visible={isDeleteModalOpen}
        // loading={isDeletingMember}
        title="Confirm to remove member"
        confirmLabel="Remove"
        variant="warning"
        alert={{
          title: 'All user content from this member will be permanently removed.',
          description: (
            <div>
              Removing a member will delete all of the user's saved content in all projects of this
              organization, which includes:
              <ul className="list-disc pl-4 my-2">
                <li>
                  SQL snippets{' '}
                  <span className="text-foreground">
                    (both <span className="underline">private</span> and{' '}
                    <span className="underline">shared</span> snippets)
                  </span>
                </li>
                <li>Custom reports</li>
                <li>Log Explorer queries</li>
              </ul>
              <p className="mt-4 text-foreground-lighter">
                If you'd like to retain the member's shared SQL snippets, right click on them and
                "Duplicate personal copy" in the SQL Editor before removing this member.
              </p>
            </div>
          ),
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          noop(null);
        }}>
        <p className="text-sm text-foreground-light">
          Are you sure you want to remove{' '}
          <span className="text-foreground">{`${member.civility} ${member.first_name} ${member.last_name}`}</span>{' '}
          from <span className="text-foreground">{''}</span>?
        </p>
      </ConfirmationModal>
    </>
  );
};
