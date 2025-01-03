/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { ConfirmationModal, IConfirmationModalProps } from '@/components/ui';
import { formatDate } from '@/components/ui/date-picker/shared';
import { useUpdateLeaveRequest } from '@/hooks/useFetchLeave';
import { ILeaveRequest } from '@/types';
import dayjs from 'dayjs';
import { toast } from 'sonner';

import LeaveStatusBadge, { LeaveStatusEnum } from './LeaveStatusBadge';

const AdminHandleModal: React.FC<
  Partial<IConfirmationModalProps> & {
    leaveRequest: ILeaveRequest;
    isOpen: boolean;
    setIsHandleModalOpen: (open: boolean) => void;
  }
> = ({ leaveRequest, ...props }) => {
  const { updateLeave, loading } = useUpdateLeaveRequest(leaveRequest.leave_request_id);

  const handleAccept = async () => {
    try {
      const res = await updateLeave({
        ...leaveRequest,
        // this is a temporary fix to avoid the issue of the reason being null
        reason: leaveRequest.reason ?? 'Non spécifiée',
        request_status: LeaveStatusEnum.ACCEPTED,
      });
      toast.success('Demande acceptée avec succès.', { description: res });
      props.onConfirm?.();
    } catch (error: any) {
      toast.error(error.message);
      props.onCancel?.();
    }
  };

  const handleRefuse = async () => {
    try {
      const res = await updateLeave({
        ...leaveRequest,
        reason: leaveRequest.reason ?? 'Non spécifiée',
        request_status: LeaveStatusEnum.REFUSED,
      });
      toast.success('Demande refusée avec succès.', { description: res });
      props.onCancel?.();
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
      title="Gestion de la demande de congé"
      confirmLabel="Accepter"
      cancelLabel="Refuser"
      alert={{
        title: 'Détails de la demande de congé',
        description: (
          <div>
            Vous êtes sur le point de gérer la demande de congé avec les informations suivantes :
            <ul className="list-disc pl-4 my-2">
              <li>Date de début : {dayjs(leaveRequest.start_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Date de fin : {dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}</li>
              <li>Raison : {leaveRequest.reason ?? 'Non spécifiée'}</li>
              <li>Type de congé : {leaveRequest.leave_type}</li>
              <li>
                Statut actuel :{' '}
                <LeaveStatusBadge
                  status={leaveRequest.request_status as LeaveStatusEnum}
                  isAdminPage
                />
              </li>
            </ul>
            <p className="mt-4 text-foreground-lighter">
              Accepter ou refuser cette demande mettra à jour son statut dans le système.
            </p>
          </div>
        ),
      }}
      onCancel={() => props.setIsHandleModalOpen(false)}
      onCancelButtonClicked={() => {
        handleRefuse();
        props.onCancelButtonClicked?.();
        props.setIsHandleModalOpen(false);
      }}
      onConfirm={() => {
        handleAccept();
        props.onConfirm?.();
        props.setIsHandleModalOpen(false);
      }}>
      <p className="text-sm text-foreground-light">
        Voulez-vous accepter ou refuser la demande de congé couvrant la période du{' '}
        <span className="text-foreground">{`${formatDate(leaveRequest.start_date, true)} au ${dayjs(leaveRequest.end_date).format('DD MMM YYYY, HH:mm')}`}</span>{' '}
        ?
      </p>
    </ConfirmationModal>
  );
};

export default AdminHandleModal;
