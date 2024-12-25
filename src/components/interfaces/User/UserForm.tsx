/* eslint-disable quotes */
'use client';

import { IUser } from '@/types';
import {
  Form,
  FormActions,
  FormField,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
  InputNumber,
  Toggle,
} from '@ui';

import {
  CivilityOptions,
  ContractTypeOptions,
  generateFormValues,
  MaritalStatusOptions,
  userSchema,
  UserSchemaType,
} from './UserForm.utils';

interface UserFormProps {
  isUpdatePage?: boolean;
  defaultUser?: IUser;
  onSubmit: (inputs: UserSchemaType, { resetForm }: any) => Promise<void> | void;
  isSubmitting: boolean;
}

const UserForm = ({ isUpdatePage = false, defaultUser, onSubmit, isSubmitting }: UserFormProps) => {
  const formId = 'auth-config-smtp-form';
  const initialValues = generateFormValues(defaultUser);

  return (
    <Form
      id={formId}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}>
      {({ handleReset, values, setFieldValue }: any) => {
        const hasChanges = JSON.stringify(values) !== JSON.stringify(initialValues);

        return (
          <>
            <FormPanel
              footer={
                <div className="flex py-4 px-8">
                  <FormActions
                    form={formId}
                    isSubmitting={isSubmitting}
                    hasChanges={hasChanges}
                    handleReset={handleReset}
                    disabled={isSubmitting}
                  />
                </div>
              }>
              <FormSection
                header={<FormSectionLabel>Informations personnelles</FormSectionLabel>}
                disabled={isSubmitting}>
                <FormSectionContent loading={false} fullWidth className="!gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      className="w-full"
                      name="civility"
                      properties={{
                        type: 'select',
                        title: 'Civilité',
                        enum: CivilityOptions,
                      }}
                      formValues={values}
                      disabled={isSubmitting}
                      setFieldValue={setFieldValue}
                    />
                    <Input
                      className="w-full"
                      name="first_name"
                      id="first_name"
                      label="Prénom"
                      placeholder="Jean"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      className="w-full"
                      name="last_name"
                      id="last_name"
                      label="Nom"
                      placeholder="Dupont"
                      disabled={isSubmitting}
                    />
                    <Input
                      className="w-full"
                      name="phone_number"
                      id="phone_number"
                      label="Téléphone"
                      placeholder="0652030882"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Input
                    name="email"
                    id="email"
                    label="Email"
                    placeholder="jean.dupont@exemple.fr"
                    disabled={isSubmitting}
                  />
                  <Input
                    name="social_security_number"
                    id="social_security_number"
                    label="Numéro de sécurité sociale"
                    placeholder="1 85 12 75 108 222"
                    disabled={isSubmitting || isUpdatePage}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Informations professionnelles</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false} fullWidth>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      className="w-full"
                      name="job_title"
                      id="job_title"
                      label="Poste"
                      placeholder="Responsable commercial"
                      disabled={isSubmitting}
                    />
                    <Input
                      className="w-full"
                      name="job_department"
                      id="job_department"
                      label="Service"
                      placeholder="Commercial"
                      disabled={isSubmitting}
                    />
                  </div>
                  <InputNumber
                    id="remaining_leave_balance"
                    name="remaining_leave_balance"
                    label="Solde de congés"
                    actions={<span className="mr-3 text-foreground-lighter">jours</span>}
                    disabled={isSubmitting || isUpdatePage}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection header={<FormSectionLabel>Adresse</FormSectionLabel>} disabled={false}>
                <FormSectionContent loading={false} fullWidth>
                  <Input
                    name="address_line1"
                    id="address_line1"
                    label="Adresse"
                    placeholder="123 rue de la Paix"
                    disabled={isSubmitting}
                  />
                  <Input
                    name="address_line2"
                    id="address_line2"
                    label="Complément d'adresse"
                    placeholder="Appartement 4B"
                    disabled={isSubmitting}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      id="city"
                      name="city"
                      label="Ville"
                      placeholder="Paris"
                      disabled={false}
                    />
                    <Input
                      id="postal_code"
                      name="postal_code"
                      label="Code postal"
                      placeholder="75000"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Input
                    id="country"
                    name="country"
                    label="Pays"
                    placeholder="France"
                    disabled={isSubmitting}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Informations contractuelles</FormSectionLabel>}>
                <FormSectionContent loading={false} fullWidth>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      name="contract_type"
                      properties={{
                        type: 'select',
                        title: 'Type de contrat',
                        enum: ContractTypeOptions,
                      }}
                      formValues={values}
                      disabled={isSubmitting}
                      setFieldValue={setFieldValue}
                    />

                    <FormField
                      name="marital_status"
                      properties={{
                        type: 'select',
                        title: 'Situation familiale',
                        enum: MaritalStatusOptions,
                      }}
                      formValues={values}
                      disabled={isSubmitting}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <InputNumber
                    id="dependants"
                    size="small"
                    label="Personnes à charge"
                    descriptionText="Nombre d'enfants à charge"
                    disabled={isSubmitting}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection header={<FormSectionLabel>Dates importantes</FormSectionLabel>}>
                <FormSectionContent loading={false} fullWidth>
                  <FormField
                    name="date_of_birth"
                    properties={{
                      type: 'datetime',
                      title: 'Date de naissance',
                    }}
                    formValues={values}
                    disabled={isSubmitting}
                    setFieldValue={setFieldValue}
                  />
                  <FormField
                    name="hire_date"
                    properties={{
                      type: 'datetime',
                      title: "Date d'embauche",
                    }}
                    formValues={values}
                    disabled={isSubmitting || isUpdatePage}
                    setFieldValue={setFieldValue}
                  />
                  <Toggle
                    id="is_admin"
                    size="small"
                    label="Droits administrateur"
                    layout="flex"
                    descriptionText="Accorder les droits d'administration à cet employé"
                    disabled={isSubmitting}
                  />
                </FormSectionContent>
              </FormSection>
            </FormPanel>
          </>
        );
      }}
    </Form>
  );
};

export default UserForm;
