/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { DatePreset, DateRangePreset, PickerProps } from './types';

export const DatePickerContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const formatDate = (date: Date, includeTime = false, differentFormat = false): string => {
  let dateString: string;
  const dateObj = new Date(date);

  if (includeTime) {
    if (differentFormat) {
      dateString = format(dateObj, `d MMM, yyyy HH:mm`, { locale: fr });
    } else {
      dateString = format(dateObj, `d MMMM, yyyy HH:mm`, { locale: fr });
    }
  } else {
    dateString = format(dateObj, `d MMM, yyyy`, { locale: fr });
  }

  return dateString;
};

export const validatePresets = (presets: DateRangePreset[] | DatePreset[], rules: PickerProps) => {
  const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules;

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear;
    const toYearToUse = toYear;

    presets.forEach(preset => {
      if ('date' in preset) {
        const presetYear = preset.date.getFullYear();

        if (fromYear && presetYear < fromYear) {
          throw new Error(`Preset ${preset.label} is before fromYear ${fromYearToUse}.`);
        }

        if (toYear && presetYear > toYear) {
          throw new Error(`Preset ${preset.label} is after toYear ${toYearToUse}.`);
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth();

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(`Preset ${preset.label} is before fromMonth ${fromMonth}.`);
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth();

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(`Preset ${preset.label} is after toMonth ${toMonth}.`);
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate();

          if (presetDay < fromDay.getDate()) {
            throw new Error(`Preset ${preset.label} is before fromDay ${fromDay}.`);
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate();

          if (presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is after toDay ${format(toDay, 'MMM dd, yyyy')}.`,
            );
          }
        }
      }

      if ('dateRange' in preset) {
        const presetFromYear = preset.dateRange.from?.getFullYear();
        const presetToYear = preset.dateRange.to?.getFullYear();

        if (presetFromYear && fromYear && presetFromYear < fromYear) {
          throw new Error(`Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`);
        }

        if (presetToYear && toYear && presetToYear > toYear) {
          throw new Error(`Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`);
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth();

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'from' is before fromMonth ${format(
                fromMonth,
                'MMM, yyyy',
              )}.`,
            );
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth();

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toMonth ${format(toMonth, 'MMM, yyyy')}.`,
            );
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate();

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.dateRange.from}'s 'from' is before fromDay ${format(fromDay, 'MMM dd, yyyy')}.`,
            );
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate();

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toDay ${format(toDay, 'MMM dd, yyyy')}.`,
            );
          }
        }
      }
    });
  }
};
