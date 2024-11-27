'use client';

import Loader, { LoaderProps } from './Loader';

export default function Loading({ size, desktopSize, mobileSize, boxColors }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader size={size} desktopSize={desktopSize} mobileSize={mobileSize} boxColors={boxColors} />
    </div>
  );
}
