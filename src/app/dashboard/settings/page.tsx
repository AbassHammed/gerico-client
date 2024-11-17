import { Metadata } from 'next';

import Settings from '@/components/interfaces/DashboardSettings';

export const metadata: Metadata = {
  title: {
    default: 'Settings',
    template: '%s ~ Gerico',
  },
};

const SettingsPage = () => <Settings />;

export default SettingsPage;
