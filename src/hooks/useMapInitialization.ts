
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { convertCoordinates, createBaseMapStyle } from '@/utils/mapUtils';

interface UseMapInitializationProps {
  container: React.RefObject<HTMLDivElement>;
  center: [number, number];
  zoom: number;
}

export const useMapInitialization = ({ 
  container, 
  center, 
  zoom 
}: UseMapInitializationProps) => {
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    
    // Create the map
    console.log("Initializing map with center:", center, "zoom:", zoom);
    
    map.current = new maplibregl.Map({
      container: container.current,
      style: createBaseMapStyle(),
      center: convertCoordinates(center),
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl());

    // Set map loaded when ready
    map.current.on('load', () => {
      console.log("Map loaded event fired");
      setMapLoaded(true);
    });

    // Check if map is already loaded (it might be if the style is cached)
    if (map.current.loaded()) {
      console.log("Map already loaded on initialization");
      setMapLoaded(true);
    }

    // Cleanup
    return () => {
      if (map.current) {
        console.log("Cleaning up map");
        map.current.remove();
        map.current = null;
      }
    };
  }, [container, center, zoom]);

  return { map: map.current, mapLoaded };
};
