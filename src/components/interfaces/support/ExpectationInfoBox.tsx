import { InformationBox } from '@ui';
import { AlertCircle } from 'lucide-react';

export const ExpectationInfoBox = () => (
  <InformationBox
    icon={<AlertCircle size={18} strokeWidth={2} />}
    defaultVisibility={true}
    hideCollapse={true}
    title="Veuillez renseigner votre prénom, nom et fournir le plus de détails possible."
  />
);
