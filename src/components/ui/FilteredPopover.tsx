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
  activeOption?: string;
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
  onSaveFilter: (options: string | undefined) => void;
}

export const FilterPopover = ({
  title,
  options = [],
  activeOption,
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
  onSaveFilter,
}: FilterPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const formattedOption = () => {
    const base = options.find(x => x[valueKey] === activeOption);
    if (!base || !base[labelKey]) {
      return '';
    }
    return base[labelKey];
  };

  useEffect(() => {
    if (!open && activeOption) {
      setSelectedOption(activeOption);
    }
  }, [open, activeOption]);

  return (
    <Popover_Shadcn open={open} onOpenChange={setOpen}>
      <PopoverTrigger_Shadcn asChild>
        <Button
          asChild
          disabled={disabled}
          type={buttonType ?? (activeOption ? 'default' : 'dashed')}
          onClick={() => setOpen(false)}
          className={variant === 'rounded' ? 'rounded-full' : ''}>
          <div>
            <span>{name}</span>
            {activeOption && <span className="mr-1">:</span>}
            {activeOption && <span>{formattedOption()}</span>}
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
                    checked={activeOption === value}
                    onCheckedChange={() => {
                      if (selectedOption === value) {
                        setSelectedOption(undefined);
                      } else {
                        setSelectedOption(value);
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
              onSaveFilter(undefined);
              setSelectedOption(undefined);
              setOpen(false);
            }}>
            {clearButtonText}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onSaveFilter(selectedOption);
              setOpen(false);
            }}>
            Save
          </Button>
        </div>
      </PopoverContent_Shadcn>
    </Popover_Shadcn>
  );
};
