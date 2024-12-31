'use client';

import { useState } from 'react';

import { DatePickerV2, Input } from '@/components/ui';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/shadcn/ui/form';
import { cn } from '@/lib/utils';
import type { Control } from 'react-hook-form';

interface DatePickerFieldProps {
  label: string;
  name: 'pay_date' | 'start_period' | 'end_period';
  control: Control<
    {
      hourly_rate: number;
      pay_date: string;
      start_period: string;
      end_period: string;
      time_entries: {
        week: number;
        worked_hours: number;
        overtime: number;
      }[];
      employees: string[];
    },
    any
  >;
  className?: string;
  disabled?: boolean;
}

export function DatePickerField({
  label,
  name,
  control,
  className,
  disabled,
}: DatePickerFieldProps) {
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
              {...field}
              size="small"
              layout="vertical"
              id={name}
              name={name}
              type="text"
              value={dateAsText}
              className={className}
              readOnly
              disabled={disabled}
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
