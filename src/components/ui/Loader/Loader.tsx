'use client';

import React, { useMemo } from 'react';

import styles from './Loader.module.css';

export interface LoaderProps {
  className?: string;
  background?: string;
  boxColors?: string[];
  size?: string;
  desktopSize?: string;
  mobileSize?: string;
}

const Loader: React.FC<LoaderProps> = ({
  className = '',
  background = 'transparent',
  boxColors = ['#333333', '#333333', '#333333'],
  size = '64px',
  desktopSize = '',
  mobileSize = '',
}) => {
  const containerStyle = useMemo(() => {
    const baseSize = parseInt(size);
    const mobileWidth = mobileSize ? parseInt(mobileSize) : baseSize;
    const desktopWidth = desktopSize ? parseInt(desktopSize) : baseSize * 2;

    return {
      '--xlvi-size-mobile': `${mobileWidth}px`,
      '--xlvi-size-desktop': `${desktopWidth}px`,
      '--xlvi-background': background,
      '--xlvi-color-1': boxColors[0],
      '--xlvi-color-2': boxColors[1] || boxColors[0],
      '--xlvi-color-3': boxColors[2] || boxColors[0],
    } as React.CSSProperties;
  }, [size, mobileSize, desktopSize, background, boxColors]);

  return (
    <div className={`${styles.xlviLoader} ${className}`} style={containerStyle}>
      <div className={`${styles.box} ${styles.box1}`} />
      <div className={`${styles.box} ${styles.box2}`} />
      <div className={`${styles.box} ${styles.box3}`} />
    </div>
  );
};

export default Loader;
