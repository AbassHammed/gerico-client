/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { FC, useEffect, useState } from 'react';

import Link from 'next/link';

import { Alert } from '@/components/ui/shadcn/ui/alert';
import { PagesRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button, Input_Shadcn, Label_Shadcn, Separator, TextArea_Shadcn } from '@ui';
import { CircleAlert } from 'lucide-react';

interface FormData {
  firstName: string;
  secondName: string;
  companyEmail: string;
  message: string;
}

interface FormItem {
  type: 'text' | 'textarea';
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
  component: typeof TextArea_Shadcn | typeof Input_Shadcn;
}

type FormConfig = {
  [K in keyof FormData]: FormItem;
};

interface Props {
  className?: string;
}

const formConfig: FormConfig = {
  firstName: {
    type: 'text',
    label: 'Prénom',
    placeholder: 'Prénom',
    required: true,
    className: 'md:col-span-1',
    component: Input_Shadcn,
  },
  secondName: {
    type: 'text',
    label: 'Nom',
    placeholder: 'Nom',
    required: true,
    className: 'md:col-span-1',
    component: Input_Shadcn,
  },
  companyEmail: {
    type: 'text',
    label: "Courriel de l'entreprise",
    placeholder: "Courriel de l'entreprise",
    required: true,
    className: '',
    component: Input_Shadcn,
  },
  message: {
    type: 'textarea',
    label: 'Dans quoi êtes-vous intéressé ?',
    placeholder: "Partagez plus d'informations sur ce que vous souhaitez accomplir",
    required: true,
    className: '[&_textarea]:min-h-[100px] [&_textarea]:bg-foreground/[.026]',
    component: TextArea_Shadcn,
  },
};

const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/;
  return emailPattern.test(email);
};

const personalEmailDomains = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.',
  '@outlook.com',
  '@aol.com',
  '@icloud.com',
  '@live.com',
  '@protonmail.com',
  '@mail.com',
  '@example.com',
];

const isCompanyEmail = (email: string): boolean => {
  for (const domain of personalEmailDomains) {
    if (email.includes(domain)) {
      return false;
    }
  }

  return true;
};

const defaultFormValue: FormData = {
  firstName: '',
  secondName: '',
  companyEmail: '',
  message: '',
};

const RequestADemoForm: FC<Props> = ({ className }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormValue);
  const [honeypot, setHoneypot] = useState<string>(''); // field to prevent spam
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormData(defaultFormValue);
    setSuccess(null);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: { [key in keyof FormData]?: string } = {};

    // Check required fields
    for (const key in formConfig) {
      if (formConfig[key as keyof FormData].required && !formData[key as keyof FormData]) {
        newErrors[key as keyof FormData] = `Ce champ est requis`;
      }
    }

    // Validate email
    if (formData.companyEmail && !isValidEmail(formData.companyEmail)) {
      newErrors.companyEmail = 'Adresse e-mail invalide';
    }

    // Validate company email
    if (formData.companyEmail && !isCompanyEmail(formData.companyEmail)) {
      newErrors.companyEmail = 'Veuillez utiliser une adresse e-mail professionnelle';
    }

    setErrors(newErrors);

    // Return validation status, also check if honeypot is filled (indicating a bot)
    return Object.keys(newErrors).length === 0 && honeypot === '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentTime = Date.now();
    const timeElapsed = (currentTime - startTime) / 1000;

    // Spam prevention: Reject form if submitted too quickly (less than 3 seconds)
    if (timeElapsed < 3) {
      setErrors({
        general: 'Soumission trop rapide. Veuillez remplir correctement le formulaire.',
      });
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSuccess(null);

    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Merci pour votre soumission !');
        setFormData({ firstName: '', secondName: '', companyEmail: '', message: '' });
      } else {
        const errorData = await response.json();
        setErrors({ general: `Soumission échouée: ${errorData.message}` });
      }
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
      setErrors({ general: "Une erreur inattendue s'est produite. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col gap-4 w-full items-center justify-center min-h-[300px]',
        className,
      )}>
      <div className="border rounded-xl bg-surface-75 p-4 md:p-6 w-full lg:max-w-lg min-h-[200px] md:min-h-[400px]">
        {success ? (
          <div className="flex flex-col h-full w-full min-w-[300px] gap-4 items-center justify-center opacity-0 transition-opacity animate-fade-in scale-1">
            <p className="text-center text-sm">{success}</p>
            <Button onClick={handleReset}>Réinitialiser</Button>
          </div>
        ) : (
          <form
            id="support-form"
            className={cn('flex flex-col lg:grid lg:grid-cols-2 gap-4')}
            onSubmit={handleSubmit}>
            {Object.entries(formConfig).map(([key, { component: Component, ...fieldValue }]) => {
              const fieldKey = key as keyof FormData;

              return (
                <div
                  key={key}
                  className={cn('flex flex-col col-span-full gap-y-2', fieldValue.className)}>
                  <Label_Shadcn
                    htmlFor={fieldKey}
                    className="text-foreground-light flex justify-between">
                    {fieldValue.label}
                    <div
                      className={cn(
                        'flex flex-nowrap text-right gap-1 items-center text-xs leading-none transition-opacity opacity-0 text-foreground-muted',
                        errors[key as keyof FormData] && 'opacity-100 animate-fade-in',
                      )}>
                      {errors[fieldKey]}
                    </div>
                  </Label_Shadcn>
                  <Component
                    type="text"
                    id={fieldKey}
                    name={fieldKey}
                    value={formData[fieldKey]}
                    onChange={handleChange}
                    placeholder={fieldValue.placeholder}
                  />
                </div>
              );
            })}

            {/* Spam prevention */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <Separator className="col-span-full" />
            <Button
              block
              htmlType="submit"
              size="small"
              className="col-span-full text-white"
              disabled={isSubmitting}
              loading={isSubmitting}>
              Demander un devis
            </Button>
            <p className="text-foreground-lighter text-sm col-span-full">
              En soumettant ce formulaire, je confirme avoir lu et compris la{' '}
              <Link href="/confidentialite" className="text-foreground hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
            {errors.general && (
              <Alert className="flex gap-2 text-foreground text-sm col-span-full">
                <CircleAlert className="w-3 h-3" /> <span>{errors.general}</span>
              </Alert>
            )}
          </form>
        )}
      </div>
      <p className="text-foreground-lighter text-sm">
        Contacter le{' '}
        <Link href={PagesRoutes.Support} className="text-foreground hover:underline">
          support
        </Link>{' '}
        si vous avez besoin d'aide technique
      </p>
    </div>
  );
};

export default RequestADemoForm;
