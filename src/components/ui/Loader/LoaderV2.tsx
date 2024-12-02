/* eslint-disable space-before-function-paren */
'use client';

import React, { useEffect, useRef } from 'react';

import { useMediaQuery } from '@/hooks/misc/useMediaQuery';
import { Elastic, gsap } from 'gsap';
import * as THREE from 'three';

interface LoaderV2Props {
  className?: string;
  textColor?: string;
  ringColor?: string;
  ringShiness?: number;
  ringOpacity?: number;
  ringTransparency?: boolean;
  ringLightColor?: string;
  ringLightIntensity?: number;
  ringAmbientLightColor?: string;
  textBeforeRing?: string;
  textAfterRing?: string;
  size?: string;
  desktopSize?: string;
  mobileSize?: string;
}

const LoaderV2: React.FC<LoaderV2Props> = ({
  className,
  textColor = `#4F46E5`,
  ringColor = `#4F46E5`,
  ringShiness = 20,
  ringOpacity = 0.96,
  ringTransparency = true,
  ringLightColor = `#FFFFFF`,
  ringLightIntensity = 0,
  ringAmbientLightColor = `#eef4ff`,
  textBeforeRing = `GERIC`,
  textAfterRing = `...`,
  size = `64px`,
  desktopSize = ``,
  mobileSize = ``,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktopOrLaptop = useMediaQuery('(min-width: 1224px)');
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');

  let sizeFound = 0.0;
  if (isDesktopOrLaptop) {
    if (desktopSize !== '') {
      sizeFound = parseFloat(desktopSize);
    } else {
      sizeFound = parseFloat(size) * 2;
    }
  }
  if (isTabletOrMobile) {
    if (mobileSize !== '') {
      sizeFound = parseFloat(mobileSize);
    } else {
      sizeFound = parseFloat(size);
    }
  }

  const sizePassed = parseFloat(sizeFound.toString());
  const sizeRing = (sizePassed * 40) / 64;
  const sizeFont = (sizePassed * 32) / 64;
  const sizeXf = (sizePassed * 8) / 64;
  const sizeXl = (sizePassed * 5) / 64;
  const sizeXfUpdate = (sizePassed * 14) / 64;
  const sizeXlUpdate = (sizePassed * 12) / 64;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    const Ring3D = (innerRadius: number, outerRadius: number, height: number, segments: number) => {
      const extrudeSettings = {
        depth: height,
        bevelEnabled: false,
        curveSegments: segments,
      };
      const arcShape = new THREE.Shape();

      arcShape.moveTo(outerRadius, 0);
      arcShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

      const holePath = new THREE.Path();
      holePath.moveTo(innerRadius, 0);
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      arcShape.holes.push(holePath);

      return new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
    };

    renderer.setSize(sizeRing, sizeRing);
    renderer.setPixelRatio(8);

    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 40 / 40, 0.1, 1000);

    camera.position.z = 89;

    const shape = Ring3D(12, 20, 9, 60);
    shape.translate(0, 0, -4.5);
    const material = new THREE.MeshPhongMaterial({
      color: ringColor,
      shininess: ringShiness,
      opacity: ringOpacity,
      transparent: ringTransparency,
    });
    const object = new THREE.Mesh(shape, material);

    scene.add(object);

    const lightTop = new THREE.DirectionalLight(ringLightColor, ringLightIntensity);
    lightTop.position.set(0, 40, 80);
    lightTop.castShadow = true;
    scene.add(lightTop);

    const lightCenter = new THREE.DirectionalLight(ringLightColor, ringLightIntensity);
    lightCenter.position.set(0, 20, 0);
    lightCenter.castShadow = true;
    scene.add(lightCenter);

    const lightBottom = new THREE.DirectionalLight(ringLightColor, ringLightIntensity);
    lightBottom.position.set(0, -40, 80);
    lightBottom.castShadow = true;
    scene.add(lightBottom);

    scene.add(new THREE.AmbientLight(ringAmbientLightColor));

    const offset = {
      xf: sizeXf,
      xl: sizeXl,
    };

    new gsap.timeline({
      repeat: -1,
      yoyo: true,
      onUpdate: function () {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--x-f', `${offset.xf}px`);
          containerRef.current.style.setProperty('--x-l', `${offset.xl}px`);
        }
      },
      repeatDelay: 0.32,
    })
      .to(offset, 1.6, {
        ease: Elastic.easeInOut.config(1.2, 0.5),
        xf: sizeXfUpdate,
        xl: sizeXlUpdate,
      })
      .to(
        object.rotation,
        1.6,
        {
          ease: Elastic.easeInOut.config(1.2, 0.5),
          x: THREE.MathUtils.degToRad(90),
          y: THREE.MathUtils.degToRad(90),
        },
        0,
      );

    const render = function () {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
  }, [
    ringColor,
    ringShiness,
    ringOpacity,
    ringTransparency,
    ringLightColor,
    ringLightIntensity,
    ringAmbientLightColor,
    sizeRing,
    sizeXf,
    sizeXl,
    sizeXfUpdate,
    sizeXlUpdate,
  ]);

  return (
    <div ref={containerRef} className={`flex items-center ${className}`}>
      <span
        className="block font-['Roboto',Arial] font-black tracking-[4px]"
        style={{
          fontSize: `${sizeFont}px`,
          color: textColor,
          transform: `translateX(var(--x-f, ${sizeXf}px))`,
        }}>
        {textBeforeRing}
      </span>
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          width: `${sizeRing}px`,
          height: `${sizeRing}px`,
          transform: 'translateY(-1px)',
        }}></canvas>
      <span
        className="block font-['Roboto',Arial] font-black tracking-[4px]"
        style={{
          fontSize: `${sizeFont}px`,
          color: textColor,
          transform: `translateX(calc(var(--x-l, ${sizeXl}px) * -1))`,
        }}>
        {textAfterRing}
      </span>
    </div>
  );
};

export default LoaderV2;
