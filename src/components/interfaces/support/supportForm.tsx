'use client';

import { useState } from 'react';

import { FormItemLayout } from '@/components/ui/form/FormItemLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert_Shadcn,
  AlertDescription_Shadcn,
  AlertTitle_Shadcn,
  Button,
  Form_Shadcn,
  FormControl_Shadcn,
  FormField_Shadcn,
  Input_Shadcn,
  Select_Shadcn,
  SelectContent_Shadcn,
  SelectGroup_Shadcn,
  SelectItem_Shadcn,
  SelectTrigger_Shadcn,
  SelectValue_Shadcn,
  Separator,
  TextArea_Shadcn,
} from '@ui';
import { CheckCircle, Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ExpectationInfoBox } from './ExpectationInfoBox';
import { CATEGORY_OPTIONS, SEVERITY_OPTIONS } from './supportForm.constants';

export const SupportForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const FormSchema = z.object({
    category: z.string(),
    severity: z.string(),
    subject: z.string().min(1, 'Veuillez ajouter un sujet'),
    message: z.string().min(1, 'Veuillez décrire le problème rencontré'),
  });

  const defaultValues = {
    category: CATEGORY_OPTIONS[0].value,
    severity: 'Low',
    subject: '',
    message: '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    setIsSubmitted(true);
    console.error(values);
  };

  return (
    <div className="relative">
      {isSubmitted ? (
        <div className={`absolute top-0 duration-500 delay-300 w-full `}>
          <Alert_Shadcn variant="default">
            <CheckCircle />
            <AlertTitle_Shadcn>Demande envoyée avec succès</AlertTitle_Shadcn>
            <AlertDescription_Shadcn className="text-xs">
              Notre équipe traitera votre demande dans les plus brefs délais. Vous recevrez une
              réponse par email.
            </AlertDescription_Shadcn>
          </Alert_Shadcn>
        </div>
      ) : (
        <Form_Shadcn {...form}>
          <form
            id="support-form"
            className="flex flex-col gap-y-8"
            onSubmit={form.handleSubmit(onSubmit)}>
            <h3 className="px-6 text-xl">Comment pouvons-nous vous aider ?</h3>

            <div
              className={'px-6 grid sm:grid-cols-2 sm:grid-rows-1 gap-4 grid-cols-1 grid-rows-2'}>
              <FormField_Shadcn
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItemLayout layout="vertical" label="Domaine d'intervention">
                    <FormControl_Shadcn>
                      <Select_Shadcn
                        {...field}
                        defaultValue={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger_Shadcn className="w-full">
                          <SelectValue_Shadcn>
                            {CATEGORY_OPTIONS.find(o => o.value === field.value)?.label}
                          </SelectValue_Shadcn>
                        </SelectTrigger_Shadcn>
                        <SelectContent_Shadcn>
                          <SelectGroup_Shadcn>
                            {CATEGORY_OPTIONS.map((option, idx) => (
                              <SelectItem_Shadcn key={idx} value={option.value}>
                                {option.label}
                                <span className="block text-xs text-foreground-lighter">
                                  {option.description}
                                </span>
                              </SelectItem_Shadcn>
                            ))}
                          </SelectGroup_Shadcn>
                        </SelectContent_Shadcn>
                      </Select_Shadcn>
                    </FormControl_Shadcn>
                  </FormItemLayout>
                )}
              />
              <FormField_Shadcn
                name="severity"
                control={form.control}
                render={({ field }) => (
                  <FormItemLayout layout="vertical" label="Gravité">
                    <FormControl_Shadcn>
                      <Select_Shadcn
                        {...field}
                        defaultValue={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger_Shadcn className="w-full">
                          <SelectValue_Shadcn placeholder="Sélectionner une gravité">
                            {field.value}
                          </SelectValue_Shadcn>
                        </SelectTrigger_Shadcn>
                        <SelectContent_Shadcn>
                          <SelectGroup_Shadcn>
                            {SEVERITY_OPTIONS.map((option, idx) => (
                              <SelectItem_Shadcn key={idx} value={option.value}>
                                {option.label}
                                <span className="block text-xs text-foreground-lighter">
                                  {option.description}
                                </span>
                              </SelectItem_Shadcn>
                            ))}
                          </SelectGroup_Shadcn>
                        </SelectContent_Shadcn>
                      </Select_Shadcn>
                    </FormControl_Shadcn>
                  </FormItemLayout>
                )}
              />
            </div>

            <Separator />

            <div className="px-6 flex flex-col gap-y-2">
              <FormField_Shadcn
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <FormItemLayout layout="vertical" label="Sujet">
                    <FormControl_Shadcn>
                      <Input_Shadcn {...field} placeholder="Résumé du problème rencontré" />
                    </FormControl_Shadcn>
                  </FormItemLayout>
                )}
              />
              <ExpectationInfoBox />
            </div>

            <FormField_Shadcn
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItemLayout
                  className="px-6"
                  layout="vertical"
                  label="Message"
                  labelOptional="Limite de 5000 caractères  ">
                  <FormControl_Shadcn>
                    <TextArea_Shadcn
                      {...field}
                      rows={4}
                      maxLength={5000}
                      placeholder="Décrivez le problème rencontré, ainsi que toute information pertinente. Soyez aussi précis et spécifique que possible."
                    />
                  </FormControl_Shadcn>
                </FormItemLayout>
              )}
            />

            <div className="px-6">
              <div className="flex justify-end">
                <Button
                  htmlType="submit"
                  size="small"
                  icon={<Mail className="text-white" />}
                  disabled={false}
                  className="text-white"
                  loading={false}>
                  Envoyer la demande
                </Button>
              </div>
            </div>
          </form>
        </Form_Shadcn>
      )}
    </div>
  );
};
