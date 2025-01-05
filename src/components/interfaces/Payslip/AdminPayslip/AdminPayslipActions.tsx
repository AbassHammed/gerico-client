/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React from 'react';

import { Button } from '@/components/ui';
import { useDeletePayslip } from '@/hooks/usePayslips';
import { downloadFile } from '@/lib/utils';
import { PayslipWithUserInfo } from '@/types';
import { isBefore } from 'date-fns';
import { Download, Eye, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface AdminPayslipActionsProps {
  payslip: PayslipWithUserInfo;
  showPdf: ({ filePath, startPeriod }: { filePath: string; startPeriod: string | Date }) => void;
}

const AdminPasyslipActions: React.FC<AdminPayslipActionsProps> = ({ payslip, showPdf }) => {
  const { deletePayslip, loading } = useDeletePayslip(payslip.pid);
  const downloadFileName = `${payslip.first_name}_${payslip.last_name}_${payslip.start_period}.pdf`;

  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        type="outline"
        icon={<Eye size={16} strokeWidth={1.5} />}
        onClick={() =>
          showPdf({
            filePath: payslip.path_to_pdf,
            startPeriod: payslip.start_period,
          })
        }
        loading={loading}
        disabled={loading}
      />
      <Button
        type="outline"
        icon={<Download size={16} strokeWidth={1.5} />}
        onClick={() => downloadFile(payslip.path_to_pdf, downloadFileName)}
        loading={loading}
        disabled={loading}
      />
      <Button
        type="outline"
        onClick={async () => {
          try {
            const message = await deletePayslip();
            toast.success(message);
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
        disabled={loading || isBefore(new Date(), new Date(payslip.pay_date))}
        loading={loading}
        icon={<Trash size={16} strokeWidth={1.5} />}
      />
    </div>
  );
};

export default AdminPasyslipActions;
