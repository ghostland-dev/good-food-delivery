
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface MapUpdaterProps {
  driverPosition: LatLngExpression;
  zoom?: number;
}

const MapUpdaterComponent = ({ driverPosition, zoom }: MapUpdaterProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (driverPosition && map) {
      map.setView(driverPosition, zoom || map.getZoom());
    }
  }, [driverPosition, zoom, map]);
  
  return null;
};

export default MapUpdaterComponent;
