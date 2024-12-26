/* eslint-disable quotes */
'use client';

import React from 'react';

import {
  AlertError,
  Button,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
  InputNumber,
} from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/shadcn/ui/form';
import { GenericSkeletonLoaderList } from '@/components/ui/ShimmeringLoader';
import { useCompanyInfo } from '@/hooks/company-mutations';
import { useGetDeductions, useGetThresholds } from '@/hooks/useHooks';
import { useCreatePayslip } from '@/hooks/usePayslips';
import { ICreatePayslip, IUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { DatePickerField } from './FormDatePicker';
import { handleFileUpload } from './Payslip.utils';
import UserSelect from './UserSelect';

const timeEntrySchema = z.object({
  week: z.coerce.number(),
  worked_hours: z.coerce.number(),
  overtime: z.coerce.number(),
});

const PayslipSchema = z.object({
  hourly_rate: z.coerce.number(),
  pay_date: z.string(),
  start_period: z.string(),
  end_period: z.string(),
  time_entries: z.array(timeEntrySchema),
  employees: z.array(z.string()),
});

type FormValues = z.infer<typeof PayslipSchema>;
const formId = 'payslip-form';

const PayslipForm = () => {
  const { companyInfo, loading: companyInfoLoading, error: companyInfoError } = useCompanyInfo();
  const { deductions, isLoading: isDeductionsLoading, error: deductionsError } = useGetDeductions();
  const { thresholds, isLoading: isThresholdsLoading, error: thresholdsError } = useGetThresholds();
  const [selectedUsers, setUsers] = React.useState<IUser[] | undefined>([]);
  const { createPayslip, loading: payslipLoading } = useCreatePayslip();
  const [loading, setLoading] = React.useState<boolean>(false);
  let toastId: string | null | number = null;

  const initialValues: FormValues = {
    hourly_rate: 0,
    pay_date: '',
    start_period: '',
    end_period: '',
    time_entries: [{ week: 1, worked_hours: 0, overtime: 0 }],
    employees: [],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(PayslipSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'time_entries',
  });

  function addTimeEntry() {
    append({ week: fields.length + 1, worked_hours: 0, overtime: 0 });
  }

  function removeTimeEntry(index: number) {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  }

  function calculateOvertime(workedHours: number) {
    return workedHours > 35 ? workedHours - 35 : 0;
  }

  async function onSubmit(values: FormValues) {
    try {
      toastId = toast.loading('En cours de ...', { id: toastId! });
      setLoading(true);
      if (!selectedUsers || !deductions || !thresholds || !companyInfo) {
        throw new Error("Une erreur s'est produite lors de la récupération des données");
      }

      for (const user of selectedUsers) {
        try {
          const { fileUrl, netSalary, grossSalary } = await handleFileUpload({
            thresholds,
            deductions,
            companyInfo,
            seletedUser: user,
            total_hours_worked: values.time_entries,
            payslip: values,
            hourlyRate: values.hourly_rate,
          });

          const dataWithOvertime = {
            ...values,
            gross_salary: grossSalary,
            net_salary: netSalary,
            time_entries: values.time_entries.map(entry => ({
              ...entry,
              overtime: calculateOvertime(entry.worked_hours),
            })),
          };

          const data: ICreatePayslip = {
            uid: user.uid,
            gross_salary: dataWithOvertime.gross_salary,
            net_salary: dataWithOvertime.net_salary,
            start_period: new Date(dataWithOvertime.start_period),
            end_period: new Date(dataWithOvertime.end_period),
            pay_date: new Date(dataWithOvertime.pay_date),
            hourly_rate: dataWithOvertime.hourly_rate,
            total_hours_worked: JSON.stringify(dataWithOvertime.time_entries),
            path_to_pdf: fileUrl,
          };

          await createPayslip(data);

          toast.info(`Payslip for ${user.first_name} ${user.last_name} uploaded successfully.`);
        } catch (error: any) {
          toast.error(`Error generating/uploading payslip for ${user.first_name}:`, {
            description: error.message,
          });
        }
      }

      toast.success('Payslips uploaded successfully');
      form.reset();
      setUsers([]);
    } catch (error: any) {
      toast.error(error.message, { id: toastId! });
    } finally {
      setLoading(false);
    }
  }

  const handleOvertimeCalculation = (idx: number) =>
    form.setValue(
      `time_entries.${idx}.overtime`,
      calculateOvertime(form.watch(`time_entries.${idx}.worked_hours`)),
    );

  if (isDeductionsLoading || isThresholdsLoading || companyInfoLoading) {
    return <GenericSkeletonLoaderList />;
  }

  if (deductionsError || thresholdsError || companyInfoError) {
    return (
      <AlertError
        subject="Failed to load deductions and thresholds"
        error={deductionsError || thresholdsError || companyInfoError}
      />
    );
  }

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FormPanel
          footer={
            <div className="flex py-4 px-8">
              <div className={['flex w-full items-center gap-2', 'justify-end'].join(' ')}>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={loading || payslipLoading}
                    type="default"
                    htmlType="reset"
                    onClick={() => form.reset()}>
                    Annuler
                  </Button>
                  <Button
                    form={formId}
                    type="primary"
                    htmlType="submit"
                    disabled={loading || payslipLoading}
                    loading={payslipLoading}>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </div>
          }>
          <FormSection header={<FormSectionLabel>Informations Préliminaires</FormSectionLabel>}>
            <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="hourly_rate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <InputNumber
                          label="Hourly Rate"
                          placeholder="0.00"
                          {...field}
                          size="small"
                          layout="vertical"
                          disabled={loading || payslipLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DatePickerField name="pay_date" control={form.control} label="Pay Date" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DatePickerField
                  name="start_period"
                  control={form.control}
                  label="Start Period"
                  disabled={loading || payslipLoading}
                />

                <DatePickerField
                  name="end_period"
                  control={form.control}
                  label="End Period"
                  disabled={loading || payslipLoading}
                />
              </div>
            </FormSectionContent>
          </FormSection>
          <FormSection header={<FormSectionLabel>Time Entries</FormSectionLabel>}>
            <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
              {fields.map((field, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`time_entries.${index}.week`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <InputNumber
                            type="number"
                            label="Week"
                            placeholder="1"
                            {...field}
                            size="small"
                            layout="vertical"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`time_entries.${index}.worked_hours`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            type="number"
                            label="Worked Hours"
                            placeholder="0.00"
                            {...field}
                            onChange={e => {
                              field.onChange(e);
                              handleOvertimeCalculation(index);
                            }}
                            size="small"
                            layout="vertical"
                            disabled={loading || payslipLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`time_entries.${index}.overtime`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            label="Overtime"
                            value={calculateOvertime(
                              form.watch(`time_entries.${index}.worked_hours`),
                            )}
                            size="small"
                            layout="vertical"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormControl>
                      <Button
                        size={'small'}
                        type={'default'}
                        icon={<CircleMinus />}
                        onClick={() => removeTimeEntry(index)}
                        disabled={loading || payslipLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              ))}
              <div className="flex justify-end">
                <Button
                  size={'small'}
                  icon={<CirclePlus />}
                  onClick={addTimeEntry}
                  disabled={loading || payslipLoading}
                  className="text-white">
                  Add Time Entry
                </Button>
              </div>
            </FormSectionContent>
          </FormSection>
          <FormSection header={<FormSectionLabel>Linked Projects</FormSectionLabel>}>
            <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
              <FormField
                control={form.control}
                name="employees"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UserSelect
                        onUsersChange={field.onChange}
                        setSelectedUsers={setUsers}
                        selectedUsers={selectedUsers}
                        loading={loading || payslipLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSectionContent>
          </FormSection>
        </FormPanel>
      </form>
    </Form>
  );
};

export default PayslipForm;
