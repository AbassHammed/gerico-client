/* eslint-disable quotes */
'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  FormControl_Shadcn,
  FormField_Shadcn,
  FormHeader,
  FormPanel,
  FormSection,
  FormSectionContent,
  Input,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
  TextArea_Shadcn,
} from '@/components/ui';
import LeavePicker from '@/components/ui/date-picker/leave-picker';
import { formatDate } from '@/components/ui/date-picker/shared';
import { DateRange } from '@/components/ui/date-picker/types';
import { FormItemLayout } from '@/components/ui/form/FormItemLayout';
import { Form } from '@/components/ui/shadcn/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/ui/select';
import { useCreateLeaveRequest } from '@/hooks/useFetchLeave';
import { useUser } from '@/hooks/useUser';
import { ILeaveRequestInput } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import Holidays from 'date-holidays';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { LeaveStatusEnum } from './LeaveStatusBadge';

const FormSchema = z.object({
  leave_type: z.string({
    required_error: 'Please select a leave type to display.',
  }),
  reason: z.string().optional(),
});
const formId = 'leaverequest-form';

const LeaveRequest = () => {
  const { user } = useUser();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const { createLeave, loading } = useCreateLeaveRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hd = new Holidays();
  hd.init('FR');

  const holidays = hd.getHolidays(new Date()).map(holiday => new Date(holiday.date));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const displayRange = useMemo(() => {
    if (!range) {
      return '';
    }

    return `${range.from ? formatDate(range.from, fr, true) : ''} - ${
      range.to ? formatDate(range.to, fr, true) : ''
    }`;
  }, [range]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (!range?.from || !range?.to || !isAfter(range.to, range.from) || !user) {
        toast.error('La période de congé est invalide.');
        return;
      }
      const inputs: ILeaveRequestInput = {
        leave_type: data.leave_type,
        reason: data.reason,
        start_date: range.from,
        end_date: range.to,
        uid: user.uid,
        request_status: LeaveStatusEnum.WAITING,
      };
      const message = await createLeave(inputs);
      toast.success(message);
    } catch (error: any) {
      toast.error("Une erreur s'est produite lors de l'envoi de la demande.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
      form.reset();
      setRange(undefined);
    }
  }

  return (
    <ScaffoldContainerLegacy className="gap-0">
      <div className="flex items-center justify-between">
        <FormHeader title="Demande de congé" description="Faites votre demande de congé ici." />
      </div>
      <Form {...form}>
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FormPanel
            footer={
              <div className="flex py-4 px-8">
                <div className={['flex w-full items-center gap-2', 'justify-end'].join(' ')}>
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={isSubmitting || loading}
                      type="default"
                      htmlType="reset"
                      onClick={() => {
                        form.reset();
                        setRange(undefined);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      form={formId}
                      type="primary"
                      htmlType="submit"
                      disabled={isSubmitting || loading}
                      loading={isSubmitting || loading}>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            }>
            <FormSection>
              <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
                <ScaffoldFilterAndContent>
                  <ScaffoldActionsContainer className="justify-stretch">
                    <Input
                      label="Période"
                      className="w-full"
                      value={displayRange}
                      disabled
                      placeholder="Commencez par choisir une date ..."
                    />
                  </ScaffoldActionsContainer>
                  <ScaffoldSectionContent className="w-full">
                    <LeavePicker
                      disabledDays={date =>
                        [0, 6].includes(date.getDay()) ||
                        holidays.some(holiday => holiday.getTime() === date.getTime())
                      }
                      value={range}
                      onChange={setRange}
                    />
                  </ScaffoldSectionContent>
                </ScaffoldFilterAndContent>
              </FormSectionContent>
            </FormSection>
            <FormSection>
              <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
                <FormField_Shadcn
                  name="leave_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItemLayout layout="vertical" label="Sujet">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl_Shadcn>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl_Shadcn>
                        <SelectContent>
                          <SelectItem value="paid">Congés payé</SelectItem>
                          <SelectItem value="unpaid">Congés non payé</SelectItem>
                          <SelectItem value="sick">Arrêt maladie</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItemLayout>
                  )}
                />

                <FormField_Shadcn
                  name="reason"
                  control={form.control}
                  render={({ field }) => (
                    <FormItemLayout
                      layout="vertical"
                      label="Message"
                      labelOptional="Limite de 5000 caractères  ">
                      <FormControl_Shadcn>
                        <TextArea_Shadcn
                          {...field}
                          disabled={isSubmitting || loading}
                          rows={4}
                          maxLength={5000}
                          placeholder="Décrivez le problème rencontré, ainsi que toute information pertinente. Soyez aussi précis et spécifique que possible."
                        />
                      </FormControl_Shadcn>
                    </FormItemLayout>
                  )}
                />
              </FormSectionContent>
            </FormSection>
          </FormPanel>
        </form>
      </Form>
    </ScaffoldContainerLegacy>
  );
};

export default LeaveRequest;
