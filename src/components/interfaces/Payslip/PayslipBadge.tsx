'use client';

import { Badge } from '@/components/ui';
import * as Tooltip from '@radix-ui/react-tooltip';

export enum PayslipStatus {
  PAID = 'paid',
  NOTPAID = 'notpaid',
}

const payslipStatusMapping: Record<
  PayslipStatus,
  { label: string; badgeVariant: React.ComponentProps<typeof Badge>['variant'] }
> = {
  [PayslipStatus.PAID]: {
    label: 'Payé',
    badgeVariant: 'brand',
  },
  [PayslipStatus.NOTPAID]: {
    label: 'En cours',
    badgeVariant: 'warning',
  },
};

const PaySlipBadge = ({ status }: { status: PayslipStatus }) => {
  const statusMapping = payslipStatusMapping[status];

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger>
        <Badge
          size="small"
          className={`capitalize ${status === PayslipStatus.PAID ? 'text-white' : ''}`}
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
            {status === PayslipStatus.NOTPAID && (
              <p className="text-xs text-foreground">
                The invoice will soon be finalized and charged for.
              </p>
            )}

            {status === PayslipStatus.PAID && (
              <p className="text-xs text-foreground">The invoice has been paid successfully.</p>
            )}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default PaySlipBadge;