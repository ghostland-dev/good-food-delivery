
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapUpdaterProps {
  driverPosition: [number, number];
  followDriver?: boolean;
  zoom?: number;
}

const MapUpdaterComponent = ({ driverPosition, followDriver = true, zoom }: MapUpdaterProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (driverPosition && map && followDriver) {
      map.setView(driverPosition, zoom || map.getZoom(), {
        animate: true,
        duration: 0.5
      });
    }
  }, [driverPosition, map, followDriver, zoom]);
  
  return null;
};

export default MapUpdaterComponent;
