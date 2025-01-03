/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useCompanyInfo } from '@/hooks/company-mutations';
import { Form, FormPanel, FormSection, FormSectionContent, FormSectionLabel, Input } from '@ui';
import { noop } from 'lodash';

const GeneralSettings = () => {
  const { companyInfo } = useCompanyInfo();
  const formId = 'org-general-settings';

  return (
    <Form id={formId} initialValues={{}} onSubmit={noop}>
      {() => (
        <FormPanel>
          <FormSection header={<FormSectionLabel>Paramètres généraux</FormSectionLabel>}>
            <FormSectionContent loading={false}>
              <Input
                id="name"
                size="small"
                label="Nom de l'organisation"
                disabled
                value={companyInfo?.name}
              />
              <Input
                copy
                disabled
                id="siret"
                size="small"
                label="Siret"
                value={companyInfo?.siret}
              />
              <Input
                copy
                disabled
                id="code_ape"
                size="small"
                label="Code APE"
                value={companyInfo?.code_ape}
              />
              <Input
                copy
                disabled
                id="collective_convention"
                size="small"
                label="Convention collective"
                value={companyInfo?.collective_convention}
              />
            </FormSectionContent>
          </FormSection>
        </FormPanel>
      )}
    </Form>
  );
};

export default GeneralSettings;
