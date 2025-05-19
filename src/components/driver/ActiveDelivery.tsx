
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActiveDeliveryProps {
  showMap: boolean;
  toggleNavigate: () => void;
  completeDelivery: () => void;
}

const ActiveDelivery = ({
  showMap,
  toggleNavigate,
  completeDelivery,
}: ActiveDeliveryProps) => {
  return (
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
          <Button className="flex-1" onClick={completeDelivery}>
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
  );
};

export default ActiveDelivery;
