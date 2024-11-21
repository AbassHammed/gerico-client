'use client';

import { useCompanyInfo } from '@/hooks/company-mutations';
import { useUser } from '@/hooks/useUser';
import { Form, FormPanel, FormSection, FormSectionContent, FormSectionLabel, Input } from '@ui';
import { noop } from 'lodash';

const GeneralSettings = () => {
  const { user } = useUser();
  const { companyInfo } = useCompanyInfo(user?.company_id ?? '');
  const formId = 'org-general-settings';

  return (
    <Form id={formId} initialValues={{}} onSubmit={noop}>
      {() => (
        <FormPanel>
          <FormSection header={<FormSectionLabel>General settings</FormSectionLabel>}>
            <FormSectionContent loading={false}>
              <Input
                id="name"
                size="small"
                label="Organization name"
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
                label="Collective convention"
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
