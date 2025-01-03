/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// Source: https://youtu.be/3kDVachh-BM

let stashedTime: number | null = null;

export function useSynchronizedAnimation<T>(name: string = 'shimmer') {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const animations = document
      .getAnimations()
      .filter(animation => animation instanceof CSSAnimation && animation.animationName === name);

    const myAnimation = animations.find(
      animation =>
        animation.effect instanceof KeyframeEffect && animation.effect.target === ref.current,
    );

    if (myAnimation === undefined) {
      return;
    }

    const leadAnimation = animations[0];

    if (myAnimation === leadAnimation && stashedTime) {
      myAnimation.currentTime = stashedTime;
    }

    if (myAnimation !== leadAnimation) {
      myAnimation.currentTime = leadAnimation.currentTime;
    }

    return () => {
      if (myAnimation === leadAnimation && myAnimation.currentTime) {
        stashedTime = Number(myAnimation.currentTime);
      }
    };
  }, []);

  return ref;
}
