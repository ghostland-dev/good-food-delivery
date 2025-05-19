
import React from "react";
import DriverHeader from "@/components/driver/DriverHeader";
import DeliveryRequest from "@/components/driver/DeliveryRequest";
import DailyStats from "@/components/driver/DailyStats";
import ActiveDelivery from "@/components/driver/ActiveDelivery";
import OfflineState from "@/components/driver/OfflineState";
import DeliveryTracker from "@/components/driver/DeliveryTracker";
import { useDeliveryState } from "@/hooks/useDeliveryState";
import { Switch } from "@/components/ui/switch";

const DriverHome = () => {
  const {
    isAvailable,
    hasCurrentDelivery,
    driverPosition,
    showMap,
    restaurantLocation,
    clientLocation,
    deliveryRoute,
    toggleAvailability,
    acceptDelivery,
    completeDelivery,
    handleDriverPositionChange,
    toggleNavigate
  } = useDeliveryState();

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
          <DeliveryTracker
            restaurantLocation={restaurantLocation}
            clientLocation={clientLocation}
            deliveryRoute={deliveryRoute}
            driverPosition={driverPosition}
            onDriverPositionChange={handleDriverPositionChange}
          />
        )}
        
        {isAvailable && !hasCurrentDelivery && (
          <div className="grid md:grid-cols-2 gap-6">
            <DeliveryRequest acceptDelivery={acceptDelivery} />
            <DailyStats />
          </div>
        )}
        
        {isAvailable && hasCurrentDelivery && (
          <ActiveDelivery
            showMap={showMap}
            toggleNavigate={toggleNavigate}
            completeDelivery={completeDelivery}
          />
        )}
        
        {!isAvailable && (
          <OfflineState toggleAvailability={toggleAvailability} />
        )}
      </main>
    </div>
  );
};

export default DriverHome;
