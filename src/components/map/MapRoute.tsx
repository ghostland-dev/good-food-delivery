
import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

interface MapRouteProps {
  map: maplibregl.Map;
  routePath: [number, number][];
  isVisible: boolean;
}

// Convert coordinates from [lat, lng] to [lng, lat] for MapLibre
const convertCoordinates = (coords: [number, number]): [number, number] => {
  return [coords[1], coords[0]]; // MapLibre uses [lng, lat]
};

const MapRoute: React.FC<MapRouteProps> = ({ map, routePath, isVisible }) => {
  useEffect(() => {
    if (!map || !routePath || !isVisible || routePath.length < 2) return;

    // Check if the source exists already
    if (map.getSource('route')) {
      // Update the existing route data
      const source = map.getSource('route') as maplibregl.GeoJSONSource;
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routePath.map(point => convertCoordinates(point))
        }
      });
    } else {
      // Add a new source and layer for the route
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routePath.map(point => convertCoordinates(point))
          }
        }
      });

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#4287f5',
          'line-width': 5,
          'line-dasharray': [2, 2]
        }
      });
    }

    return () => {
      // Cleanup could be added here if needed
    };
  }, [map, routePath, isVisible]);

  return null; // This component doesn't render anything directly
};

export default MapRoute;
