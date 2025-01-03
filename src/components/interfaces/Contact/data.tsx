/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import RequestADemoForm from './RequestADemoForm';

export default {
  heroSection: {
    id: 'hero',
    title: 'Gérico Transport et vous',
    h1: (
      <>
        Gérico Transport
        <span className="block">Des solutions logistiques innovantes</span>
      </>
    ),
    subheader: [
      <>
        Optimisez votre chaîne d'approvisionnement grâce à des solutions sur mesure. Faites
        confiance à notre savoir-faire pour vos projets de transport et de logistique.
      </>,
    ],
    image: <RequestADemoForm />,
  },
};
