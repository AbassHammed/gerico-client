import React from 'react';

const PromoCardText = () => (
  <div className="relative w-full min-w-full flex justify-center overflow-hidden bg-gray-100 mt-[100px]">
    {/* Conteneur qui gère l'échelle pour éviter le décalage */}
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 flex flex-col lg:flex-row justify-between items-center ">
      {/* Contenu à gauche avec marge de 100px sur les grands écrans, et ajustement sur les petits écrans */}
      <div className="lg:w-1/2 text-left space-y-6 lg:pl-24 sm:px-4">
        {' '}
        {/* Ajuste la marge et le padding */}
        <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold text-gray-800">
          Un groupe transport logistique de renommée nationale
        </h1>
        <p className="text-lg sm:text-base lg:text-xl text-gray-700">
          Le Groupe GERICO, fort de 25 ans d’expérience, est un acteur majeur du transport
          logistique en France, offrant des services B2B pour divers secteurs d’activité.
        </p>
        <p className="text-lg sm:text-base lg:text-xl text-gray-700">
          GERICO propose des solutions logistiques complètes pour optimiser la Supply Chain dans des
          domaines variés, avec 1000 collaborateurs répartis sur 45 sites pour garantir qualité et
          confiance.
        </p>
      </div>

      {/* Contenu à droite avec l'image */}
      <div className="lg:w-1/2 flex justify-center p-10 mt-8 lg:mt-0">
        <img
          src="/images/employe.svg"
          alt="logistique"
          className="w-full h-auto max-w-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default PromoCardText;
