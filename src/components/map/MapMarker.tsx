
import React from 'react';
import maplibregl from 'maplibre-gl';

export interface MarkerProps {
  map: maplibregl.Map;
  location: {
    name: string;
    position: [number, number];
    type: 'restaurant' | 'client' | 'driver';
    description?: string;
  };
  isDriver?: boolean;
}

// Convert coordinates from [lat, lng] to [lng, lat] for MapLibre
const convertCoordinates = (coords: [number, number]): [number, number] => {
  return [coords[1], coords[0]]; // MapLibre uses [lng, lat]
};

const MapMarker: React.FC<MarkerProps> = ({ map, location, isDriver = false }) => {
  // Create a marker element
  const el = document.createElement('div');
  el.className = `custom-marker ${isDriver ? 'driver-marker' : ''}`;
  
  // Set the marker style based on location type
  if (location.type === 'restaurant') {
    el.innerHTML = `<div class="w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                      </svg>
                    </div>`;
  } else if (location.type === 'client') {
    el.innerHTML = `<div class="w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                      </svg>
                    </div>`;
  } else {
    const animationClass = isDriver ? 'animate-pulse' : '';
    el.innerHTML = `<div class="w-${isDriver ? '8' : '6'} h-${isDriver ? '8' : '6'} bg-blue-500 border-2 border-white rounded-full flex items-center justify-center ${animationClass}">
                      <svg class="w-${isDriver ? '5' : '4'} h-${isDriver ? '5' : '4'} text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                      </svg>
                    </div>`;
  }

  // Create the popup with info
  const popup = new maplibregl.Popup({ 
    offset: 25,
    closeButton: false,
    className: 'custom-popup'
  }).setHTML(`<h3 class="font-medium text-sm">${location.name}</h3>${location.description ? `<p class="text-xs text-gray-500">${location.description}</p>` : ''}`);
  
  // Create the marker and add it to the map
  const marker = new maplibregl.Marker({ element: el })
    .setLngLat(convertCoordinates(location.position))
    .setPopup(popup)
    .addTo(map);
  
  // Return the marker for cleanup purposes
  return marker;
};

export default MapMarker;
