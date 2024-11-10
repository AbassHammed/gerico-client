import { IRoute } from '@/types';
import { Plus, Settings, Users } from 'lucide-react';

export const ICON_SIZE = 20;
export const ICON_STROKE_WIDTH = 1.5;

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
    link: '/dashboard/all-users',
  },
];

export const generateSettingsRoutes = (): IRoute[] => [
  {
    key: 'settings',
    label: 'Org Settings',
    icon: <Settings size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: `/dashboard/settings/general`,
  },
];
