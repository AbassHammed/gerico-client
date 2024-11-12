export type Time = {
  HH: string;
  mm: string;
  ss: string;
};

export type TimeType = 'HH' | 'mm' | 'ss';
export type DatePickerToFrom = { to: string | null; from: string | null };

export interface TimeSplitInputProps {
  time: Time;
  setTime: (x: Time) => void;
  type?: 'default' | 'start' | 'end';
  setStartTime?: (x: Time) => void;
  setEndTime?: (x: Time) => void;
  startTime?: Time;
  endTime?: Time;
  startDate?: Date;
  endDate?: Date;
}
