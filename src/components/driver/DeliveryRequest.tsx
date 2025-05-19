
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryRequestProps {
  acceptDelivery: () => void;
}

const DeliveryRequest = ({ acceptDelivery }: DeliveryRequestProps) => {
  return (
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
            <Button className="flex-1" variant="default" onClick={acceptDelivery}>
              Accepter
            </Button>
            <Button className="flex-1" variant="outline">
              Refuser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryRequest;
