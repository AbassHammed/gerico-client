'use client';

import { useGetUser } from '@/hooks/getUser';
import { useCreateUser } from '@/hooks/useCreateUser';
import {
  Form,
  FormActions,
  FormField,
  FormHeader,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
  InputNumber,
  Toggle,
} from '@ui';
import { toast } from 'sonner';

import { generateFormValues, userSchema, UserSchemaType } from './UserForm.utils';

const ContractTypeOptions = [
  {
    label: 'CDI',
    value: 'CDI',
  },
  {
    label: 'CDD',
    value: 'CDD',
  },
  {
    label: 'Stage',
    value: 'stage',
  },
];

const MaritalStatusOptions = [
  {
    label: 'Marié',
    value: 'marié',
  },
  {
    label: 'Veuf',
    value: 'veuf',
  },
  {
    label: 'Divorcé',
    value: 'divorcé',
  },
  {
    label: 'Célibataire',
    value: 'célibataire',
  },
];

const CivilityOptions = [
  {
    label: 'Monsieur',
    value: 'mr',
  },
  {
    label: 'Madame',
    value: 'mme',
  },
  {
    label: 'Mademoiselle',
    value: 'ms',
  },
  {
    label: 'Autre',
    value: 'autre',
  },
];

const UserForm = () => {
  const formId = 'auth-config-smtp-form';
  const initialValues = generateFormValues();
  const { user } = useGetUser();
  const { createUser, loading } = useCreateUser();

  const onSubmit = async (inputs: UserSchemaType, { resetForm }: any) => {
    // this will probably never happen since the user is required to be connected to access this page
    if (!user) {
      toast.error('You are not connected');
      return;
    }

    try {
      const company_id = user.company_id;
      const message = await createUser({ ...inputs, company_id });
      toast.success(message);
      resetForm();
    } catch (error: any) {
      toast.error(`Failed to create user: ${error.message ? error.message : 'An error occurred'}`);
    }
  };

  return (
    <Form
      id={formId}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}>
      {({ handleReset, values, setFieldValue }: any) => {
        const hasChanges = JSON.stringify(values) !== JSON.stringify(initialValues);
        // console.error(values);

        return (
          <>
            <FormHeader title="Create Employee" description="Alot of stuff to do here." />
            <FormPanel
              footer={
                <div className="flex py-4 px-8">
                  <FormActions
                    form={formId}
                    isSubmitting={loading}
                    hasChanges={hasChanges}
                    handleReset={handleReset}
                    disabled={loading}
                  />
                </div>
              }>
              <FormSection
                header={<FormSectionLabel>Personal details</FormSectionLabel>}
                disabled={loading}>
                <FormSectionContent loading={false} fullWidth className="!gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      className="w-full"
                      name="civility"
                      properties={{
                        type: 'select',
                        title: 'Civility',
                        enum: CivilityOptions,
                      }}
                      formValues={values}
                      disabled={loading}
                      setFieldValue={setFieldValue}
                    />
                    <Input
                      className="w-full"
                      name="first_name"
                      id="first_name"
                      label="First name"
                      placeholder="Doe"
                      disabled={loading}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      className="w-full"
                      name="last_name"
                      id="last_name"
                      label="Last name"
                      placeholder="John"
                      disabled={loading}
                    />
                    <Input
                      className="w-full"
                      name="phone_number"
                      id="phone_number"
                      label="Phone number"
                      placeholder="+33 65 75 85"
                      disabled={loading}
                    />
                  </div>
                  <Input
                    name="email"
                    id="email"
                    label="Email"
                    placeholder="john.doe@example.com"
                    disabled={loading}
                  />
                  <Input
                    name="social_security_number"
                    id="social_security_number"
                    label="Social security number"
                    placeholder="1 04 07 28 338 345"
                    disabled={loading}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Job details</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false} fullWidth>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      className="w-full"
                      name="job_title"
                      id="job_title"
                      label="Job title"
                      placeholder="Manager"
                      disabled={loading}
                    />
                    <Input
                      className="w-full"
                      name="job_department"
                      id="job_department"
                      label="Employee Departement"
                      placeholder="UX/UI"
                      disabled={loading}
                    />
                  </div>
                  <InputNumber
                    id="remaining_leave_balance"
                    name="remaining_leave_balance"
                    label="Remaining leave balance"
                    actions={<span className="mr-3 text-foreground-lighter">days</span>}
                    disabled={loading}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Address details</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false} fullWidth>
                  <Input
                    name="address_line1"
                    id="address_line1"
                    label="Street"
                    placeholder="123 example street"
                    disabled={loading}
                  />
                  <Input
                    name="address_line2"
                    id="address_line2"
                    label="Extra"
                    placeholder="Appt 34"
                    disabled={loading}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input id="city" name="city" label="City" disabled={false} />
                    <Input
                      id="postal_code"
                      name="postal_code"
                      label="Postal code"
                      disabled={loading}
                    />
                  </div>
                  <Input id="country" name="country" label="Country" disabled={loading} />
                </FormSectionContent>
              </FormSection>

              <FormSection header={<FormSectionLabel>Contract Details</FormSectionLabel>}>
                <FormSectionContent loading={false} fullWidth>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      name="contract_type"
                      properties={{
                        type: 'select',
                        title: 'Contract Type',
                        enum: ContractTypeOptions,
                      }}
                      formValues={values}
                      disabled={loading}
                      setFieldValue={setFieldValue}
                    />

                    <FormField
                      name="marital_status"
                      properties={{
                        type: 'select',
                        title: 'Marital Status',
                        enum: MaritalStatusOptions,
                      }}
                      formValues={values}
                      disabled={loading}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <InputNumber
                    id="dependants"
                    size="small"
                    label="Dependants"
                    descriptionText="How many children do you have."
                    disabled={loading}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection header={<FormSectionLabel>Refresh Tokens</FormSectionLabel>}>
                <FormSectionContent loading={false} fullWidth>
                  <Toggle
                    id="is_admin"
                    size="small"
                    label="Detect and revoke potentially compromised refresh tokens"
                    layout="flex"
                    descriptionText="Prevent replay attacks from potentially compromised refresh tokens. Recommendation: ON."
                    disabled={loading}
                  />
                  <FormField
                    name="date_of_birth"
                    properties={{
                      type: 'datetime',
                      title: 'Date of birth',
                    }}
                    formValues={values}
                    disabled={loading}
                    setFieldValue={setFieldValue}
                  />
                  <FormField
                    name="hire_date"
                    properties={{
                      type: 'datetime',
                      title: 'Hire date',
                    }}
                    formValues={values}
                    disabled={loading}
                    setFieldValue={setFieldValue}
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
