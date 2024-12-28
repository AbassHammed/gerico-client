import React from 'react';

const PromoCardText = () => (
  <div className="flex flex-col lg:flex-row justify-between items-center py-16 px-8 lg:px-16 bg-gray-100">
    {/* Contenu à gauche */}
    <div className="lg:w-1/2 text-left space-y-6">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
        Un groupe transport logistique de renommée nationale et internationale
      </h1>
      <p className="text-lg lg:text-xl p-10 pt-5 text-gray-700">
        Le Groupe GERICO est une entreprise de transport logistique française implantée sur le
        territoire national. Il totalise plus de 25 ans d’expérience en transport routier et en
        gestion logistique à destination des professionnels (B2B) sur l’ensemble des secteurs
        d’activité pour tout type de produits.
      </p>
      <p className="text-lg lg:text-xl text-gray-700 p-10 pt-0">
        En qualité de prestataire logistique, GERICO propose une gamme complète de services
        transport et d’opérations logistiques visant à apporter des solutions pour optimiser la
        Supply Chain dans les domaines de la grande distribution, l’agroalimentaire, le BTP, les
        biens de consommation et bien d’autres secteurs. Nos 1000 collaborateurs permanents répartis
        sur nos 45 plateformes et entrepôts logistiques sont à votre écoute pour vous garantir une
        prestation de qualité et entretenir une relation de confiance.
      </p>
    </div>

    {/* Contenu à droite avec l'image */}
    <div className="lg:w-1/2 p-10 mt-8 lg:mt-0">
      <img
        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        alt="logistique"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
);

export default PromoCardText;
