'use client';

import {
  Button,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
} from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/shadcn/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePickerField } from './DatePicker';
import UserSelect from './UserSelect';

const timeEntrySchema = z.object({
  week: z.number(),
  worked_hours: z.number(),
  overtime: z.number(),
});

const PayslipSchema = z.object({
  hourly_rate: z.number(),
  pay_date: z.string(),
  start_period: z.string(),
  end_period: z.string(),
  time_entries: z.array(timeEntrySchema),
  employee: z.string(),
  gross_salary: z.number(),
  net_salary: z.number(),
});

type FormValues = z.infer<typeof PayslipSchema>;

const PayslipForm = () => {
  const formId = 'payslip-form';

  const initialValues: FormValues = {
    hourly_rate: 0,
    pay_date: '',
    start_period: '',
    end_period: '',
    time_entries: [{ week: 1, worked_hours: 0, overtime: 0 }],
    employee: '',
    gross_salary: 0,
    net_salary: 0,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(PayslipSchema),
    defaultValues: initialValues,
  });

  function calculateGrossSalary(): number {
    const hourlyRate = Math.max(form.getValues().hourly_rate, 0);
    const adjustedHours = 151.67;
    const baseSalary = hourlyRate * adjustedHours;
    let totalOvertimePay = 0;
    form.getValues().time_entries.forEach(week => {
      const overtime = week.overtime;
      if (overtime > 0) {
        const overtime25 = Math.min(overtime, 8) * 1.25 * hourlyRate;
        const overtime50 = Math.max(overtime - 8, 0) * 1.5 * hourlyRate;
        totalOvertimePay += overtime25 + overtime50;
      }
    });

    const grossSalary = baseSalary + totalOvertimePay;
    return parseFloat(grossSalary.toFixed(2));
  }

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

  function onSubmit(values: FormValues) {
    const dataWithOvertime = {
      ...values,
      time_entries: values.time_entries.map(entry => ({
        ...entry,
        overtime: calculateOvertime(entry.worked_hours),
      })),
    };
    console.error(dataWithOvertime);
  }

  const handleOvertimeCalculation = (idx: number) =>
    form.setValue(
      `time_entries.${idx}.overtime`,
      calculateOvertime(form.watch(`time_entries.${idx}.worked_hours`)),
    );

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FormPanel>
          <FormSection header={<FormSectionLabel>Informations Préliminaires</FormSectionLabel>}>
            <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="hourly_rate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          label="Hourly Rate"
                          placeholder="0.00"
                          {...field}
                          size="small"
                          layout="vertical"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DatePickerField name="pay_date" control={form.control} label="Pay Date" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DatePickerField name="start_period" control={form.control} label="Start Period" />

                <DatePickerField name="end_period" control={form.control} label="End Period" />
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
                          <Input
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
                name="employee"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UserSelect onUsersChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSectionContent>
          </FormSection>
          <FormSection header={<FormSectionLabel>Salaries</FormSectionLabel>}>
            <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="gross_salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          label="Salaire Brut"
                          placeholder="0.00"
                          {...field}
                          size="small"
                          layout="vertical"
                          disabled
                          value={calculateGrossSalary()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="net_salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          label="Salaire Net"
                          placeholder="0.00"
                          {...field}
                          size="small"
                          layout="vertical"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSectionContent>
          </FormSection>
        </FormPanel>
      </form>
    </Form>
  );
};

export default PayslipForm;
