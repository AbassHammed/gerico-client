/* eslint-disable indent */

import { DateRangePicker } from '@/components/ui';
import { useRouterStuff } from '@/hooks/misc/use-router-stuff';
import { cn } from '@/lib/utils';

import { INTERVAL_DATA, INTERVAL_DISPLAYS } from './utils';

interface PayslipListHeaderProps {
  startDate?: Date;
  endDate?: Date;
  interval?: string;
}

export default function PayslipListHeader({
  startDate,
  endDate,
  interval = 'all',
}: PayslipListHeaderProps) {
  const { queryParams } = useRouterStuff();

  const dateRangePicker = (
    <DateRangePicker
      showYearNavigation
      className="w-full sm:min-w-[200px] md:w-fit"
      align={'end'}
      value={
        startDate && endDate
          ? {
              from: startDate,
              to: endDate,
            }
          : undefined
      }
      presetId={!startDate || !endDate ? (interval ?? 'all') : undefined}
      onChange={(range, preset) => {
        if (preset) {
          queryParams({
            del: ['start', 'end'],
            set: {
              interval: preset.id,
            },
            scroll: false,
          });

          return;
        }

        // Regular range
        if (!range || !range.from || !range.to) {
          return;
        }

        queryParams({
          del: 'interval',
          set: {
            start: range.from.toISOString(),
            end: range.to.toISOString(),
          },
          scroll: false,
        });
      }}
      presets={INTERVAL_DISPLAYS.map(({ display, value }) => {
        const start = INTERVAL_DATA[value].startDate;
        const end = new Date();

        return {
          id: value,
          label: display,
          dateRange: {
            from: start,
            to: end,
          },
        };
      })}
    />
  );

  return (
    <div className={cn('lex w-full max-w-screen-xl flex-col gap-2  md:h-10')}>
      <div className={cn('flex w-full flex-col  justify-end gap-2 md:flex-row items-center')}>
        <div
          className={cn(
            'flex w-full flex-col-reverse items-center gap-2 min-[550px]:flex-row md:w-auto',
          )}>
          {dateRangePicker && dateRangePicker}
        </div>
      </div>
    </div>
  );
}
