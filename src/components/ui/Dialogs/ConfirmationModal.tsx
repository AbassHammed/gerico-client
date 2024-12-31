'use client';

import { forwardRef, MouseEventHandler, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Admonition,
  Alert_Shadcn,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
} from '@ui';

export interface IConfirmationModalProps {
  loading?: boolean;
  visible: boolean;
  title: string | React.ReactNode;
  size?: React.ComponentProps<typeof DialogContent>['size'];
  confirmLabel?: string;
  confirmLabelLoading?: string;
  cancelLabel?: string;
  onCancelButtonClicked?: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
  variant?: React.ComponentProps<typeof Alert_Shadcn>['variant'];
  alert?: {
    base?: React.ComponentProps<typeof Alert_Shadcn>;
    title?: string;
    description?: string | React.ReactNode;
  };
}

const ConfirmationModal = forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof Dialog> & IConfirmationModalProps
>(
  (
    {
      title,
      size = 'small',
      visible,
      onCancel,
      onConfirm,
      onCancelButtonClicked,
      cancelLabel = 'Cancel',
      confirmLabel = 'Submit',
      alert = undefined,
      children,
      variant = 'default',
      disabled,
      ...props
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (visible) {
        setLoading(false);
      }
    }, [visible]);

    const onSubmit: MouseEventHandler<HTMLButtonElement> = e => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      onConfirm();
    };

    return (
      <Dialog
        open={visible}
        {...props}
        onOpenChange={() => {
          if (visible) {
            onCancel();
          }
        }}>
        <DialogContent ref={ref} className="p-0 gap-0 pb-5 !block" size={size}>
          <DialogHeader className={cn('border-b')} padding={'small'}>
            <DialogTitle className="">{title}</DialogTitle>
          </DialogHeader>
          {alert && (
            <Admonition
              type={variant as 'default' | 'destructive' | 'warning'}
              label={alert.title}
              description={alert.description}
              className="border-r-0 border-l-0 rounded-none -mt-px [&_svg]:ml-0.5 mb-0"
              {...alert?.base}
            />
          )}
          {children && (
            <>
              <DialogSection padding={'small'}>{children}</DialogSection>
              <DialogSectionSeparator />
            </>
          )}
          <div className="flex gap-2 px-5 pt-5">
            <Button
              size="medium"
              block
              type="default"
              disabled={loading}
              onClick={() => {
                onCancel();
                onCancelButtonClicked?.();
              }}>
              {cancelLabel}
            </Button>

            <Button
              block
              size="medium"
              type={
                variant === 'destructive' ? 'danger' : variant === 'warning' ? 'warning' : 'primary'
              }
              htmlType="submit"
              loading={loading}
              disabled={loading || disabled}
              onClick={onSubmit}
              className="truncate text-white">
              {confirmLabel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

ConfirmationModal.displayName = 'ConfirmationModal';

export default ConfirmationModal;
