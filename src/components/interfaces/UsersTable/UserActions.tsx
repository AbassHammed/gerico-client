/* eslint-disable quotes */
'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useArchiveUser, useResendWelcomeEmail } from '@/hooks/admin-actions';
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
import { MoreVertical, Trash } from 'lucide-react';
import { toast } from 'sonner';

export const UserActions = ({ member }: { member: IUser }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { archive, loading } = useArchiveUser(member.uid);
  const { resendEmail, loading: resendLoading } = useResendWelcomeEmail(member.uid);

  const handleArchive = async () => {
    try {
      const res = await archive();
      toast.success(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleResendEmail = async () => {
    try {
      const res = await resendEmail();
      toast.success(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          <DropdownMenuContent side="bottom" align="end" className="w-60">
            <DropdownMenuItem>
              <Link href={`/dashboard/employees/${member.uid}/update`} className="flex flex-col">
                <p>Modifier les informations</p>
                <p className="text-foreground-lighter">Mettre à jour les données de l'employé</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleResendEmail} disabled={resendLoading}>
              <div className="flex flex-col">
                <p>Renvoyer l'email de bienvenue</p>
                <p className="text-foreground-lighter">
                  Renvoyer l'email avec les identifiants de connexion
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="space-x-2 items-start"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}>
              <Trash size={16} />
              <div className="flex flex-col">
                <p>Archiver l'employé</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmationModal
        size="large"
        visible={isDeleteModalOpen}
        loading={loading}
        disabled={member.is_archived}
        title="Confirmation d'archivage"
        confirmLabel="Archiver"
        variant="warning"
        alert={{
          title: "Les données de l'employé seront archivées.",
          description: (
            <div>
              L'archivage d'un employé conservera son historique mais désactivera son accès au
              système. Cela inclut :
              <ul className="list-disc pl-4 my-2">
                <li>L'historique des fiches de paie</li>
                <li>L'historique des congés</li>
                <li>Les documents administratifs</li>
              </ul>
              <p className="mt-4 text-foreground-lighter">
                L'employé ne pourra plus se connecter à son espace personnel après l'archivage. Ses
                données seront conservées conformément aux obligations légales.
              </p>
            </div>
          ),
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleArchive}>
        <p className="text-sm text-foreground-light">
          Êtes-vous sûr de vouloir archiver{' '}
          <span className="text-foreground">{`${member.civility} ${member.first_name} ${member.last_name}`}</span>{' '}
          ?
        </p>
      </ConfirmationModal>
    </>
  );
};
