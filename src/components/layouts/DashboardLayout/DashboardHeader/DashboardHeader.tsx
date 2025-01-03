/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { FeedbackDropdown } from './FeedbackDropdown';

const DashboardHeader = () => (
  <div className="flex h-12 max-h-12 min-h-12 items-center w-full justify-end py-2 px-5 bg-dash-sidebar border-b border-default">
    <div className="flex items-center gap-x-2">
      <FeedbackDropdown />
    </div>
  </div>
);

export default DashboardHeader;
