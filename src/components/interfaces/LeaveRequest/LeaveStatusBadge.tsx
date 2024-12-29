'use client';

import { Badge } from '@/components/ui';
import * as Tooltip from '@radix-ui/react-tooltip';

export enum LeaveStatusEnum {
  ACCEPTED = 'approved',
  WAITING = 'pending',
  REFUSED = 'rejected',
}

const leaveStatusMapping: Record<
  LeaveStatusEnum,
  { label: string; badgeVariant: React.ComponentProps<typeof Badge>['variant'] }
> = {
  [LeaveStatusEnum.ACCEPTED]: {
    label: 'Accepté',
    badgeVariant: 'brand',
  },
  [LeaveStatusEnum.WAITING]: {
    label: 'En attente',
    badgeVariant: 'warning',
  },
  [LeaveStatusEnum.REFUSED]: {
    label: 'Refusé',
    badgeVariant: 'destructive',
  },
};

const LeaveStatusEnumBadge = ({
  status,
  isAdminPage,
}: {
  status: LeaveStatusEnum;
  isAdminPage: boolean;
}) => {
  const statusMapping = leaveStatusMapping[status];

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger>
        <Badge
          size="small"
          className={`${status === LeaveStatusEnum.ACCEPTED ? 'text-white' : ''}`}
          variant={statusMapping?.badgeVariant || 'default'}>
          {statusMapping?.label}
        </Badge>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="bottom">
          <Tooltip.Arrow className="radix-tooltip-arrow" />
          <div
            className={[
              'rounded bg-alternative py-1 px-2 leading-none shadow',
              'space-y-2 border border-background',
            ].join(' ')}>
            {status === LeaveStatusEnum.WAITING && (
              <p className="text-xs text-foreground">
                {isAdminPage ? 'La ' : 'Votre '} demande de congé est en attente d'approbation.
              </p>
            )}

            {status === LeaveStatusEnum.ACCEPTED && (
              <p className="text-xs text-foreground">
                {isAdminPage ? 'La ' : 'Votre '} demande de congé a été acceptée.
              </p>
            )}
            {status === LeaveStatusEnum.REFUSED && (
              <p className="text-xs text-foreground">
                {isAdminPage ? 'La ' : 'Votre '} demande de congé a été refusée.
              </p>
            )}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default LeaveStatusEnumBadge;
