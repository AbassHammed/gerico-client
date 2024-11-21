'use client';

import { useEffect } from 'react';

import { useCompanyInfo, useUpdateCompanyInfo } from '@/hooks/company-mutations';
import { useUser } from '@/hooks/useUser';
import { ICompanyInfo } from '@/types';
import {
  Form,
  FormActions,
  FormPanel,
  FormSection,
  FormSectionContent,
  Input,
  Listbox,
  ScaffoldSection,
  ScaffoldSectionContent,
  ScaffoldSectionDetail,
  ShimmeringLoader,
} from '@ui';
import { omit } from 'lodash';
import { toast } from 'sonner';

import { COUNTRIES } from './DashboardSettings.constants';

const AddressSettings = () => {
  const { user, isLoading, error } = useUser();
  const {
    companyInfo,
    loading: stillLoading,
    error: companyError,
    mutateCompanyInfo,
  } = useCompanyInfo(user?.company_id ?? '');

  const { updateCompany, loading } = useUpdateCompanyInfo();
  const formId = 'billing-address-form';
  const initialValues = omit(companyInfo, ['siret', 'code_ape', 'name', 'collective_convention']);

  const validate = (
    values: Omit<ICompanyInfo, 'siret' | 'code_ape' | 'name' | 'collective_convention'>,
  ) => {
    const errors = {} as any;
    if (
      (values.address_line1 || values.address_line2 || values.postal_code || values.city) &&
      !values.country
    ) {
      errors['country'] = 'Please select a country';
    }
    if (
      (values.country || values.address_line2 || values.postal_code || values.city) &&
      !values.address_line1
    ) {
      errors['address_line1'] = 'Please provide an address line';
    }
    return errors;
  };

  const onSubmit = async (
    values: Omit<ICompanyInfo, 'siret' | 'code_ape' | 'name' | 'collective_convention'>,
  ) => {
    const toastId = toast.loading('Updating address...');
    try {
      if (!companyInfo) {
        return;
      }

      const inputs = { ...companyInfo, ...values };
      const message = await updateCompany(inputs);
      toast.success(message, { id: toastId });
      mutateCompanyInfo();
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <ScaffoldSection>
      <ScaffoldSectionDetail>
        <div className="sticky space-y-2 top-12">
          <p className="text-foreground text-base m-0">Payslips Address</p>
          <p className="text-sm text-foreground-light m-0">
            This will be reflected in every upcoming payslips, past payslips are not affected
          </p>
        </div>
      </ScaffoldSectionDetail>
      <ScaffoldSectionContent>
        {stillLoading ||
          (isLoading && (
            <div className="space-y-2">
              <ShimmeringLoader />
              <ShimmeringLoader className="w-3/4" />
              <ShimmeringLoader className="w-1/2" />
            </div>
          ))}
        {!error && !companyError && companyInfo && (
          <Form
            validateOnBlur
            id={formId}
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}>
            {({ values, initialValues, handleReset, resetForm }: any) => {
              const hasChanges = JSON.stringify(values) !== JSON.stringify(initialValues);

              useEffect(() => {
                if (!companyError && companyInfo !== undefined) {
                  const { city, country, address_line1, address_line2, postal_code } =
                    companyInfo ?? {};
                  const values = { city, country, address_line1, address_line2, postal_code };
                  resetForm({ values, initialValues: values });
                }
              }, [companyError, companyInfo]);

              return (
                <FormPanel
                  footer={
                    <div className="flex py-4 px-8">
                      <FormActions
                        form={formId}
                        isSubmitting={loading}
                        hasChanges={hasChanges}
                        handleReset={handleReset}
                      />
                    </div>
                  }>
                  <FormSection>
                    <FormSectionContent fullWidth loading={false} className="!gap-2">
                      <Input
                        id="address_line1"
                        name="address_line1"
                        placeholder="Address line 1"
                        disabled={loading}
                      />
                      <Input
                        id="address_line2"
                        name="address_line2"
                        placeholder="Address line 2"
                        disabled={loading}
                      />
                      <div className="flex space-x-2">
                        <Input
                          className="w-full"
                          id="city"
                          name="city"
                          placeholder="City"
                          disabled={loading}
                        />
                        <Input
                          className="w-full"
                          id="postal_code"
                          name="postal_code"
                          placeholder="Postal code"
                          disabled={loading}
                        />
                      </div>

                      <Listbox
                        className="w-full"
                        id="country"
                        name="country"
                        placeholder="Country"
                        disabled={loading}>
                        <Listbox.Option label="---" key="empty" value="">
                          ---
                        </Listbox.Option>
                        {COUNTRIES.map(country => (
                          <Listbox.Option
                            label={country.name}
                            key={country.name}
                            value={country.name}>
                            {country.name}
                          </Listbox.Option>
                        ))}
                      </Listbox>
                    </FormSectionContent>
                  </FormSection>
                </FormPanel>
              );
            }}
          </Form>
        )}
      </ScaffoldSectionContent>
    </ScaffoldSection>
  );
};

export default AddressSettings;
