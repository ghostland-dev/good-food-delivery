
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { toast } from "@/components/ui/use-toast";

// Constantes pour la démonstration
const RESTAURANT_LOCATION: [number, number] = [48.8738, 2.3596]; // Restaurant Burger House à Paris
const CLIENT_LOCATION: [number, number] = [48.8584, 2.2945]; // Client à Paris

// Route de livraison simulée
const DELIVERY_ROUTE: LatLngExpression[] = [
  RESTAURANT_LOCATION,
  [48.8689, 2.3423],
  [48.8656, 2.3212],
  [48.8619, 2.3079],
  CLIENT_LOCATION
];

export const useDeliveryState = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [hasCurrentDelivery, setHasCurrentDelivery] = useState(false);
  const [driverPosition, setDriverPosition] = useState<[number, number]>(RESTAURANT_LOCATION);
  const [showMap, setShowMap] = useState(false);
  
  const toggleAvailability = () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    toast({
      title: newStatus ? "Vous êtes en ligne" : "Vous êtes hors ligne",
      description: newStatus ? "Vous pouvez maintenant recevoir des commandes" : "Vous ne recevrez plus de commandes"
    });
  };
  
  const acceptDelivery = () => {
    setHasCurrentDelivery(true);
    setShowMap(true);
    toast({
      title: "Livraison acceptée",
      description: "Vous avez accepté la livraison pour Restaurant Burger House"
    });
  };
  
  const completeDelivery = () => {
    setHasCurrentDelivery(false);
    setShowMap(false);
    toast({
      title: "Livraison terminée",
      description: "Vous avez terminé la livraison avec succès."
    });
  };

  const handleDriverPositionChange = (position: [number, number]) => {
    setDriverPosition(position);
  };

  const toggleNavigate = () => {
    setShowMap(!showMap);
    if (!showMap) {
      toast({
        title: "Navigation activée",
        description: "Suivez votre itinéraire sur la carte"
      });
    }
  };

  return {
    isAvailable,
    hasCurrentDelivery,
    driverPosition,
    showMap,
    toggleAvailability,
    acceptDelivery,
    completeDelivery,
    handleDriverPositionChange,
    toggleNavigate,
    restaurantLocation: RESTAURANT_LOCATION,
    clientLocation: CLIENT_LOCATION,
    deliveryRoute: DELIVERY_ROUTE,
  };
};
