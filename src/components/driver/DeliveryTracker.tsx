
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryMapGL from "@/components/map/DeliveryMapGL";

interface DeliveryTrackerProps {
  restaurantLocation: [number, number];
  clientLocation: [number, number];
  deliveryRoute: [number, number][];
  driverPosition: [number, number];
  onDriverPositionChange: (position: [number, number]) => void;
}

function DeliveryTracker({
  restaurantLocation,
  clientLocation,
  deliveryRoute,
  driverPosition,
  onDriverPositionChange,
}: DeliveryTrackerProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Suivi de trajet en temps réel</CardTitle>
      </CardHeader>
      <CardContent>
        <DeliveryMapGL
          center={[48.8566, 2.3522]} // Paris
          zoom={12}
          height="400px"
          locations={[
            { name: "Restaurant Burger House", position: restaurantLocation, type: "restaurant", description: "12 Avenue des Champs-Élysées, 75008 Paris" },
            { name: "Marie Dupont", position: clientLocation, type: "client", description: "24 Rue du Commerce, 75015 Paris" }
          ]}
          routePath={deliveryRoute}
          currentDriverPosition={driverPosition}
          onDriverPositionChange={onDriverPositionChange}
        />
        <div className="mt-4 text-sm">
          <p className="font-medium">Progression de livraison:</p>
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ 
                width: `${Math.min(100, (
                  deliveryRoute.findIndex(pos => pos[0] === driverPosition[0] && pos[1] === driverPosition[1]) / 
                  (deliveryRoute.length - 1)
                ) * 100) || 10}%` 
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span>Restaurant</span>
            <span>Client</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryTracker;
