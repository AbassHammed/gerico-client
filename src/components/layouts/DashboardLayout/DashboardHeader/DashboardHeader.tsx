'use client';

import { FeedbackDropdown } from './FeedbackDropdown';
import RouteDropdown from './RouteDropdown';

const DashboardHeader = () => (
  <div className="flex h-12 max-h-12 min-h-12 items-center w-full justify-between py-2 px-5 bg-dash-sidebar border-b border-default">
    <div className="-ml-2 flex items-center text-sm">
      <span className="flex items-center space-x-2 pr-2 text-xs">Gérico</span>
      <span className="text-border-stronger">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision">
          <path d="M16 3.549L7.12 20.600"></path>
        </svg>
      </span>

      <RouteDropdown />
    </div>

    <div className="flex items-center gap-x-2">
      <FeedbackDropdown />
    </div>
  </div>
);

export default DashboardHeader;
