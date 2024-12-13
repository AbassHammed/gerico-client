'use client';

import React, { useState } from 'react';

import { formatDateTime, parseDateTime } from '@/lib/utils';
import {
  Button,
  ButtonProps,
  Calendar,
  Input_Shadcn,
  Popover_Shadcn,
  PopoverContent_Shadcn,
  PopoverTrigger_Shadcn,
  Separator,
} from '@ui';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';

import TimeSplitInput from './TimeSplitInput';

export interface DatePickerProps {
  onChange?: (args: Date | null | undefined) => void;
  triggerButtonType?: ButtonProps['type'];
  triggerButtonClassName?: string;
  triggerButtonTitle?: string;
  hideTime?: boolean;
  hideClear?: boolean;
  children?: React.ReactNode | React.ReactNode[] | null;
}

const DATE_DEFAULT = new Date();

const TIME_DEFAULT = { HH: '00', mm: '00', ss: '00' };

function _DatePicker({
  onChange,
  triggerButtonType = 'default',
  triggerButtonClassName = '',
  triggerButtonTitle,
  hideTime = false,
  hideClear = false,
  children,
}: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [time, setTime] = useState<any>(TIME_DEFAULT);
  const [date, setDate] = useState<Date | undefined>(DATE_DEFAULT);
  const [month, setMonth] = React.useState(new Date());
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Hold the selected date in state

  function handleSubmit() {
    setOpen(false);

    const payload = dayjs(date)
      .second(Number(time.ss))
      .minute(Number(time.mm))
      .hour(Number(time.HH));

    if (onChange) {
      onChange(payload.toDate());
    }
  }

  function handleClear() {
    setOpen(false);

    setDate(DATE_DEFAULT);
    setTime(TIME_DEFAULT);

    if (onChange) {
      onChange(null);
    }
  }

  return (
    <Popover_Shadcn open={open} onOpenChange={setOpen}>
      <PopoverTrigger_Shadcn asChild>
        <Button
          title={triggerButtonTitle}
          type={triggerButtonType}
          icon={<CalendarIcon />}
          className={triggerButtonClassName}>
          {children !== undefined ? children : format(new Date(date!), 'dd MMM')}
        </Button>
      </PopoverTrigger_Shadcn>
      <PopoverContent_Shadcn align="center" side="bottom" className="flex w-auto flex-col p-2">
        <>
          {hideTime ? null : (
            <>
              <div className="flex flex-col items-center justify-center py-2">
                <div className="flex grow flex-col gap-1">
                  <TimeSplitInput type="default" time={time} setTime={setTime} />
                </div>
              </div>
            </>
          )}
          <Input_Shadcn
            ref={inputRef}
            defaultValue={date ? formatDateTime(date) : ''}
            placeholder="i.e 'demain' ou 'il y a deux ans'"
            onBlur={e => {
              if (e.target.value.length > 0) {
                const parsedDateTime = parseDateTime(e.target.value);
                if (parsedDateTime) {
                  setDate(parsedDateTime);
                  setMonth(parsedDateTime);
                  e.target.value = formatDateTime(parsedDateTime);
                }
              }
            }}
          />
          <div className="rounded-md border">
            <Calendar
              mode="single"
              onSelect={e => {
                if (e) {
                  const selectedDate = new Date(e);
                  setDate(selectedDate);
                  setMonth(selectedDate);
                  if (inputRef.current) {
                    inputRef.current.value = formatDateTime(selectedDate);
                  }
                }
              }}
              selected={date}
              month={month}
              onMonthChange={setMonth}
              locale={fr}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-end gap-2 py-2 px-3 pb-4">
            {!hideClear && (
              <Button type="default" onClick={() => handleClear()}>
                Effacer
              </Button>
            )}
            <Button onClick={() => handleSubmit()}>Appliquer</Button>
          </div>
        </>
      </PopoverContent_Shadcn>
    </Popover_Shadcn>
  );
}

export default _DatePicker;
