import { CalendarDateIcon } from '@/components/ui';
import { PagesRoutes } from '@/lib/constants';
import { IRoute } from '@/types';
import { ArrowLeft, CalendarArrowUp, FilePen, Files, Plus, Settings, Users } from 'lucide-react';

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
    key: 'all:employees',
    label: 'Tous les employés',
    icon: <Users size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_Employees,
  },
  {
    key: 'new:user',
    label: 'Ajouter un employé',
    icon: <Plus size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_CreateEmployee,
  },

  {
    key: 'create:payslip',
    label: 'Créer un bulletin de paie',
    icon: <FilePen size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_CreatePayslip,
  },
  {
    key: 'all:payslip',
    label: 'Liste des bulletins de paie',
    icon: <Files size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_AllPayslips,
  },
  {
    key: 'approve:leaves',
    label: 'Approuver les congés',
    icon: <CalendarArrowUp size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_ApproveLeaves,
  },
];

export const generateSettingsRoutes = (): IRoute[] => [
  {
    key: 'homepage',
    label: 'Accueil employé',
    icon: <ArrowLeft size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Employee_Home,
  },
  {
    key: 'settings',
    label: 'Paramètres',
    icon: <Settings size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    link: PagesRoutes.Admin_Settings,
  },
];
