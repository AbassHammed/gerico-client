'use client';

import React from 'react';

const HeroSection = () => (
  <div className="relative w-full h-[70vh]  flex items-center justify-center overflow-hidden">
    <div className="w-full max-w-7xl mx-auto px-4">
      <svg
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3333 3094"
        preserveAspectRatio="none">
        <path d="M3333 0.5V3093.5L0 975V0.5H3333Z" fill="#E2EDF9" />
      </svg>

      <div className="relative z-10 max-w-3xl text-left text-gray-800 pl-6 sm:pl-12 lg:pl-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Entreprise <span className="text-brand-300">logistique</span> et{' '}
          <span className="text-brand-300">transport routier</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-xl font-bold mb-6">
          Spécialisés dans le transport routier de marchandises depuis{' '}
          <span className="text-brand-300">1999</span>, nous offrons des solutions adaptées aux
          besoins de chaque client.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Optimisez votre chaîne d'approvisionnement grâce à des solutions sur mesure. Faites
          confiance à notre savoir-faire pour vos projets de transport et de logistique.
        </p>
        <a
          href="#"
          className="mt-4 inline-block px-6 py-3 bg-brand-300 text-white text-lg font-medium rounded-md shadow-md hover:bg-brand-400">
          Contactez-nous
        </a>
      </div>
    </div>
  </div>
);

export default HeroSection;
