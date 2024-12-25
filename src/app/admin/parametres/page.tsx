import { Metadata } from 'next';

import Settings from '@/components/interfaces/DashboardSettings';

export const metadata: Metadata = {
  title: 'Paramètres',
};

const SettingsPage = () => <Settings />;

export default SettingsPage;
