'use client';

import { useState } from 'react';

import { DatePickerV2, Input } from '@/components/ui';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/shadcn/ui/form';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

interface DatePickerFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  className?: string;
}

export function DatePickerField({ label, name, control, className }: DatePickerFieldProps) {
  const [dateAsText, setDateAsText] = useState('');

  const updateDateDisplay = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        setDateAsText(
          new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(date),
        );
      } else {
        setDateAsText('');
      }
    } else {
      setDateAsText('');
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormControl>
            <Input
              size="small"
              layout="vertical"
              id={name}
              name={name}
              type="text"
              value={dateAsText}
              className={className}
              readOnly
              label={label}
              actions={
                <DatePickerV2
                  hideTime
                  onChange={date => {
                    if (date) {
                      field.onChange(date.toISOString());
                      updateDateDisplay(date.toISOString());
                    } else {
                      setDateAsText('');
                      field.onChange('');
                    }
                  }}>
                  <span>Pick</span>
                </DatePickerV2>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
