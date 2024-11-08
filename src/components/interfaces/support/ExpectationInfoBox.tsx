import { InformationBox } from '@ui';
import { AlertCircle } from 'lucide-react';

export const ExpectationInfoBox = () => (
  <InformationBox
    icon={<AlertCircle size={18} strokeWidth={2} />}
    defaultVisibility={true}
    hideCollapse={true}
    title="Please, make sure to include your first name, last name and as much information possible."
  />
);
