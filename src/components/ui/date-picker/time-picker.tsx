import React, { useEffect, useLayoutEffect } from 'react';

import { buttonVariants } from '@/components/ui/shadcn/ui/button';
import { ScrollArea } from '@/components/ui/shadcn/ui/scroll-area';
import { cn, parseDateTime } from '@/lib/utils';

import { DateRange } from './types';

const AVAILABLE_TIMES = ['00:00', '12:00'];

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
    return value?.[rangeType].toTimeString().slice(0, 5);
  }, [value]);

  const formatSelectedTime = React.useCallback(
    (time: string) => {
      const newDate = parseDateTime(value?.[rangeType] ?? new Date());
      const [hours, minutes] = time.split(':').map(Number);
      newDate.setHours(hours, minutes, 0);
      onValueChange({
        ...value!,
        [rangeType]: newDate,
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

      const totalItems = AVAILABLE_TIMES.length;

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
          formatSelectedTime(AVAILABLE_TIMES[activeIndex]);
        }
      };

      const reset = () => {
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
    (index: number) => {
      formatSelectedTime(AVAILABLE_TIMES[index]);
      setActiveIndex(index);
    },
    [formatSelectedTime],
  );

  useLayoutEffect(() => {
    if (!value || !value[rangeType]) {
      return;
    }
    const time = value[rangeType].toTimeString().slice(0, 5);
    const index = AVAILABLE_TIMES.indexOf(time);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [value]);

  useEffect(() => {
    if (activeIndex !== -1) {
      setTimeout(() => {
        const currentElm = document.getElementById(`time-${activeIndex}`);
        currentElm?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 0);
    }
  }, [activeIndex]);

  return (
    <div className="space-y-2 pr-3 py-3 relative">
      <h3 className="text-sm font-medium">Heure</h3>
      <ScrollArea
        onKeyDown={handleKeydown}
        className="h-[90%] w-full focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 py-0.5">
        <ul className={cn('flex items-center flex-col gap-1 h-full max-h-56 w-28 px-1 py-0.5')}>
          {AVAILABLE_TIMES.map((time, index) => (
            <li
              key={`time-${index}`}
              id={`time-${index}`}
              aria-label="currentTime"
              className={cn(
                buttonVariants({
                  variant: formattedTime === time ? 'default' : 'outline',
                }),
                'h-8 px-3 w-full text-sm focus-visible:outline-0 outline-0 focus-visible:border-0 cursor-default ring-0',
                formattedTime === time && 'bg-primary text-primary-foreground',
              )}
              onClick={() => handleClick(index)}>
              {time}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default TimePicker;
