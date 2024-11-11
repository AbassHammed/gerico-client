import {
  Form,
  FormActions,
  FormHeader,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
  InputNumber,
} from '@ui';

import { generateFormValues, userSchema, UserSchemaType } from './UserForm.utils';

const UserForm = () => {
  const formId = 'auth-config-smtp-form';
  const initialValues = generateFormValues();

  const onSubmit = (inputs: UserSchemaType) => {
    console.error(inputs);
  };

  return (
    <Form
      id={formId}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}>
      {({ handleReset, values }: any) => {
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
                    isSubmitting={false}
                    hasChanges={hasChanges}
                    handleReset={handleReset}
                    disabled={false}
                  />
                </div>
              }>
              <FormSection
                header={<FormSectionLabel>Personal details</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false}>
                  <Input
                    name="first_name"
                    id="first_name"
                    label="First name"
                    placeholder="Doe"
                    disabled={false}
                  />
                  <Input
                    name="last_name"
                    id="last_name"
                    label="Last name"
                    placeholder="John"
                    disabled={false}
                  />
                  <Input
                    name="phone_number"
                    id="phone_number"
                    label="Phone number"
                    placeholder="+33 65 75 85"
                    disabled={false}
                  />
                  <Input
                    name="email"
                    id="email"
                    label="Email"
                    placeholder="john.doe@example.com"
                    disabled={false}
                  />
                  <Input
                    name="social_security_number"
                    id="social_security_number"
                    label="Social security number"
                    placeholder="1 04 07 28 338 345"
                    disabled={false}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Job details</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false}>
                  <Input
                    name="job"
                    id="job"
                    label="Job title"
                    placeholder="Manager"
                    disabled={false}
                  />
                  <Input
                    name="user_department"
                    id="user_department"
                    label="Employee Departement"
                    placeholder="UX/UI"
                    disabled={false}
                  />
                  <InputNumber
                    id="remaining_leave_balance"
                    name="remaining_leave_balance"
                    label="Remaining leave balance"
                    actions={<span className="mr-3 text-foreground-lighter">days</span>}
                    disabled={false}
                  />
                </FormSectionContent>
              </FormSection>

              <FormSection
                header={<FormSectionLabel>Address details</FormSectionLabel>}
                disabled={false}>
                <FormSectionContent loading={false}>
                  <Input
                    name="address_line1"
                    id="address_line1"
                    label="Street"
                    placeholder="123 example street"
                    disabled={false}
                  />
                  <Input
                    name="address_line2"
                    id="address_line2"
                    label="Extra"
                    placeholder="Appt 34"
                    disabled={false}
                  />
                  <Input id="city" name="city" label="City" disabled={false} />
                  <Input id="postal_code" name="postal_code" label="Postal code" disabled={false} />
                  <Input id="country" name="country" label="Country" disabled={false} />
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
