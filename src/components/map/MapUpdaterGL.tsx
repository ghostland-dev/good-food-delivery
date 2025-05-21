
import { useEffect } from "react";
import type { Map } from "maplibre-gl";
import { convertCoordinates } from "@/utils/mapUtils";

interface MapUpdaterGLProps {
  map: Map | null;
  driverPosition: [number, number];
  followDriver?: boolean;
  zoom?: number;
}

const MapUpdaterGL = ({ map, driverPosition, followDriver = true, zoom }: MapUpdaterGLProps) => {
  
  useEffect(() => {
    if (driverPosition && map && followDriver) {
      // Convert to MapLibre format and update map position
      const maplibreCoords = convertCoordinates(driverPosition);
      
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
