
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  promoted?: boolean;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisineType,
  rating,
  deliveryTime,
  deliveryFee,
  promoted,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`} className="group block">
      <div className="overflow-hidden rounded-xl relative">
        <div className="aspect-[4/3] w-full">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {promoted && (
          <Badge className="absolute top-2 left-2 bg-goodfood-500">
            Sponsorisé
          </Badge>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex items-center gap-1 text-sm bg-goodfood-100 text-goodfood-800 px-2 py-0.5 rounded">
            <Star className="h-3.5 w-3.5 fill-goodfood-500 text-goodfood-500" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{cuisineType}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span>{deliveryTime}</span>
          <span className="mx-2">•</span>
          <span>{deliveryFee} de livraison</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
