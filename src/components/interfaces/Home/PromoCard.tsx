import React from 'react';

import { Button } from '@material-tailwind/react';

const PromoCard = () => (
  <div className="relative w-full overflow-hidden rounded-lg p-4 sm:p-6 md:p-8">
    {/* Image de fond */}
    <img
      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      alt="logistique"
      className="w-full h-auto sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-lg"
    />

    {/* Contenu superposé avec positionnement flexible */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4 sm:p-6 md:p-8 w-full max-w-[500px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Découvrez Le Roy</h2>
      <h3 className="text-md sm:text-lg lg:text-xl mb-4">Logistique en moins de 2 minutes !</h3>
      <Button
        href="#"
        className="px-4 py-2 bg-blue-500 text-white text-md font-semibold rounded-md shadow-md hover:bg-blue-600">
        Voir la vidéo
      </Button>
    </div>
  </div>
);

export default PromoCard;
