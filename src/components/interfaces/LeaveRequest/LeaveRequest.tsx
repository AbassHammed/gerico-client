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
  InformationBox,
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
import { differenceInBusinessDays, isAfter } from 'date-fns';
import Holidays from 'date-holidays';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import HelpLeaves from './HelpLeaves';
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

    return `${range.from ? formatDate(range.from, true) : ''} - ${
      range.to ? formatDate(range.to, true) : ''
    }`;
  }, [range]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (!range?.from || !range?.to || !isAfter(range.to, range.from) || !user) {
        toast.error('La période de congé est invalide.');
        return;
      }

      if ([0, 6].includes(range.from.getDay()) || [0, 6].includes(range.to.getDay())) {
        toast.error('La période de congé ne peut pas commencer ou se terminer par un week-end.');
        return;
      }

      if (
        (range.from && holidays.some(holiday => holiday.getTime() === range.from!.getTime())) ||
        (range.to && holidays.some(holiday => holiday.getTime() === range.to!.getTime()))
      ) {
        toast.error('La période de congé ne peut pas commencer ou se terminer un jour férié.');
        return;
      }

      const numberOfLeaveDays = differenceInBusinessDays(range.to, range.from) + 1;
      if (numberOfLeaveDays > user.remaining_leave_balance) {
        toast.error("Vous n'avez pas assez de jours de congé pour cette période.");
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
      form.reset();
      setRange(undefined);
      toast.success(message);
    } catch (error: any) {
      toast.error("Une erreur s'est produite lors de l'envoi de la demande.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
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
                      Annuler
                    </Button>
                    <Button
                      form={formId}
                      type="primary"
                      htmlType="submit"
                      className="text-white"
                      disabled={isSubmitting || loading}
                      loading={isSubmitting || loading}>
                      Envoyer
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
                        date < new Date() ||
                        [0, 6].includes(date.getDay()) ||
                        holidays.some(holiday => holiday.getTime() === date.getTime())
                      }
                      value={range}
                      onChange={setRange}
                    />
                    <InformationBox
                      icon={<AlertCircle size={18} strokeWidth={2} />}
                      defaultVisibility={false}
                      hideCollapse={false}
                      title="Aide prise de congé"
                      description={<HelpLeaves />}
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
                    <FormItemLayout layout="vertical" label="Type de congé">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl_Shadcn>
                          <SelectTrigger>
                            <SelectValue placeholder="Veuillez sélectionner le type de congé" />
                          </SelectTrigger>
                        </FormControl_Shadcn>
                        <SelectContent>
                          <SelectItem value="Congés payé">Congés payé</SelectItem>
                          <SelectItem value="Congés non payé">Congés non payé</SelectItem>
                          <SelectItem value="Arrêt maladie">Arrêt maladie</SelectItem>
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
                      label="Raison"
                      labelOptional="Limite de 5000 caractères  ">
                      <FormControl_Shadcn>
                        <TextArea_Shadcn
                          {...field}
                          disabled={isSubmitting || loading}
                          rows={4}
                          maxLength={5000}
                          placeholder="Raison de la demande de congé ..."
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
