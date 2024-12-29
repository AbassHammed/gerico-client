import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const cardData = [
  {
    title: 'Logistique & E-commerce',
    description:
      "Découvrez nos solutions adaptées à l'industrie du e-commerce pour optimiser la gestion des livraisons et des flux logistiques.",
    imageUrl: '/images/entrepot-2.svg',
    link: '/',
  },
  {
    title: 'Logistique industrielle',
    description:
      "Optimisez vos chaînes d'approvisionnement industrielles grâce à notre expertise en transport et gestion des flux.",
    imageUrl: '/images/camion.svg',
    link: '/',
  },
  {
    title: 'Transport & Mobilité',
    description:
      'GERICO offre des solutions de transport innovantes et écologiques pour répondre à vos besoins en mobilité.',
    imageUrl: '/images/siege.svg',
    link: '/',
  },
];

function CardDefault() {
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-8 lg:px-0 py-5">
      {cardData.map((card, index) => (
        <a
          key={index}
          href={card.link}
          className="w-full sm:w-96 lg:w-80 flex flex-col hover:shadow-lg transition-shadow duration-300 no-underline">
          <Card className="h-full flex flex-col">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={card.imageUrl}
                alt={`Image ${card.title}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </CardHeader>
            <CardBody className="flex-grow min-h-[150px]">
              <Typography variant="h5" color="blue-gray" className="mb-4">
                {card.title}
              </Typography>
              <Typography className="text-gray-600">{card.description}</Typography>
            </CardBody>
            <CardFooter className="pt-4 flex justify-end items-center">
              <span className="text-brand-300 text-lg font-bold">&#8594;</span>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default CardDefault;