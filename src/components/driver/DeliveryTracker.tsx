
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryMap from "@/components/map/DeliveryMap";
import { LatLngExpression } from "leaflet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "lucide-react";

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
      const pointArr = Array.isArray(point) 
        ? [point[0], point[1]] 
        : [point.lat, point.lng];
        
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

  // Calculate estimated time based on progress percentage
  const getEstimatedTime = () => {
    const progress = getProgressPercentage();
    const remainingPercentage = 100 - progress;
    // Assume total delivery time is 30 minutes
    const estimatedMinutes = Math.ceil((remainingPercentage / 100) * 30);
    return estimatedMinutes;
  };

  const estimatedTime = getEstimatedTime();
  const progressPercentage = getProgressPercentage();

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-muted/20 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Suivi de trajet en temps réel
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10">
            {estimatedTime} min restant
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
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
        <div className="p-4 bg-white">
          <div className="mt-2 text-sm">
            <div className="flex justify-between mb-1">
              <p className="font-medium">Progression de livraison:</p>
              <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span>Restaurant</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Client</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryTracker;
