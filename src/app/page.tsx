'use client';

import React from 'react';

import AnimatedTestimonials from '@/components/interfaces/Home/AnimatedTestimonials';
import CardDefault from '@/components/interfaces/Home/CardDefault';
import HeroSection from '@/components/interfaces/Home/HeroSection';
// import PromoCard from '@/components/interfaces/Home/PromoCard';
import PromoCardText from '@/components/interfaces/Home/PromoCardText';
import Footer from '@/components/shared/Footer';
// import HomeFooter from '@/components/interfaces/Home/HomeFooter';
import HomeNavbar from '@/components/shared/HomeNavbar';

export default function Home() {
  return (
    <div className="">
      <HomeNavbar />
      <HeroSection />
      <CardDefault />
      <PromoCardText />
      <AnimatedTestimonials autoplay={true} />
      <Footer />
      {/* <HomeFooter /> */}
    </div>
  );
}
