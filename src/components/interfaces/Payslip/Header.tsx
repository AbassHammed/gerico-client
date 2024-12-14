/* eslint-disable indent */
import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { DateRangePicker } from '@/components/ui';
import { useRouterStuff } from '@/hooks/misc/use-router-stuff';
import { cn } from '@/lib/utils';
import { endOfDay, startOfDay, subDays } from 'date-fns';

const INTERVAL_DISPLAYS = [
  {
    display: 'Last 24 hours',
    value: '24h',
    shortcut: 'd',
  },
  {
    display: 'Last 7 days',
    value: '7d',
    shortcut: 'w',
  },
  {
    display: 'Last 30 days',
    value: '30d',
    shortcut: 'm',
  },
  {
    display: 'Last 3 months',
    value: '90d',
    shortcut: 't',
  },
  {
    display: 'Year to Date',
    value: 'ytd',
    shortcut: 'y',
  },
  {
    display: 'Last 12 months',
    value: '1y',
    shortcut: 'l',
  },
  {
    display: 'All Time',
    value: 'all',
    shortcut: 'a',
  },
];

const INTERVAL_DATA: Record<
  string,
  {
    startDate: Date;
    granularity: 'minute' | 'hour' | 'day' | 'month';
  }
> = {
  '24h': {
    startDate: new Date(Date.now() - 86400000),
    granularity: 'hour',
  },
  '7d': {
    startDate: new Date(Date.now() - 604800000),
    granularity: 'day',
  },
  '30d': {
    startDate: new Date(Date.now() - 2592000000),
    granularity: 'day',
  },
  '90d': {
    startDate: new Date(Date.now() - 7776000000),
    granularity: 'day',
  },
  ytd: {
    startDate: new Date(new Date().getFullYear(), 0, 1),
    granularity: 'month',
  },
  '1y': {
    startDate: new Date(Date.now() - 31556952000),
    granularity: 'month',
  },
  all: {
    startDate: new Date(2021, 5, 1),
    granularity: 'month',
  },
};

export default function PayslipListHeader() {
  const { queryParams } = useRouterStuff();

  const searchParams = useSearchParams();

  const { start, end } = useMemo(() => {
    const hasRange = searchParams?.has('start') && searchParams?.has('end');

    return {
      start: hasRange
        ? startOfDay(new Date(searchParams?.get('start') || subDays(new Date(), 1)))
        : undefined,

      end: hasRange ? endOfDay(new Date(searchParams?.get('end') || new Date())) : undefined,
    };
  }, [searchParams?.get('start'), searchParams?.get('end')]);

  // Only set interval if start and end are not provided
  const interval = start || end ? undefined : (searchParams?.get('interval') ?? '24h');

  const dateRangePicker = (
    <DateRangePicker
      className="w-full sm:min-w-[200px] md:w-fit"
      align={'end'}
      value={
        start && end
          ? {
              from: start,
              to: end,
            }
          : undefined
      }
      presetId={!start || !end ? (interval ?? '24h') : undefined}
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
          del: 'preset',
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
    <div className={cn('py-3 md:py-3 sticky top-14 z-10 bg-gray-50 shadow-md')}>
      <div
        className={cn('mx-auto flex w-full max-w-screen-xl flex-col gap-2 px-3 lg:px-10 md:h-10')}>
        <div className={cn('flex w-full flex-col  justify-end gap-2 md:flex-row items-center')}>
          <div
            className={cn(
              'flex w-full flex-col-reverse items-center gap-2 min-[550px]:flex-row md:w-auto',
            )}>
            {dateRangePicker}
          </div>
        </div>
      </div>
    </div>
  );
}
