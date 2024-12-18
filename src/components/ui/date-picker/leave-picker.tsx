'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { fr } from 'date-fns/locale';
import { SelectRangeEventHandler } from 'react-day-picker';

import { Calendar as CalendarPrimitive } from './calendar';
import TimePicker from './time-picker';
import { DateRange, PickerProps } from './types';

type LeavePickerProps = {
  defaultValue?: DateRange;
  value?: DateRange;
  onChange: (dateRange?: DateRange) => void;
} & PickerProps;

const LeavePicker = ({
  value,
  defaultValue,
  onChange,
  disableNavigation,
  disabledDays,
  showYearNavigation = true,
  locale = fr,
  ...props
}: LeavePickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>(value ?? defaultValue ?? undefined);
  const [month, setMonth] = useState<Date | undefined>(range?.to);

  // Update internal state when value prop changes
  useEffect(() => {
    setRange(value);
  }, [value]);

  const onCalendarSelect: SelectRangeEventHandler = (selectedRange, selectedDay) => {
    const newRange = range?.from && range?.to ? { from: selectedDay } : selectedRange;

    setRange(newRange);
    onChange(newRange);
  };

  // const displayRange = useMemo(() => {
  //   if (!range) {
  //     return null;
  //   }

  //   return `${range.from ? formatDate(range.from, locale) : ''} - ${
  //     range.to ? formatDate(range.to, locale) : ''
  //   }`;
  // }, [range, locale]);

  return (
    <div className="flex w-full bg-white rounded-md">
      <div className="scrollbar-hide flex w-full flex-row items-center justify-center">
        <div
          className={cn(
            'relative flex items-center h-full w-40',
            'border-gray-200 sm:border-r',
            'scrollbar-hide overflow-auto',
          )}>
          <div className="absolute px-3 inset-0 right-0 p-3">
            <TimePicker rangeType="from" value={value} onValueChange={onChange} />
          </div>
        </div>
        <div className="scrollbar-hide overflow-x-scroll">
          <CalendarPrimitive
            mode="range"
            selected={range}
            onSelect={onCalendarSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={2}
            disabled={disabledDays}
            disableNavigation={disableNavigation}
            showYearNavigation={showYearNavigation}
            locale={locale}
            className="scrollbar-hide overflow-x-scroll"
            classNames={{
              months: 'flex flex-row divide-x divide-gray-200 overflow-x-scroll scrollbar-hide',
            }}
            {...props}
          />
        </div>
        <div
          className={cn(
            'relative flex items-center h-full w-40',
            'border-gray-200 sm:border-l',
            'scrollbar-hide overflow-auto',
          )}>
          <div className="absolute px-3 inset-0 right-0 p-3">
            <TimePicker rangeType="to" value={value} onValueChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeavePicker;
