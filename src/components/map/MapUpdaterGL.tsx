
import { useEffect } from "react";
import type { Map } from "maplibre-gl";

interface MapUpdaterGLProps {
  map: Map | null;
  driverPosition: [number, number];
  followDriver?: boolean;
  zoom?: number;
}

const MapUpdaterGL = ({ map, driverPosition, followDriver = true, zoom }: MapUpdaterGLProps) => {
  
  useEffect(() => {
    if (driverPosition && map && followDriver) {
      // Convertir (lat, lng) en (lng, lat) pour MapLibre
      const maplibreCoords: [number, number] = [driverPosition[1], driverPosition[0]];
      
      map.easeTo({
        center: maplibreCoords,
        zoom: zoom || map.getZoom(),
        duration: 500
      });
    }
  }, [driverPosition, map, followDriver, zoom]);
  
  return null;
};

export default MapUpdaterGL;
