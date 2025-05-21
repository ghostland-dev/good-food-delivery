
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapInitialization } from '@/hooks/useMapInitialization';
import MapRoute from './MapRoute';
import { convertCoordinates } from '@/utils/mapUtils';

// Types
export interface Location {
  name: string;
  position: [number, number];
  type: 'restaurant' | 'client' | 'driver';
  description?: string;
}

interface DeliveryMapGLProps {
  center?: [number, number];
  zoom?: number;
  locations: Location[];
  routePath?: [number, number][];
  className?: string;
  height?: string;
  showRoute?: boolean;
  currentDriverPosition?: [number, number];
  onDriverPositionChange?: (position: [number, number]) => void;
  followDriver?: boolean;
}

const DeliveryMapGL: React.FC<DeliveryMapGLProps> = ({
  center = [2.3522, 48.8566], // Paris by default (longitude, latitude)
  zoom = 13,
  locations,
  routePath,
  className = "w-full h-96",
  height = "24rem",
  showRoute = true,
  currentDriverPosition,
  onDriverPositionChange,
  followDriver = true,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  
  // Use our custom hook to initialize the map
  const { map, mapLoaded } = useMapInitialization({
    container: mapContainer,
    center,
    zoom
  });

  // Add markers for locations
  useEffect(() => {
    if (!map || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each location
    locations.forEach(loc => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      // Style based on type
      if (loc.type === 'restaurant') {
        el.innerHTML = `<div class="w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                          </svg>
                        </div>`;
      } else if (loc.type === 'client') {
        el.innerHTML = `<div class="w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                          </svg>
                        </div>`;
      } else {
        el.innerHTML = `<div class="w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                          </svg>
                        </div>`;
      }

      // Create popup
      const popup = new maplibregl.Popup({ 
        offset: 25,
        closeButton: false,
        className: 'custom-popup'
      }).setHTML(`<h3 class="font-medium text-sm">${loc.name}</h3>${loc.description ? `<p class="text-xs text-gray-500">${loc.description}</p>` : ''}`);
      
      // Add marker to map
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(convertCoordinates(loc.position))
        .setPopup(popup)
        .addTo(map);
      
      markersRef.current.push(marker);
    });
  }, [locations, mapLoaded, map]);

  // Handle driver position separately
  useEffect(() => {
    if (!map || !mapLoaded || !currentDriverPosition) return;

    // Remove existing driver marker
    const driverMarkerIndex = markersRef.current.findIndex(m => m.getElement().classList.contains('driver-marker'));
    if (driverMarkerIndex !== -1) {
      markersRef.current[driverMarkerIndex].remove();
      markersRef.current.splice(driverMarkerIndex, 1);
    }

    // Create driver marker element
    const el = document.createElement('div');
    el.className = 'custom-marker driver-marker';
    el.innerHTML = `<div class="w-8 h-8 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center animate-pulse">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                      </svg>
                    </div>`;

    // Create popup
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      className: 'custom-popup'
    }).setHTML(`<h3 class="font-medium text-sm">Votre livreur</h3><p class="text-xs text-gray-500">En cours de livraison</p>`);

    // Add driver marker
    const driverMarker = new maplibregl.Marker({ element: el })
      .setLngLat(convertCoordinates(currentDriverPosition))
      .setPopup(popup)
      .addTo(map);

    markersRef.current.push(driverMarker);

    // Center map on driver if followDriver is true
    if (followDriver) {
      map.easeTo({
        center: convertCoordinates(currentDriverPosition),
        duration: 1000
      });
    }
  }, [currentDriverPosition, followDriver, mapLoaded, map]);

  return (
    <div className={className} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {map && mapLoaded && routePath && showRoute && (
        <MapRoute map={map} routePath={routePath} isVisible={showRoute} />
      )}
    </div>
  );
};

export default DeliveryMapGL;
