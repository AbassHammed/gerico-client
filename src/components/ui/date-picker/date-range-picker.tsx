/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '@/hooks/misc/use-media-query';
import { cn } from '@/lib/utils';
import { fr } from 'date-fns/locale';
import type { SelectRangeEventHandler } from 'react-day-picker';

import { Calendar as CalendarPrimitive } from './calendar';
import { Popover } from './popover';
import { Presets } from './presets';
import { DatePickerContext, formatDate, validatePresets } from './shared';
import { Trigger } from './trigger';
import { DateRange, DateRangePreset, PickerProps } from './types';

type RangeDatePickerProps = {
  presets?: DateRangePreset[];
  presetId?: DateRangePreset['id'];
  defaultValue?: DateRange;
  value?: DateRange;
  onChange?: (dateRange?: DateRange, preset?: DateRangePreset) => void;
} & PickerProps;

const DateRangePickerInner = ({
  value,
  defaultValue,
  presetId,
  onChange,
  presets,
  disabled,
  disableNavigation,
  disabledDays,
  showYearNavigation = false,
  locale = fr,
  placeholder = 'Select date range',
  hasError,
  align = 'center',
  className,
  ...props
}: RangeDatePickerProps) => {
  const { isDesktop } = useMediaQuery();

  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<DateRangePreset | undefined>(
    presets && presetId ? presets?.find(({ id }) => id === presetId) : undefined,
  );
  const [range, setRange] = useState<DateRange | undefined>(
    preset?.dateRange ?? value ?? defaultValue ?? undefined,
  );
  const [month, setMonth] = useState<Date | undefined>(range?.to);

  const initialRange = useMemo(() => range, [open]);

  // Update internal state when value prop changes
  useEffect(() => {
    setRange(value);
  }, [value]);

  // Update internal state when preset props change
  useEffect(() => {
    const p = presets?.find(({ id }) => id === presetId);
    setPreset(p);
    setRange(p?.dateRange ?? value ?? defaultValue);
  }, [presets, presetId]);

  useEffect(() => {
    if (!open) {
      setMonth(range?.to);
    } else if (range) {
      setMonth(range.to);
    }
  }, [open]);

  const onCalendarSelect: SelectRangeEventHandler = (selectedRange, selectedDay) => {
    const newRange = range?.from && range?.to ? { from: selectedDay } : selectedRange;

    setRange(newRange);
    setPreset(undefined);
    if (newRange?.from && newRange?.to) {
      onChange?.(newRange);
      setOpen(false);
    }
  };

  const onPresetSelected = (preset: DateRangePreset) => {
    setRange(preset.dateRange);
    setPreset(preset);
    onChange?.(preset.dateRange, preset);
    setOpen(false);
  };

  const onCancel = () => {
    setRange(initialRange);
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel();
    }

    setOpen(open);
  };

  const displayRange = useMemo(() => {
    if (!range) {
      return null;
    }

    return `${range.from ? formatDate(range.from) : ''} - ${range.to ? formatDate(range.to) : ''}`;
  }, [range]);

  return (
    <DatePickerContext.Provider value={{ isOpen: open, setIsOpen: setOpen }}>
      <Popover
        align={align}
        openPopover={open}
        setOpenPopover={onOpenChange}
        popoverContentClassName="rounded-xl"
        content={
          <div className="flex w-full">
            <div className="scrollbar-hide flex w-full flex-col overflow-x-scroll sm:flex-row-reverse sm:items-start">
              {presets && presets.length > 0 && (
                <div
                  className={cn(
                    'relative flex h-16 w-full items-center sm:h-full sm:w-48',
                    'border-b border-gray-200 sm:border-b-0 sm:border-l',
                    'scrollbar-hide overflow-auto',
                  )}>
                  <div className="absolute px-3 sm:inset-0 sm:left-0 sm:p-3">
                    <Presets currentValue={range} presets={presets} onSelect={onPresetSelected} />
                  </div>
                </div>
              )}
              <div className="scrollbar-hide overflow-x-scroll">
                <CalendarPrimitive
                  mode="range"
                  selected={range}
                  onSelect={onCalendarSelect}
                  month={month}
                  onMonthChange={setMonth}
                  numberOfMonths={isDesktop ? 2 : 1}
                  disabled={disabledDays}
                  disableNavigation={disableNavigation}
                  showYearNavigation={showYearNavigation}
                  locale={locale}
                  className="scrollbar-hide overflow-x-scroll"
                  classNames={{
                    months:
                      'flex flex-row divide-x divide-gray-200 overflow-x-scroll scrollbar-hide',
                  }}
                  {...props}
                />
              </div>
            </div>
          </div>
        }>
        <Trigger
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          hasError={hasError}
          aria-required={props.required || props['aria-required']}
          aria-invalid={props['aria-invalid']}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}>
          {preset?.label ?? displayRange}
        </Trigger>
      </Popover>
    </DatePickerContext.Provider>
  );
};

export function DateRangePicker({ presets, ...props }: RangeDatePickerProps) {
  if (presets) {
    validatePresets(presets, props);
  }

  return <DateRangePickerInner presets={presets} {...props} />;
}
