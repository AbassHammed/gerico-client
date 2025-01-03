/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { useSynchronizedAnimation } from '@/hooks/misc/useSynchronizedAnimation';
import { cn } from '@/lib/utils';

interface IShimmeringLoader {
  className?: string;
  delayIndex?: number;
  animationDelay?: number;
}

const ShimmeringLoader = ({
  className,
  delayIndex = 0,
  animationDelay = 150,
}: IShimmeringLoader) => {
  const ref = useSynchronizedAnimation<HTMLDivElement>('shimmer');

  return (
    <div
      ref={ref}
      className={cn('shimmering-loader rounded py-3', className)}
      style={{
        animationFillMode: 'backwards',
        animationDelay: `${delayIndex * animationDelay}ms`,
      }}
    />
  );
};

const GenericSkeletonLoader = () => (
  <div className="space-y-2">
    <ShimmeringLoader />
    <ShimmeringLoader className="w-3/4" delayIndex={1} />
    <ShimmeringLoader className="w-1/2" delayIndex={2} />
  </div>
);

function GenericSkeletonLoaderList() {
  return (
    <div className="my-10 space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <GenericSkeletonLoader key={index} />
      ))}
    </div>
  );
}

export { GenericSkeletonLoader, GenericSkeletonLoaderList };
export default ShimmeringLoader;
