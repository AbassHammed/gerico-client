'use client';

import React, { useEffect, useLayoutEffect } from 'react';

import { buttonVariants } from '@/components/ui/shadcn/ui/button';
import { ScrollArea } from '@/components/ui/shadcn/ui/scroll-area';
import { cn, parseDateTime } from '@/lib/utils';

import { DateRange } from './types';

const DEFAULT_SIZE = 96;
const TIMESTAMP = 15;

interface TimePickerProps {
  value?: DateRange;
  onValueChange: (date: DateRange) => void;
  rangeType: 'to' | 'from';
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onValueChange, rangeType }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const formattedTime = React.useMemo(() => {
    if (!value || !value?.[rangeType]) {
      return '';
    }
    const hours = value?.[rangeType].getHours();
    const minutes = value?.[rangeType].getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }, [value]);

  const formatSelectedTime = React.useCallback(
    (hour: number, part: number) => {
      const newVal = parseDateTime(value?.[rangeType] ?? new Date());

      if (!newVal) {
        return;
      }

      newVal.setHours(hour, part === 0 ? 0 : TIMESTAMP * part);

      onValueChange({
        ...value!,
        [rangeType]: newVal,
      });
    },
    [value, onValueChange],
  );

  const handleKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!document) {
        return;
      }

      const totalItems = DEFAULT_SIZE;

      const moveNext = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % totalItems);
      };

      const movePrev = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
      };

      const setElement = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`);
        if (currentElm) {
          currentElm.focus();
          const timeValue = currentElm.textContent ?? '';
          const [hourStr, minuteStr] = timeValue.split(':');
          const hour = parseInt(hourStr);
          const part = Math.floor(parseInt(minuteStr) / TIMESTAMP);
          formatSelectedTime(hour, part);
        }
      };

      const reset = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`);
        currentElm?.blur();
        setActiveIndex(-1);
      };

      switch (e.key) {
        case 'ArrowDown':
          moveNext();
          break;
        case 'ArrowUp':
          movePrev();
          break;
        case 'Escape':
          reset();
          break;
        case 'Enter':
          setElement();
          break;
      }
    },
    [activeIndex, formatSelectedTime],
  );

  const handleClick = React.useCallback(
    (hour: number, part: number, currentIndex: number) => {
      formatSelectedTime(hour, part);
      setActiveIndex(currentIndex);
    },
    [formatSelectedTime],
  );

  useLayoutEffect(() => {
    if (!value || !value[rangeType]) {
      return;
    }

    const hours = value?.[rangeType].getHours();
    const minutes = value?.[rangeType].getMinutes();
    const part = Math.floor(minutes / TIMESTAMP);
    const trueIndex = hours * 4 + part;
    setActiveIndex(trueIndex);

    setTimeout(() => {
      const currentElm = document.getElementById(`time-${trueIndex}`);
      currentElm?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 0);
  }, [value]);

  useEffect(() => {
    if (activeIndex === -1) {
      return;
    }

    setTimeout(() => {
      const currentElm = document.getElementById(`time-${activeIndex}`);
      currentElm?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 0);
  }, [activeIndex]);

  return (
    <div className="space-y-2 pr-3 py-3 relative">
      <h3 className="text-sm font-medium">Heure</h3>
      <ScrollArea
        onKeyDown={handleKeydown}
        className="h-[90%] w-full focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 py-0.5">
        <ul className={cn('flex items-center flex-col gap-1 h-full max-h-56 w-28 px-1 py-0.5')}>
          {Array.from({ length: 24 }).map((_, i) =>
            Array.from({ length: 4 }).map((_, part) => {
              const trueIndex = i * 4 + part;
              const currentValue = `${i.toString().padStart(2, '0')}:${(part === 0 ? '00' : TIMESTAMP * part).toString().padStart(2, '0')}`;
              const isSelected = currentValue === formattedTime;

              return (
                <li
                  key={`time-${trueIndex}`}
                  id={`time-${trueIndex}`}
                  aria-label="currentTime"
                  className={cn(
                    buttonVariants({
                      variant: isSelected ? 'default' : 'outline',
                    }),
                    'h-8 px-3 w-full text-sm focus-visible:outline-0 outline-0 focus-visible:border-0 cursor-default ring-0',
                    isSelected && 'bg-primary text-primary-foreground',
                  )}
                  onClick={() => handleClick(i, part, trueIndex)}>
                  {currentValue}
                </li>
              );
            }),
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default TimePicker;
