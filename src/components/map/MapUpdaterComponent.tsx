
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapUpdaterProps {
  driverPosition: [number, number];
}

const MapUpdaterComponent = ({ driverPosition }: MapUpdaterProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (driverPosition && map) {
      map.setView(driverPosition, map.getZoom(), {
        animate: true,
        duration: 1
      });
    }
  }, [driverPosition, map]);
  
  return null;
};

export default MapUpdaterComponent;
