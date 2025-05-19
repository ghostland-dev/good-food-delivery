
import { useState, useEffect } from "react";
import DriverHeader from "@/components/driver/DriverHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Navigation, Package } from "lucide-react";
import DeliveryMap from "@/components/map/DeliveryMap";
import { LatLngExpression } from "leaflet";

// Données de démonstration pour la carte
const restaurantLocation: [number, number] = [48.8738, 2.3596]; // Restaurant Burger House à Paris
const clientLocation: [number, number] = [48.8584, 2.2945]; // Client à Paris

// Route de livraison simulée
const deliveryRoute: LatLngExpression[] = [
  restaurantLocation,
  [48.8689, 2.3423],
  [48.8656, 2.3212],
  [48.8619, 2.3079],
  clientLocation
];

const DriverHome = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [hasCurrentDelivery, setHasCurrentDelivery] = useState(false);
  const [driverPosition, setDriverPosition] = useState<[number, number]>(restaurantLocation);
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

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <DriverHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Bonjour, Thomas 👋</h1>
            <p className="text-muted-foreground">Prêt pour de nouvelles livraisons aujourd'hui ?</p>
          </div>
          
          <div className="flex items-center gap-2 bg-background p-2 rounded-full border">
            <span className="text-sm font-medium">
              {isAvailable ? "Disponible" : "Indisponible"}
            </span>
            <Switch checked={isAvailable} onCheckedChange={toggleAvailability} />
          </div>
        </div>

        {showMap && hasCurrentDelivery && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Suivi de trajet en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryMap
                center={[48.8566, 2.3522]} // Paris
                zoom={12}
                height="400px"
                locations={[
                  { name: "Restaurant Burger House", position: restaurantLocation, type: "restaurant", description: "12 Avenue des Champs-Élysées, 75008 Paris" },
                  { name: "Marie Dupont", position: clientLocation, type: "client", description: "24 Rue du Commerce, 75015 Paris" }
                ]}
                routePath={deliveryRoute}
                currentDriverPosition={driverPosition}
                onDriverPositionChange={handleDriverPositionChange}
              />
              <div className="mt-4 text-sm">
                <p className="font-medium">Progression de livraison:</p>
                <div className="w-full bg-muted h-2 rounded-full mt-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.min(100, (deliveryRoute.indexOf(driverPosition as any) / (deliveryRoute.length - 1)) * 100) || 10}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span>Restaurant</span>
                  <span>Client</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {isAvailable && !hasCurrentDelivery && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle livraison disponible</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Restaurant</span>
                    <span>Burger House</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Adresse de livraison</span>
                    <span className="text-right">24 Rue du Commerce<br/>75015 Paris</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Distance</span>
                    <span>2.4 km</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Rémunération estimée</span>
                    <span className="text-lg font-bold">6,50 €</span>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1" 
                      variant="default"
                      onClick={acceptDelivery}
                    >
                      Accepter
                    </Button>
                    <Button 
                      className="flex-1" 
                      variant="outline"
                    >
                      Refuser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Gains du jour</span>
                    <span className="text-2xl font-bold">24,50 €</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Livraisons effectuées</span>
                    <span className="font-medium">4</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Temps en ligne</span>
                    <span className="font-medium">3h 45min</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Distance parcourue</span>
                    <span className="font-medium">18 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {isAvailable && hasCurrentDelivery && (
          <Card>
            <CardHeader>
              <CardTitle>Livraison en cours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Restaurant Burger House</h3>
                  <p className="text-sm text-muted-foreground">12 Avenue des Champs-Élysées, 75008 Paris</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Afficher l'itinéraire
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Client : Marie Dupont</h3>
                  <p className="text-sm text-muted-foreground">24 Rue du Commerce, 75015 Paris</p>
                  <p className="text-sm text-muted-foreground">2.4 km • 12 min en vélo</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Afficher l'itinéraire
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Détails de la commande</h3>
                <ul className="text-sm space-y-1">
                  <li>1× Burger Classic</li>
                  <li>1× Frites maison</li>
                  <li>1× Coca-Cola</li>
                </ul>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-1" 
                  onClick={completeDelivery}
                >
                  Terminer la livraison
                </Button>
                <Button 
                  className="w-auto" 
                  variant={showMap ? "secondary" : "outline"}
                  onClick={toggleNavigate}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {showMap ? "Masquer" : "Naviguer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!isAvailable && (
          <div className="bg-background rounded-lg border p-8 text-center">
            <h2 className="text-xl font-medium mb-2">Vous êtes hors ligne</h2>
            <p className="text-muted-foreground mb-6">
              Activez votre disponibilité pour commencer à recevoir des livraisons
            </p>
            <Button onClick={toggleAvailability}>
              Passer en ligne
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverHome;
