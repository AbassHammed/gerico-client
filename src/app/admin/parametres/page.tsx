/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Metadata } from 'next';

import Settings from '@/components/interfaces/DashboardSettings';

export const metadata: Metadata = {
  title: 'Paramètres',
};

const SettingsPage = () => <Settings />;

export default SettingsPage;
