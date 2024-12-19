'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  FormHeader,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
  Input,
  ScaffoldActionsContainer,
  ScaffoldContainerLegacy,
  ScaffoldFilterAndContent,
  ScaffoldSectionContent,
} from '@/components/ui';
import LeavePicker from '@/components/ui/date-picker/leave-picker';
import { formatDate } from '@/components/ui/date-picker/shared';
import { DateRange } from '@/components/ui/date-picker/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/shadcn/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fr } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  leave_type: z.string({
    required_error: 'Please select a leave type to display.',
  }),
  reason: z.string().optional(),
});
const formId = 'leaverequest-form';

const LeaveRequest = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(JSON.stringify(data));
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
                      disabled={true}
                      type="default"
                      htmlType="reset"
                      onClick={() => form.reset()}>
                      Cancel
                    </Button>
                    <Button
                      form={formId}
                      type="primary"
                      htmlType="submit"
                      disabled={false}
                      loading={false}>
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
                      placeholder="Commencer par choisir une date ..."
                    />
                  </ScaffoldActionsContainer>
                  <ScaffoldSectionContent className="w-full">
                    <LeavePicker value={range} onChange={setRange} />
                  </ScaffoldSectionContent>
                </ScaffoldFilterAndContent>
              </FormSectionContent>
            </FormSection>
            <FormSection header={<FormSectionLabel>Informations Préliminaires</FormSectionLabel>}>
              <FormSectionContent loading={false} fullWidth className="!gap-2 space-y-4">
                <FormField
                  control={form.control}
                  name="leave_type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          label="Hourly Rate"
                          placeholder="0.00"
                          {...field}
                          size="small"
                          layout="vertical"
                          disabled={false}
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
    </ScaffoldContainerLegacy>
  );
};

export default LeaveRequest;
