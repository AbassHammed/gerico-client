import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

function CardDefault() {
  return (
    <div className="flex flex-wrap justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-10 px-4 sm:px-8 lg:px-0">
      {/* Première carte */}
      <Card className="w-full sm:w-80 lg:w-80">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Expansion du réseau GERICO
          </Typography>
          <Typography>
            Le groupe GERICO vient d'ouvrir une nouvelle plateforme logistique à Lyon, permettant
            ainsi une gestion plus rapide des flux entre le nord et le sud de la France. Cette
            expansion va également permettre de réduire les délais de livraison pour nos clients
            dans la région.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>En savoir plus</Button>
        </CardFooter>
      </Card>

      {/* Deuxième carte */}
      <Card className="w-full sm:w-80 lg:w-80">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Partenariat avec Carrefour
          </Typography>
          <Typography>
            GERICO a signé un partenariat stratégique avec Carrefour pour optimiser les livraisons
            dans toute la France. Ce partenariat va permettre d'améliorer les délais de
            réapprovisionnement des magasins tout en réduisant les coûts opérationnels.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>En savoir plus</Button>
        </CardFooter>
      </Card>

      {/* Troisième carte */}
      <Card className="w-full sm:w-80 lg:w-80">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            GERICO investit dans la technologie
          </Typography>
          <Typography>
            Dans un effort pour rester à la pointe de l'innovation, GERICO a investi dans de
            nouvelles technologies d'automatisation pour ses entrepôts. Ce projet vise à augmenter
            l'efficacité et à réduire les erreurs humaines dans la gestion des stocks.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>En savoir plus</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardDefault;
