/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React from 'react';

import AnimatedTestimonials from '@/components/interfaces/Home/AnimatedTestimonials';
import CardDefault from '@/components/interfaces/Home/CardDefault';
import HeroSection from '@/components/interfaces/Home/HeroSection';
import PromoCardText from '@/components/interfaces/Home/PromoCardText';
import Layout from '@/components/layouts/Default';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CardDefault />
      <PromoCardText />
      <AnimatedTestimonials autoplay={true} />
    </Layout>
  );
}
