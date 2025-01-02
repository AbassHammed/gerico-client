import { ILeaveRequest } from '@/types';
import * as chrono from 'chrono-node';
import { clsx, type ClassValue } from 'clsx';
import {
  differenceInHours,
  eachDayOfInterval,
  endOfDay,
  isWeekend,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import Holidays from 'date-holidays';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts string to KebabCase
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string): string =>
  string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .trim();

// Function to parse a date string into a Date object
export const parseDateTime = (str: Date | string) => {
  if (str instanceof Date) {
    return str;
  }
  return chrono.fr.parseDate(str);
};

export const formatDateTime = (dateTime: Date | string) =>
  new Date(dateTime).toLocaleTimeString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

export const getDateTimeLocal = (timestamp?: Date): string => {
  const d = timestamp ? new Date(timestamp) : new Date();
  if (d.toString() === 'Invalid Date') {
    return '';
  }
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(':')
    .slice(0, 2)
    .join(':');
};

/**
 * Formats the last name of a user.
 * If the last name is 3 or more characters, it returns the first letter capitalized followed by a point.
 * Otherwise, it returns the last name without modification.
 *
 * @param lastName - The last name of the user
 * @returns The formatted last name
 */
export function formatLastName(lastName: string): string {
  if (lastName.length >= 3) {
    return `${lastName.charAt(0).toUpperCase()}.`;
  }
  return lastName;
}

/**
 * Shortens the civility (Monsieur or Madame) to their respective abbreviated forms.
 *
 * @param civility - The civility string ('Monsieur' or 'Madame')
 * @returns The shortened civility ('M.' for Monsieur, 'Mme' for Madame, or the original string if not recognized)
 */
export function shortenCivility(civility: string): string {
  switch (civility.toLowerCase()) {
    case 'monsieur':
      return 'M.';
    case 'madame':
      return 'Mme';
    default:
      return civility;
  }
}

export async function downloadFile(filePath: string, fileName: string = 'bulletin.pdf') {
  const response = await fetch(filePath);
  const blob = await response.blob();
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function getWorkingDaysBetweenDates(startDate: Date, endDate: Date): number {
  const hd = new Holidays('FR');

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const allDays = eachDayOfInterval({
    start: new Date(startOfDay(startDateObj)),
    end: new Date(endOfDay(endDateObj)),
  });

  const workingDays = allDays.reduce((total, day) => {
    if (isWeekend(day) || hd.isHoliday(day)) {
      return total;
    }

    const isStartDay = day.getTime() === startOfDay(startDateObj).getTime();
    const isEndDay = day.getTime() === startOfDay(endDateObj).getTime();

    let dayFraction = 1;

    if (isStartDay && isEndDay) {
      dayFraction = differenceInHours(endDateObj, startDateObj) / 24;
    } else if (isStartDay) {
      dayFraction = (24 - differenceInHours(startOfDay(startDateObj), startDateObj)) / 24;
    } else if (isEndDay) {
      dayFraction = differenceInHours(endDateObj, startOfDay(endDateObj)) / 24;
    }

    return total + dayFraction;
  }, 0);

  return workingDays;
}

export function isUserOnLeave(leaveRequests: ILeaveRequest[]): boolean {
  const now = new Date();
  return leaveRequests.some(request =>
    isWithinInterval(now, {
      start: new Date(request.start_date),
      end: new Date(request.end_date),
    }),
  );
}
