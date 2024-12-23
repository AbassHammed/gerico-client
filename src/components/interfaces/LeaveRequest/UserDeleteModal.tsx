/* eslint-disable quotes */
'use client';

import { ConfirmationModal, IConfirmationModalProps } from '@/components/ui';
import { formatDate } from '@/components/ui/date-picker/shared';
import { useDeleteLeaveRequest } from '@/hooks/useFetchLeave';
import { ILeaveRequest } from '@/types';
import { fr } from 'date-fns/locale';
import dayjs from 'dayjs';
import { toast } from 'sonner';

import LeaveStatusBadge, { LeaveStatusEnum } from './LeaveStatusBadge';

const UserDeleteLeaveRequestModal: React.FC<
  Partial<IConfirmationModalProps> & {
    leaveRequest: ILeaveRequest;
    isOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;
  }
> = ({ leaveRequest, ...props }) => {
  const { deleteLeave, loading } = useDeleteLeaveRequest(leaveRequest.leave_request_id);

  const handleDelete = async () => {
    try {
      const res = await deleteLeave();
      toast.success(res);
      props.onConfirm?.();
    } catch (error: any) {
      toast.error(error.message);
      props.onCancel?.();
    }
  };

  return (
    <ConfirmationModal
      size="large"
      visible={props.isOpen}
      loading={loading}
      disabled={loading}
      title="Confirmation d'archivage"
      confirmLabel="Archiver"
      variant="warning"
      alert={{
        title: "Modification de l'état de la demande de congé",
        description: (
          <div>
            L'archivage d'un employé conservera son historique mais désactivera son accès au
            système. Cela inclut :
            <ul className="list-disc pl-4 my-2">
              <li>Date de début : {dayjs(leaveRequest.start_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Date de fin : {dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Motif : {leaveRequest.reason}</li>
              <li>
                Statut :{' '}
                <LeaveStatusBadge
                  status={
                    leaveRequest.request_status === 'approved'
                      ? LeaveStatusEnum.ACCEPTED
                      : leaveRequest.request_status === 'rejected'
                        ? LeaveStatusEnum.REFUSED
                        : LeaveStatusEnum.WAITING
                  }
                />
              </li>
            </ul>
            <p className="mt-4 text-foreground-lighter">
              Il est impossible pour le moment de modifier les informations d'une demande de congé.
              Il faudra la supprimer et en créer une nouvelle.
            </p>
          </div>
        ),
      }}
      onCancel={() => props.setIsDeleteModalOpen(false)}
      onConfirm={handleDelete}>
      <p className="text-sm text-foreground-light">
        Vous êtes sur le point de supprimer le congé du{' '}
        <span className="text-foreground">{`${formatDate(leaveRequest.start_date, fr, true)} au ${dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}`}</span>{' '}
        ?
      </p>
    </ConfirmationModal>
  );
};

export default UserDeleteLeaveRequestModal;
