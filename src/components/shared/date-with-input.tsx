'use client';

import * as React from 'react';

import { Button } from '@/components/ui-patterns/shadcn/ui/button';
import { Calendar } from '@/components/ui-patterns/shadcn/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui-patterns/shadcn/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, isValid, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Input } from '../ui-patterns/shadcn/ui/input';

interface DatePickerWithInputProps {
  setSelectedDate: (value: React.SetStateAction<Date | undefined>) => void;
  selectedDate: Date | undefined;
}

export function DatePickerWithInput({ setSelectedDate, selectedDate }: DatePickerWithInputProps) {
  const [month, setMonth] = React.useState(new Date());
  // Hold the selected date in state

  // Hold the input value in state
  const [inputValue, setInputValue] = React.useState('');

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, 'MM/dd/yyyy'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !selectedDate && 'text-muted-foreground',
          )}>
          {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Input value={inputValue} placeholder="MM/dd/yyyy" onChange={handleInputChange} />
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={selectedDate}
            disabled={date => date > new Date() || date < new Date('1900-01-01')}
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
