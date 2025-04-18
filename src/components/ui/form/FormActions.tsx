/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Button } from '@ui';

interface Props {
  form: React.HTMLProps<HTMLButtonElement>['form'];
  hasChanges: boolean | undefined; // Disables submit button if false
  handleReset: () => void; // Handling a reset/cancel of the form
  helper?: React.ReactNode; // Helper text to show alongside actions
  disabled?: boolean;
  isSubmitting?: boolean;
  submitText?: string;
}

const FormActions = ({
  form,
  hasChanges = undefined,
  handleReset,
  helper,
  disabled = false,
  isSubmitting,
  submitText = 'Sauvegarder',
}: Props) => {
  const isDisabled = isSubmitting || disabled || (!hasChanges && hasChanges !== undefined);

  return (
    <div
      className={[
        'flex w-full items-center gap-2',
        // justify actions to right if no helper text
        helper ? 'justify-between' : 'justify-end',
      ].join(' ')}>
      {helper && <span className="text-sm text-foreground-lighter">{helper}</span>}
      <div className="flex items-center gap-2">
        <Button disabled={isDisabled} type="default" htmlType="reset" onClick={() => handleReset()}>
          Annuler
        </Button>
        <Button
          form={form}
          className="text-white"
          type="primary"
          htmlType="submit"
          disabled={isDisabled}
          loading={isSubmitting}>
          {submitText}
        </Button>
      </div>
    </div>
  );
};

export { FormActions };
