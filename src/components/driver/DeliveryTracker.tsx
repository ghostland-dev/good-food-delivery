
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryMap from "@/components/map/DeliveryMap";
import { LatLngExpression } from "leaflet";
import { Skeleton } from "@/components/ui/skeleton";

interface DeliveryTrackerProps {
  restaurantLocation: [number, number];
  clientLocation: [number, number];
  deliveryRoute: LatLngExpression[];
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
  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (!deliveryRoute.length || !driverPosition) return 10;
    
    // Find the closest point in the route to the current position
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    deliveryRoute.forEach((point, index) => {
      const pointArr = point as [number, number];
      const distance = Math.sqrt(
        Math.pow(pointArr[0] - driverPosition[0], 2) + 
        Math.pow(pointArr[1] - driverPosition[1], 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    return Math.min(100, (closestIndex / (deliveryRoute.length - 1)) * 100);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Suivi de trajet en temps réel</CardTitle>
      </CardHeader>
      <CardContent>
        <DeliveryMap
          center={[
            (restaurantLocation[0] + clientLocation[0]) / 2,
            (restaurantLocation[1] + clientLocation[1]) / 2
          ]}
          zoom={13}
          height="400px"
          locations={[
            { 
              name: "Restaurant Burger House", 
              position: restaurantLocation, 
              type: "restaurant", 
              description: "12 Avenue des Champs-Élysées, 75008 Paris" 
            },
            { 
              name: "Marie Dupont", 
              position: clientLocation, 
              type: "client", 
              description: "24 Rue du Commerce, 75015 Paris" 
            }
          ]}
          routePath={deliveryRoute}
          currentDriverPosition={driverPosition}
          onDriverPositionChange={onDriverPositionChange}
        />
        <div className="mt-4 text-sm">
          <div className="flex justify-between mb-1">
            <p className="font-medium">Progression de livraison:</p>
            <span className="text-primary font-medium">{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Restaurant</span>
            <span className="text-xs text-muted-foreground">Client</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryTracker;
