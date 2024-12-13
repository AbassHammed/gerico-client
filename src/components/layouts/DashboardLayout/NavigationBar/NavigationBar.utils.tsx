import { CalendarDateIcon } from '@/components/ui';
import { IRoute } from '@/types';
import { FilePen, Files, Plus, Settings, Users } from 'lucide-react';

export const ICON_SIZE = 20;
export const ICON_STROKE_WIDTH = 1.5;

export const generateDateRoute = (): IRoute[] => {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(today);

  return [
    {
      key: 'calendar',
      label: formattedDate,
      icon: (
        <CalendarDateIcon
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          date={today.getDate().toString()}
        />
      ),
    },
  ];
};

export const generateToolRoutes = (): IRoute[] => [
  {
    key: 'new:user',
    label: 'Create new employee',
    icon: <Plus size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: '/dashboard/new-user',
  },
  {
    key: 'all:employees',
    label: 'All employees',
    icon: <Users size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: '/dashboard/employees',
  },
  {
    key: 'create:payslip',
    label: 'Create payslip',
    icon: <FilePen size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: '/dashboard/create-payslip',
  },
  {
    key: 'all:payslip',
    label: 'Payslip list',
    icon: <Files size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: '/dashboard/payslips',
  },
];

export const generateSettingsRoutes = (): IRoute[] => [
  {
    key: 'settings',
    label: 'Org Settings',
    icon: <Settings size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: `/dashboard/settings`,
  },
];
