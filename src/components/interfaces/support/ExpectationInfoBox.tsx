/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
