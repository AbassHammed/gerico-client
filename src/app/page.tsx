'use client';

import React from 'react';

import AnimatedTestimonials from '@/components/interfaces/Home/AnimatedTestimonials';
import CardDefault from '@/components/interfaces/Home/CardDefault';
import HeroSection from '@/components/interfaces/Home/HeroSection';
import HomeFooter from '@/components/interfaces/Home/HomeFooter';
import HomeNavbar from '@/components/interfaces/Home/HomeNavbar';
// import PromoCard from '@/components/interfaces/Home/PromoCard';
import PromoCardText from '@/components/interfaces/Home/PromoCardText';

export default function Home() {
  return (
    <div className="">
      <HomeNavbar />
      <HeroSection />
      <CardDefault />
      <PromoCardText />
      <AnimatedTestimonials autoplay={true} />
      <HomeFooter />
    </div>
  );
}
