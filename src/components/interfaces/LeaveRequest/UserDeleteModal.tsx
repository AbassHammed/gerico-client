/* eslint-disable quotes */
'use client';

import { ConfirmationModal, IConfirmationModalProps } from '@/components/ui';
import { formatDate } from '@/components/ui/date-picker/shared';
import { useDeleteLeaveRequest } from '@/hooks/useFetchLeave';
import { ILeaveRequest } from '@/types';
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
      title="Confirmation de suppression"
      confirmLabel="Supprimer"
      variant="destructive"
      alert={{
        title: "Suppression d'une demande de congé",
        description: (
          <div>
            La suppression d'une demande de congé effacera définitivement les informations suivantes
            :
            <ul className="list-disc pl-4 my-2">
              <li>Date de début : {dayjs(leaveRequest.start_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Date de fin : {dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Raison : {leaveRequest.reason ?? 'Non spécifiée'}</li>
              <li>
                Statut :{' '}
                <LeaveStatusBadge
                  status={leaveRequest.request_status as LeaveStatusEnum}
                  isAdminPage={false}
                />
              </li>
            </ul>
            <p className="mt-4 text-foreground-lighter">
              Cette action est irréversible. Pour effectuer une modification, il faudra soumettre
              une nouvelle demande après suppression.
            </p>
          </div>
        ),
      }}
      onCancel={() => props.setIsDeleteModalOpen(false)}
      onConfirm={() => {
        handleDelete();
        props.onConfirm?.();
        props.setIsDeleteModalOpen(false);
      }}>
      <p className="text-sm text-foreground-light">
        Vous êtes sur le point de supprimer la demande de congé couvrant la période du{' '}
        <span className="text-foreground">{`${formatDate(leaveRequest.start_date, true)} au ${dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}`}</span>
        . Cette action est définitive. Êtes-vous sûr de vouloir continuer ?
      </p>
    </ConfirmationModal>
  );
};

export default UserDeleteLeaveRequestModal;
