/* eslint-disable quotes */
'use client';

import React from 'react';

import { getSignedURL } from '@/app/actions';
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
import { FILE_TYPE } from '@/lib/constants';
import { computeSHA256 } from '@/lib/utils';
import { ICreatePayslip, IGeneratePayslipParams, IUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Document, pdf } from '@react-pdf/renderer';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PayslipPDF } from '../PayslipPDF';
import { DatePickerField } from './FormDatePicker';
import { calculateGrossSalary, calculateTotals, generatePaySlipData } from './Payslip.utils';
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

  const handlePayslipGeneration = async (
    params: IGeneratePayslipParams,
  ): Promise<{
    blob: Blob;
    grossSalary: number;
    netSalary: number;
  }> => {
    if (!params) {
      throw new Error('Invalid payslip generation parameters');
    }

    const grossSalary = calculateGrossSalary(params.total_hours_worked, params.hourlyRate);
    const paySlipData = generatePaySlipData(grossSalary, params.deductions, params.thresholds);
    const totals = calculateTotals(paySlipData);

    if (typeof window === 'undefined') {
      throw new Error('PDF generation is only available in the browser');
    }

    const nonsense = pdf(<Document></Document>);
    nonsense.updateContainer(
      <PayslipPDF
        user={params.selectedUser}
        company={params.companyInfo}
        paySlip={params.payslip}
        payslipData={paySlipData}
        totals={totals}
        grossSalary={grossSalary}
      />,
    );

    const pdfBlob = await nonsense.toBlob();

    const returnData = {
      blob: pdfBlob,
      grossSalary,
      netSalary: grossSalary - Number(totals.totalSalarial),
    };

    return returnData;
  };

  const handleFileUpload = async (params: IGeneratePayslipParams) => {
    const { blob, grossSalary, netSalary } = await handlePayslipGeneration(params);
    const signedURLResult = await getSignedURL({
      fileSize: blob.size,
      fileType: FILE_TYPE,
      checksum: await computeSHA256(blob),
      dir: 'payslips',
    });
    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }
    const { signedUrl, fileUrl } = signedURLResult.success;
    await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': FILE_TYPE,
      },
      body: blob,
    });

    return { fileUrl, grossSalary, netSalary };
  };

  async function onSubmit(values: FormValues) {
    try {
      const toastId = toast.loading('Téléchargement des fiches de paie en cours...');
      setLoading(true);
      if (!selectedUsers || !deductions || !thresholds || !companyInfo) {
        throw new Error("Une erreur s'est produite lors de la récupération des données");
      }
      for (const user of selectedUsers) {
        try {
          const { fileUrl, netSalary, grossSalary } = await handleFileUpload({
            thresholds: thresholds,
            deductions,
            companyInfo,
            selectedUser: user,
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
          toast.info(
            `Fiche de paie pour ${user.first_name} ${user.last_name} téléchargée avec succès.`,
          );
        } catch (error: any) {
          toast.error(
            `Erreur lors de la génération/téléchargement de la fiche de paie pour ${user.first_name} :`,
            {
              description: error.message,
            },
          );
        }
      }
      toast.success('Fiches de paie téléchargées avec succès', { id: toastId });
      form.reset();
      setUsers([]);
    } catch (error: any) {
      toast.error(error.message);
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
        subject="Échec du chargement des déductions et des seuils"
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
                    className="text-white"
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
                          label="Taux horaire"
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

                <DatePickerField name="pay_date" control={form.control} label="Date de paiement" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DatePickerField
                  name="start_period"
                  control={form.control}
                  label="Début de la période"
                  disabled={loading || payslipLoading}
                />

                <DatePickerField
                  name="end_period"
                  control={form.control}
                  label="Fin de la période"
                  disabled={loading || payslipLoading}
                />
              </div>
            </FormSectionContent>
          </FormSection>
          <FormSection header={<FormSectionLabel>Entrées de Temps</FormSectionLabel>}>
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
                            label="Semaine"
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
                            label="Heures travaillées"
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
                            label="Heures supplémentaires"
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
                  Ajouter une entrée de temps
                </Button>
              </div>
            </FormSectionContent>
          </FormSection>
          <FormSection header={<FormSectionLabel>Employés liés</FormSectionLabel>}>
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
