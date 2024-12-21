'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Button,
  Checkbox,
  Label_Shadcn,
  Popover_Shadcn,
  PopoverContent_Shadcn,
  PopoverTrigger_Shadcn,
  ScrollArea,
} from '@ui';

interface FilterPopoverProps {
  title?: string;
  options: any[];
  activeOptions: any[];
  valueKey: string;
  labelKey: string;
  iconKey?: string;
  name: string;
  variant?: 'rectangular' | 'rounded';
  buttonType?: 'default' | 'dashed';
  disabled?: boolean;
  labelClass?: string;
  maxHeightClass?: string;
  clearButtonText?: string;
  onSaveFilters: (options: string[]) => void;
}

export const FilterPopover = ({
  title,
  options = [],
  activeOptions = [],
  valueKey,
  labelKey,
  iconKey = 'icon',
  name = 'default',
  variant = 'rectangular',
  buttonType,
  disabled,
  labelClass,
  maxHeightClass = 'h-[205px]',
  clearButtonText = 'Clear',
  onSaveFilters,
}: FilterPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const formattedOptions = activeOptions.map(option => {
    const base = options.find(x => x[valueKey] === option);
    if (!base || !base[labelKey]) {
      return '';
    }
    return base[labelKey];
  });

  useEffect(() => {
    if (!open && activeOptions.length > 0) {
      setSelectedOptions(activeOptions);
    }
  }, [open, activeOptions]);

  return (
    <Popover_Shadcn open={open} onOpenChange={setOpen}>
      <PopoverTrigger_Shadcn asChild>
        <Button
          asChild
          disabled={disabled}
          type={buttonType ?? (activeOptions.length > 0 ? 'default' : 'dashed')}
          onClick={() => setOpen(false)}
          className={variant === 'rounded' ? 'rounded-full' : ''}>
          <div>
            <span>{name}</span>
            {activeOptions.length > 0 && <span className="mr-1">:</span>}
            {activeOptions.length >= 3 ? (
              <span>
                {formattedOptions[0]} and {activeOptions.length - 1} others
              </span>
            ) : activeOptions.length > 0 ? (
              <span>{formattedOptions.join(', ')}</span>
            ) : null}
          </div>
        </Button>
      </PopoverTrigger_Shadcn>
      <PopoverContent_Shadcn className="p-0 w-44" align="start">
        <div className="border-b border-overlay bg-surface-200 rounded-t pb-1 px-3">
          <span className="text-xs text-foreground-light">
            {title ?? `Select ${name.toLowerCase()}`}
          </span>
        </div>
        <ScrollArea className={options.length > 7 ? maxHeightClass : ''}>
          <div className="p-3 flex flex-col gap-y-2">
            {options.map(option => {
              const value = option[valueKey];
              const icon = iconKey ? option[iconKey] : undefined;

              return (
                <div key={value} className="flex items-center gap-x-2">
                  <Checkbox
                    id={value}
                    checked={selectedOptions.includes(value)}
                    onCheckedChange={() => {
                      if (selectedOptions.includes(value)) {
                        setSelectedOptions(selectedOptions.filter(x => x !== value));
                      } else {
                        setSelectedOptions(selectedOptions.concat(value));
                      }
                    }}
                  />
                  <Label_Shadcn
                    htmlFor={option[valueKey]}
                    className={cn('flex items-center gap-x-2', labelClass)}>
                    {icon && (
                      <img
                        src={icon}
                        alt={option[labelKey]}
                        className={cn('w-4 h-4', option.iconClass)}
                      />
                    )}
                    <span>{option[labelKey]}</span>
                  </Label_Shadcn>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-end gap-2 border-t border-overlay bg-surface-200 py-2 px-3">
          <Button
            size="tiny"
            type="default"
            onClick={() => {
              onSaveFilters([]);
              setSelectedOptions([]);
              setOpen(false);
            }}>
            {clearButtonText}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              // Order the selection based on the options provided
              const sortingOrder = options.map(option => option[valueKey]);
              const sortedSelection = selectedOptions.sort(
                (a, b) => sortingOrder.indexOf(a) - sortingOrder.indexOf(b),
              );
              onSaveFilters(sortedSelection);
              setOpen(false);
            }}>
            Save
          </Button>
        </div>
      </PopoverContent_Shadcn>
    </Popover_Shadcn>
  );
};
