import Link from 'next/link';

import { Alert_Shadcn, AlertDescription_Shadcn, AlertTitle_Shadcn, Button, WarningIcon } from '@ui';

export interface AlertErrorProps {
  subject?: string;
  error?: Error | null | string;
  className?: string;
}

const AlertError = ({ subject, error, className }: AlertErrorProps) => {
  const formattedErrorMessage =
    error instanceof Error
      ? error?.message?.includes('503')
        ? '503 Service Temporarily Unavailable'
        : error?.message
      : error;

  return (
    <Alert_Shadcn className={className} variant="warning" title={subject}>
      <WarningIcon className="h-4 w-4" strokeWidth={2} />
      <AlertTitle_Shadcn>{subject}</AlertTitle_Shadcn>
      <AlertDescription_Shadcn className="flex flex-col gap-3 break-words">
        <div>
          {error && <p className="text-left">Erreur: {formattedErrorMessage}</p>}
          <p className="text-left">
            Try refreshing your browser, but if the issue persists, please reach out to us via
            support.
          </p>
        </div>
        <div>
          <Button asChild type="warning">
            <Link href={'/support'}>Support</Link>
          </Button>
        </div>
      </AlertDescription_Shadcn>
    </Alert_Shadcn>
  );
};

export default AlertError;
